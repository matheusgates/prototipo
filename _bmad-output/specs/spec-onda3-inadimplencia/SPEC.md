---
id: SPEC-onda3-inadimplencia
companions:
  - brownfield.md
  - ../spec-onda2-cobranca/SPEC.md
  - ../../../docs/sistema-atual/03-modulos-e-comparativo.md
  - ../../../docs/sistema-atual/04-cobranca-estrutura.md
sources: []
---

> **Contrato canônico.** Este SPEC e os arquivos em `companions:` são o contrato completo do que construir, testar e validar.

# Onda 3 · Inadimplência (refeita com BMAD)

## Why

No sistema atual a negociação de dívida começa no retorno do BANESE e da folha: quem não foi descontado vira pré-inadimplente, a equipe liga, agenda, faz acordo e manda carta, e-mail ou SMS em lote. A v32 já tem a lista de inadimplentes, o acordo de mensalidades, a agenda, a carta e a fila do WhatsApp, mas só enxerga mensalidade vencida, e o acordo fica fora da remessa. Esta revisão compara com o item 9 do sistema atual e fecha o que falta. O código da v32 fica.

## Capabilities

- **CAP-1**
  - **intent:** Tudo que voltou recusado num retorno (folha, previdência ou débito em conta) e ainda não foi resolvido aparece numa aba Pré-inadimplência, agrupado por remessa, com o motivo e as ações de reenvio, baixa e contato.
  - **success:** Depois de simular o retorno do débito em conta, os recusados aparecem na aba com o motivo. "Mandar para a folha" tira o item da aba, e o contador da aba bate com o da Cobrança.
- **CAP-2**
  - **intent:** A dívida do associado soma as mensalidades, os lançamentos cobrados (plano, caminhão e telefonia) e as parcelas de fatura vencidas. O acordo pode incluir qualquer um deles.
  - **success:** Um associado com 1 mensalidade e 1 plano vencidos aparece com 2 itens e o total dos dois. Depois do acordo com os dois, nenhum deles entra na remessa seguinte, e quebrar o acordo devolve os dois para em aberto.
- **CAP-3**
  - **intent:** O acordo guarda o tipo de acordo e a forma de cobrança das parcelas (folha, débito em conta, boleto/PIX ou dinheiro). As parcelas em folha ou débito entram na remessa do mês e dão baixa pelo retorno. O termo de acordo sai em PDF para assinar, e o acompanhamento entra na agenda.
  - **success:** Um acordo em 3x pela folha põe a parcela do mês na remessa da folha, com o tipo de contrato do acordo. O retorno simulado com essa linha aceita marca a parcela como paga no acordo. O termo em PDF sai com os itens, as parcelas e as assinaturas.
- **CAP-4**
  - **intent:** A agenda de negociação tem uma visão de calendário do mês. A lista de atendimento mostra quem contatar, por responsável e período, com telefone, dívida e último contato, e exporta em Excel e PDF.
  - **success:** O calendário mostra os contatos de cada dia, e clicar num dia filtra a lista. A lista de atendimento da semana de um responsável exporta em Excel só com os associados dele.
- **CAP-5**
  - **intent:** A cobrança em lote parte da lista filtrada ou de uma remessa retornada. Os canais são WhatsApp, e-mail, SMS (arquivo para o serviço de SMS e link individual) e carta.
  - **success:** Escolhida a remessa do débito do mês, só os recusados dela ficam selecionados. "SMS em lote" baixa um CSV com telefone e mensagem de cada um, e cada envio fica no registro LGPD.
- **CAP-6**
  - **intent:** Todo contato de cobrança (WhatsApp, e-mail, SMS, carta, agenda feita, acordo) fica no histórico de cobrança do associado, que aparece na lista e na ficha. Os modelos de mensagem e de carta são editáveis, com campos como {nome}, {itens} e {total}.
  - **success:** Depois de um e-mail em lote e uma carta, a ficha do associado mostra os dois contatos com data e autor, e a lista de inadimplentes mostra o último. Com o modelo editado, a carta seguinte sai com o texto novo.
- **CAP-7**
  - **intent:** Os relatórios mostram a inadimplência por faixa de atraso (até 30, 31 a 60, 61 a 90 e mais de 90 dias) e por responsável, e a pré-inadimplência por remessa. Todos exportam.
  - **success:** O relatório "Inadimplência por faixa" fecha com o total da aba Inadimplentes. O relatório "Pré-inadimplência" do mês lista cada recusado com o canal e o motivo.

## Constraints

- Tudo fica em `index.html`, num módulo novo "v38 · onda 3 revisada" antes de "navegação", mais ajustes pontuais na v32. Os ganchos listados em brownfield.md não podem quebrar.
- O contrato de remessa e retorno da Onda 2 não muda. A parcela de acordo entra como lançamento `fin_lanc` com origem `acordo` e dá baixa pelo caminho que já existe. Item em acordo nunca vai para a remessa.
- Tudo é retrocompatível: acordos antigos (só com meses, sem tipo nem forma) abrem, pagam e quebram, e não há migração em lote.
- LGPD: todo envio e toda carta registram no lgpd_log. O arquivo de SMS leva só telefone e texto. O termo mostra o CPF mascarado sem `dadosCompletos()`.
- Nenhum dado de exemplo no código. `dados-exemplo/` é atualizado e a apresentação ASSOMISE regerada. O teste headless roda com zero erros. Nenhuma função global com nome de propriedade do navegador.
- A entrega é commit e push em origin/main.

## Non-goals

- Envio real de SMS (falta o provedor) e disparo automático de cobrança sem alguém da equipe apertar o botão.
- Juros e multa automáticos no acordo.
- Bloqueio ou desligamento automático por atraso.
- Planos de saúde detalhados, cartão e IRPF (Onda 4).
- Integração online com BANESE ou SEAD. A troca continua por arquivo.

## Success signal

- No banco simulado: gerar a remessa do débito e simular o retorno, e conferir os recusados na Pré-inadimplência. Depois fazer um acordo pela folha com uma mensalidade e um plano vencidos, gerar a remessa da folha do mês seguinte com a parcela, simular o retorno e ver a parcela paga. Por fim, gerar o termo, mandar SMS e e-mail em lote da remessa, editar o modelo da carta, gerar a carta, conferir o histórico na ficha e exportar a lista de atendimento e os dois relatórios novos, tudo sem erro.

## Assumptions

- Os tipos de acordo formam uma lista configurável em `app_config/cobranca.tiposAcordo` (padrão: Mensalidades, Plano de saúde, Cartão e Diversos). Cada tipo aponta para um tipo de contrato da Onda 2.
- Sem provedor de SMS, o lote gera um CSV `telefone;mensagem` para subir no serviço que a associação contratar. No celular, cada contato abre o link `sms:`.
- Pré-inadimplência é o recusado no retorno e não resolvido. Quando vence sem pagamento, passa a contar também como inadimplência.
- O acordo não tem juros nem multa automáticos. O desconto continua manual, e entra um acréscimo manual opcional.

## Open Questions

- O acordo cobra juros ou multa? Qual percentual, e a partir de quando?
- Existe um modelo oficial do termo de acordo (confissão de dívida)?
- Qual serviço de SMS a associação usa ou pretende usar?
- Quantos meses de atraso levam a bloqueio ou desligamento pelo estatuto?
