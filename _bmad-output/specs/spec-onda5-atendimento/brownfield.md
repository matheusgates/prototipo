# Pontos de encaixe no index.html

| Onde | O que reaproveitar |
|---|---|
| `iniciar()` (~l.1176) | chamar `iniciarOnda5()` ao lado de `iniciarOnda34()`; assinatura por `db.collection(c).onSnapshot` |
| clique global (~l.4850) | `if(o5Click(e))return;` depois de `o34Click` |
| change global (~l.4867) | `o5Change(e)` |
| `route()` (~l.4656) | `ligarOnda5()` depois de `ligarOnda34()` |
| menu | inserir `<a class="nav">` por código (ver IIFE do módulo v32, ~l.3578) |
| `ACESSO` (l.2694), `VERBO` (l.3219), `REL.push` | papéis, verbo da Ordem do dia, relatórios |
| `pendencias()` (l.3226) | atendimentos de hoje e pedidos pendentes |
| `escrever(id,fn,msg,col)` (l.1121), `registrar()` (l.2714) | gravação com aviso; log LGPD |
| `gaveta()` (l.1654) | ficha de agendamento/reserva/linha |
| reservas `SALAO`/`QUADRA` (l.1721), `pReservas` (l.1884) | id determinístico + acquire; telas do app |
| `views.solicitacoes` (l.1995) + aprovar (~l.2039) / recusar (~l.2024) | novos tipos `atendimento` e `caminhao` |
| sino do app (~l.4795) | avisar aprovado/recusado (respostaEm) |
| cobrança dos planos `o2PlanosPend` (l.4547) e `gerarMens`/`incluirMens` (l.1638) | modelo de lançamento `cm-*` e `tl-*` em fin_lanc; remessa já lê origem "lanc" |

Coleções novas: `atendimentos`, `caminhao_reservas`, `tel_linhas`; config em `app_config/atendimento` (tipos, horário, duração) e `app_config/caminhao` (valor padrão).
