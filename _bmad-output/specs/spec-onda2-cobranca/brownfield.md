# Pontos de encaixe no index.html (Onda 2)

| Onde | O que reaproveitar |
|---|---|
| módulo "v33 · onda 2" (~l.4255) | LAYOUT_PADRAO, o2Lay/o2Rub, motor o2GerarTexto/o2LerTexto, o2Coletar/o2Analisar, o2Gerar, o2LerRetorno, o2SimularTexto, o2Acao, o2Faturas/o2FormFat/o2FichaFat, o2OrgMarg, o2FormCob/o2DadosForm/o2Validar, o2FichaFin, o2Pend |
| `views.cobranca` | abas folha, banco, faturas, orgaos, layouts: entram Previdência, Envios e Boletos |
| `o2Linha(it,c)` | onde os campos novos da linha (tipoContrato, taxa, parcelas) entram no arquivo |
| `cobCfg` = app_config/cobranca | orgaos[{cod,nome,canal?}], rubricas{mens,benef,benefBanco}, tiposContrato, layouts, regSeq |
| Financeiro: `gerarMens`/`incluirMens` (~l.1643), linha de mensalidade (~l.1580) | lançamento avulso e alteração de valor |
| `exportarTabela`, `REL.push` | exportação Excel/PDF e relatórios "Parcelas de faturas" e "Pagas e não pagas" |
| `hist(a,t)`, `registrar()`, `comDesfazer` | histórico com autor, log LGPD, desfazer |
| ganchos | iniciar → iniciarOnda2; clique global → o2Click; change global (filtro `input[data-o2ret],input[data-o2marg]`) → o2Change; route → ligarOnda2; pendencias → o2Pend |

Campos novos: associado `banco{bco,ag,conta,dv,autorizadoEm,max}`, `margemHist[{v,vig,origem,em}]`, `margemVig`; órgão `canal` ("folha"|"prev"); remessa tipo "prev" (id `prev-AAAA-MM`); item de remessa `tipoContrato`, `taxa`, `parcelas`; fatura `tipoContrato`, `taxaPct`, `obsBoleto`; item de fin_mens `avulsa`, `valorHist[]`, `boleto{nosso,em,arq}`.
