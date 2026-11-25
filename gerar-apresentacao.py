# Gera apresentacao-assomise.html (arquivo local, offline, banco simulado em memória) a partir do index.html.
# Uso: python3 gerar-apresentacao.py   (rodar nesta pasta depois de mudar o index.html)
#
# Dados de exemplo: dados-exemplo/dados-exemplo.json  ({coleção: {id: documento}}, cópia do banco do artifact)
# Arquivos anexados: dados-exemplo/arquivos/<assetId>.<ext>  (embutidos no HTML como data: URI)
# Banco simulado:    banco-simulado.js
import base64,json,glob,os,mimetypes
seed=json.load(open("dados-exemplo/dados-exemplo.json",encoding="utf-8"))

# troca o endereço /_blob/<assetId> dos anexos pelo próprio arquivo embutido, para abrir sem internet
anexos={}
for f in glob.glob("dados-exemplo/arquivos/*"):
    tipo=mimetypes.guess_type(f)[0] or "application/octet-stream"
    anexos[os.path.splitext(os.path.basename(f))[0]]=f"data:{tipo};base64,"+base64.b64encode(open(f,"rb").read()).decode()
def troca_anexos(o):
    if isinstance(o,dict):
        if o.get("assetId") in anexos and "url" in o: o["url"]=anexos[o["assetId"]]
        for v in o.values(): troca_anexos(v)
    elif isinstance(o,list):
        for v in o: troca_anexos(v)
troca_anexos(seed)

mock=open("banco-simulado.js",encoding="utf-8").read()
idx=open("index.html",encoding="utf-8").read()   # nome e brasão da ASSOMISE já vêm no próprio index.html (const MARCA)
ico="data:image/png;base64,"+base64.b64encode(open("favicon-assomise.png","rb").read()).decode()
import re
idx=re.sub(r'href="favicon[^"]*"','href="'+ico+'"',idx)   # ícones da aba embutidos, para o arquivo offline
troca=[('ok:["on",modoDemo?"Demonstração: nada é salvo":podeEscrever?"Dados salvos online":"Somente leitura"]','ok:["on","Modo apresentação: nada é salvo"]')]
for a,b in troca:
    assert idx.count(a)==1,a; idx=idx.replace(a,b)
cab='<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">'
seed_js=json.dumps(seed,ensure_ascii=False).replace("</","<\\/")
out=cab+"<script>window.__SEED="+seed_js+"</script><script>"+mock+"</script>"+idx
open("apresentacao-assomise.html","w",encoding="utf-8").write(out)
print("ok",len(out)//1024,"KB ·",sum(len(v) for v in seed.values()),"registros ·",len(anexos),"anexo(s)")
