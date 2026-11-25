---
id: SPEC-onda5-atendimento
companions:
  - brownfield.md
  - ../../../docs/sistema-atual/03-modulos-e-comparativo.md
sources: []
---

> **Contrato canônico.** Este SPEC e os arquivos em `companions:` são o contrato completo do que construir, testar e validar.

# Onda 5 · Atendimento

## Why

Mandato de migração: o sistema atual da ASSOMISE tem agenda de atendimento, jurídico, agenda do caminhão e telefonia (módulos 17–20 do comparativo), e o protótipo não tem nenhum deles. Sem eles a secretaria continua presa ao sistema antigo, que roda em http aberto. As Ondas 1–4 já trouxeram cadastro, cobrança, inadimplência e benefícios. Esta onda fecha a parte de Atendimento. Caminhão e telefonia também são receita repassada ao associado, então precisam cair na mesma cobrança da folha e do BANESE.

## Capabilities

- **CAP-1**
  - **intent:** A equipe marca, remarca, cancela e registra o resultado de atendimentos, por tipo (secretaria, jurídico e outros configuráveis) e por quem atende.
  - **success:** Marcar no mesmo horário e com a mesma pessoa que atende é barrado. O atendimento do dia aparece na Ordem do dia. O resultado registrado fica no histórico da ficha do associado.
- **CAP-2**
  - **intent:** O jurídico funciona como tipo da agenda, com advogado(a) responsável, assunto restrito e lista própria de agendamentos.
  - **success:** O filtro "Jurídico" lista só esses agendamentos. Um usuário de papel diretoria vê data e associado, mas não vê o assunto. Abrir o assunto grava uma entrada no lgpd_log.
- **CAP-3**
  - **intent:** O associado pede atendimento pelo app, escolhendo tipo e um horário livre. O pedido vira solicitação para a secretaria.
  - **success:** O pedido aparece em Solicitações. Aprovar confirma o horário na agenda e avisa no sino do app. Recusar libera o horário. Horários já ocupados não são oferecidos.
- **CAP-4**
  - **intent:** A equipe gerencia a agenda do caminhão: associado, endereço de origem, cidade de destino, início, término e valor.
  - **success:** Uma reserva que se sobrepõe a outra é barrada. O calendário mostra os usos do mês.
- **CAP-5**
  - **intent:** O associado pede o caminhão pelo app, e a secretaria aprova em Solicitações.
  - **success:** O pedido aprovado vira reserva confirmada. O recusado some da agenda e o associado vê o motivo.
- **CAP-6**
  - **intent:** O uso confirmado do caminhão vira cobrança ao associado no mês do uso.
  - **success:** Existe um lançamento `cm-<reserva>` em fin_lanc. Ele entra na remessa da folha/BANESE e recebe baixa pelo retorno. Cancelar a reserva antes da remessa apaga o lançamento em aberto.
- **CAP-7**
  - **intent:** A equipe cadastra as linhas de telefone cedidas (número, aparelho, operadora, plano, valor ao associado, custo da associação) e faz a inclusão e a exclusão por associado, com histórico.
  - **success:** Cada linha tem no máximo um associado ativo. A ficha mostra as linhas do associado. Excluir guarda data e motivo.
- **CAP-8**
  - **intent:** A linha ativa gera cobrança mensal ao associado junto com as mensalidades. Um relatório compara custo e valor cobrado.
  - **success:** Gerar as mensalidades de um mês cria `tl-<linha>-<mês>` para cada linha ativa, sem duplicar. O relatório "Telefonia" mostra o custo, o cobrado e a diferença do mês.

## Constraints

- Tudo fica em `index.html`, num módulo novo com ganchos iniciarOnda5, o5Click, o5Change e ligarOnda5, no padrão das Ondas 1–4 (ver brownfield.md).
- Cobranças no formato dos planos: id determinístico, `origem` própria (`caminhao`, `telefonia`), `assocId`, forma igual à `formaPag` do associado. Lançar só ao gerar/incluir mensalidades ou por botão, nunca sozinho.
- Horários e reservas com id determinístico e `acquire` antes de gravar, para nunca duplicar (padrão `salao-`/`quadra-`).
- Nenhum dado de exemplo no código. Os exemplos vão para `dados-exemplo/`, com a apresentação ASSOMISE regerada.
- Nenhuma função global com nome de propriedade do navegador. Cada story passa no teste headless com banco simulado: zero erros, claro e escuro, larguras 390 e 1300.
- Acesso via `ACESSO`: secretaria e diretoria veem a agenda; secretaria e tesouraria veem caminhão e telefonia.
- LGPD: o assunto jurídico é dado sensível. Só quem atende e o admin veem o texto, e cada abertura fica registrada.
- O link do artifact está abandonado. A entrega é commit e push em origin/main.

## Non-goals

- Lembrete automático por SMS/WhatsApp de agendamento (depende do servidor).
- Prontuário ou processo jurídico (andamento de ação, prazos processuais): só o agendamento.
- Integração com operadora de telefonia ou importação de fatura da operadora.
- Mais de um caminhão, rastreio ou cálculo por quilômetro.
- Agenda do salão e da quadra continua como está.

## Success signal

- No banco simulado: um associado pede atendimento jurídico pelo app, a secretaria aprova e a advogada registra o resultado. O mesmo associado usa o caminhão e tem uma linha ativa. Ao gerar as mensalidades do mês, a remessa da folha traz mensalidade, caminhão e telefone, e o retorno simulado dá baixa nos três.

## Assumptions

- Atendimento de segunda a sexta, das 8h às 17h, em horários de 30 min, configurável em app_config/atendimento.
- Quem atende fica num cadastro próprio de atendentes em app_config/atendimento, cada um com os tipos que atende (decidido por Gates).
- Caminhão: um veículo, com valor por uso configurável e editável em cada reserva.
- Caminhão: um uso por dia (id `cam-<data>`), sem reserva de vários dias.
- Papel novo "Jurídico" (só Ordem do dia e agenda): é quem vê o assunto jurídico, junto com o admin.

## Open Questions

- Qual é o valor real do caminhão, e a regra é por uso, por dia ou por cidade?
- Telefonia: o valor é repassado integralmente, com taxa ou subsidiado?
- O jurídico tem custo para o associado ou é benefício gratuito?
