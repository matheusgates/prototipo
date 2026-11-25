#!/usr/bin/env python3
"""Gera publicar/index.html: cópia do index.html com nome neutro ("Associação Militar"),
sem o nome e o brasão da ASSOMISE, para publicar no link do claude.ai.
O index.html local continua com a marca. Uso: python3 gerar-publicacao.py"""
import re, os, sys

s = open("index.html", encoding="utf-8").read()
s = re.sub(r"<title>.*?</title>", "<title>Gestão da Associação</title>", s, count=1)
s = re.sub(r'<link rel="(?:icon|apple-touch-icon)"[^>]*favicon-assomise\.png">\n?', "", s)
s = re.sub(r'<div class="crest" id="crest">.*?</div></div>',
           '<div class="crest" id="crest"><div class="mark">AM</div><div><b>Associação Militar</b><small>nome de exemplo</small></div></div>', s, count=1)
s = re.sub(r"/\* marca: ASSOMISE.*?\*/", "/* marca: o link publicado usa nome neutro; a versão local da apresentação define window.__MARCA */", s, count=1)
s = re.sub(r"const MARCA=Object\.assign\(\{nome:\"ASSOMISE\".*?\},window\.__MARCA\|\|\{\}\);",
           'const MARCA=Object.assign({nome:"Associação Militar",longo:"Associação Militar (nome de exemplo)",sub:"nome de exemplo",sigla:"AM",logo:null},window.__MARCA||{});', s, count=1, flags=re.S)

restos = [w for w in ("ASSOMISE", "assomise", "Sergipe") if w in s]
if restos:
    sys.exit(f"ERRO: ainda há marca real no arquivo: {restos}")
os.makedirs("publicar", exist_ok=True)
open("publicar/index.html", "w", encoding="utf-8").write(s)
print(f"ok publicar/index.html · {len(s)//1024} KB · sem marca real")
