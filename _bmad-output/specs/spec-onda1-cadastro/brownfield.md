# Pontos de encaixe no index.html (Onda 1)

| Onde | O que reaproveitar |
|---|---|
| módulo "v31 · onda 1" (~l.4025) | CATEG, NS_TIPOS, valorTabela/mensModo, gestores, o1Form*/o1Ficha*, o1Filtros/o1Passa, BUSCA_IDS, exportarTabela, views.carteiras |
| constantes (~l.1081) | DOCS (6 obrigatórios), POSTOS, SITMIL, PARENT, MOTIVOS |
| `hist(a,t)` (l.1134) | entrada {em,t}: acrescentar `por` (nome de quem fez) |
| `escrever(id,fn,msg,col)` (l.1121), `registrar()` (l.2714) | gravação com aviso; log LGPD |
| `filtrados()` (l.1242) | onde os filtros novos entram (via o1Passa) |
| `renderFicha` (l.1279), `abrirForm` (l.1338), `depRow` (l.1337), `salvarForm` (l.1410) | ficha, formulário em 4 passos, dependentes |
| `sinaisFicha` (l.3533) | sinal de bloqueio e última mensalidade paga |
| ganchos | iniciar (l.1150) → iniciarOnda1; clique global (l.5305) → o1Click; change (l.5322) → o1Change; route (l.5111) → ligarOnda1 |
| app: pServ/pReservas, normDep/depApp (l.3249) | barrar pedidos do bloqueado; dependentes no app com os campos novos |
| `REL.push` | relatórios "Dependentes" e "Última mensalidade por associado" |
| `ACESSO` (l.2694) | listagem de dependentes: secretaria e tesouraria |

Campos novos no associado: `profissao`, `uf`, `email3`, `telTrab`, `bloqueio{motivo,em,por}|null`, `pend` (texto), `docsExtra[{id,tipo,arquivo|null,papel,em}]`, `atualizadoEm`, `atualizadoPor`. Dependente: `cpf`, `sexo`, `sit` (Ativo|Inativo), `foto{assetId,url}`.
