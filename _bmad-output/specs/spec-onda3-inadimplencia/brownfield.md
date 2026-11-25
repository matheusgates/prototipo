# Pontos de encaixe no index.html (Onda 3)

| Onde | O que reaproveitar |
|---|---|
| módulo "v32 · ondas 3 e 4" (~l.3553), parte `o3*` | o3Div/o3Abertas/o3Inad/o3Filtrados, o3Msg, o3InadHTML, o3FormAcordo/o3Plano/o3SalvarAcordo, o3Pagar/o3Quebrar, o3AgendaHTML/o3SalvarAgenda, o3Cartas, fila do WhatsApp, e-mail em lote (`enviarEmails`), sino |
| `views.inadimplencia` | abas inad, acordos, agenda: entram Pré-inadimplência e Lista de atendimento; a agenda ganha o calendário |
| Onda 2: `o2RejPend`, `o2Resolvido`, `o2Acao`, `o2Rem` | fonte da pré-inadimplência e das ações de reenvio |
| Onda 2: `o2Coletar` (function, reatribuível), `O2_LANC_COB`, `o2LancChave`, `o36Enriquecer` | parcela de acordo entra como fin_lanc origem `acordo`; filtrar itens em acordo |
| `fin.lanc` (planos pl-*, caminhão cm-*, telefonia tl-*, usam `assocId`), `o2Fats` (parcelas com `venc`, `status`) | dívida além da mensalidade |
| `cobCfg` = app_config/cobranca, `o2SalvarCfg` | tiposAcordo, textos{msg,carta,email} |
| `exportarTabela`, `REL.push`, `carregarAutoTable` | exportação e relatórios |
| `hist(a,t)`, `registrar()`, `o35Autor` | histórico e log LGPD |
| ganchos | iniciar → iniciarOnda34; clique global → o34Click; change → o34Change; route → ligarOnda34; pendencias (reatribuída na v32) |

Campos novos: acordo `tipo`, `forma`, `itens[{k,kind,ref,comp,venc,valor,desc}]` (além de `meses`, que continua para os antigos), `acrescimo`, `acompEm`; fin_lanc `ac-<acordo>-p<n>` passa a nascer em aberto com `origem:"acordo"`, `acordoId`, `assocId`, `forma`, `comp`; fin_lanc e parcela de fatura ganham status `acordo` + `acordoId`; coleção `fin_contatos` {assocId, canal, em, autor, txt, ref}.
