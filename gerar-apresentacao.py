# Gera apresentacao-assomise.html (arquivo local, offline, banco simulado em memória) a partir do index.html.
# Uso: python3 gerar-apresentacao.py   (rodar nesta pasta depois de mudar o index.html)
import base64,json
base=open("apresentacao-assomise-antiga.html",encoding="utf-8").read()
mock=base[:base.index("</script><title>")+9]          # seed + mock de window.claude
logo="data:image/png;base64,"+base64.b64encode(open("brasao-assomise.png","rb").read()).decode()
marca={"nome":"ASSOMISE","longo":"Associação dos Oficiais Militares de Sergipe (ASSOMISE)","sub":"Oficiais Militares de Sergipe","sigla":"AS","logo":logo}
idx=open("index.html",encoding="utf-8").read()
troca=[("<title>Gestão da Associação</title>","<title>Gestão ASSOMISE</title>"),
       ('ok:["on",podeEscrever?"Dados salvos online":"Somente leitura"]','ok:["on","Modo apresentação: nada é salvo"]')]
for a,b in troca:
    assert idx.count(a)==1,a; idx=idx.replace(a,b)
extra=json.load(open("exemplo-extra.json",encoding="utf-8"))   # coleções de exemplo que não estão no seed antigo
add="".join(f"Object.assign(window.__stores[{json.dumps(c)}]||(window.__stores[{json.dumps(c)}]={{}}),{json.dumps(v,ensure_ascii=False)});" for c,v in extra.items())
open("apresentacao-assomise.html","w",encoding="utf-8").write(mock+"<script>window.__MARCA="+json.dumps(marca,ensure_ascii=False)+";"+add+"</script>"+idx)
print("ok",len(mock+idx)//1024,"KB")
