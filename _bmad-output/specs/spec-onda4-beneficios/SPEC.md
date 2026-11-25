---
id: SPEC-onda4-beneficios
companions:
  - brownfield.md
  - ../spec-onda2-cobranca/SPEC.md
  - ../spec-onda3-inadimplencia/SPEC.md
  - ../../../docs/sistema-atual/03-modulos-e-comparativo.md
  - ../../../docs/sistema-atual/01-menu.md
sources: []
---

> **Contrato canônico.** Este SPEC e os arquivos em `companions:` são o contrato completo do que construir, testar e validar.

# Onda 4 · Benefícios (refeita com BMAD)

## Why

No sistema atual, os benefícios são a maior parte do menu: planos de saúde de quatro operadoras (Unimed, Plamed, OdontoServ, PrevDonto), cada um com importação de contratos, coparticipação e fatura, responsáveis financeiros, mudança de faixa etária e contratos órfãos; o informe de IRPF dos descontos de saúde; o Assomise Card com importação do extrato e conferência por CPF; os lançamentos padrões; e os vales gás e combustível por pedido. A v32 tem planos com faixa etária (um por pessoa), cartão com lançamento manual, vales em lote e o informe. Esta revisão compara com os itens 11 a 17 e fecha o que falta. O código da v32 fica.

## Capabilities

- **CAP-1**
  - **intent:** O associado pode ter mais de um plano ao mesmo tempo (saúde e odonto). Cada adesão guarda o nº do contrato e a carteirinha de cada vida, permite incluir e excluir vidas com data, e pode ter um responsável financeiro (outro associado que paga).
  - **success:** Um associado com saúde e odonto mostra as duas adesões na ficha. Incluir um dependente no odonto muda o valor do mês, e a cobrança do plano com responsável financeiro sai no nome de quem paga, entrando na remessa dele.
- **CAP-2**
  - **intent:** A equipe importa o arquivo da operadora (contratos, coparticipação ou fatura), por plano. O sistema casa cada linha por CPF ou carteirinha e mostra as diferenças entre a operadora e a associação e os contratos órfãos. A coparticipação importada vai para a vida certa.
  - **success:** Num arquivo de fatura com uma vida a mais e um valor diferente, a prévia mostra 1 órfão e 1 diferença. Ao confirmar a coparticipação, o valor aparece na cobrança do mês da adesão certa.
- **CAP-3**
  - **intent:** Uma lista mostra quem muda de faixa etária nos próximos meses, com o valor atual, o novo e o mês da mudança. Dá para aplicar a mudança em lote.
  - **success:** Uma vida que muda de faixa daqui a 2 meses aparece com o valor novo e o mês. Uma que já mudou aparece como "já vale", e aplicar atualiza a adesão e o histórico da ficha. A cobrança do mês sempre usa a idade no fim do mês.
- **CAP-4**
  - **intent:** O informe de IRPF soma o plano e a coparticipação que foram pagos, por beneficiário. O texto do informe é editável. Uma adesão antiga sem cobrança lançada usa o valor previsto, com aviso no PDF.
  - **success:** Com 10 meses do plano pagos e 2 em aberto, o informe mostra só os 10, separados por titular e dependente. O texto editado aparece no PDF.
- **CAP-5**
  - **intent:** O cartão da associação tem nº do cartão, dia de fechamento e contrapartida (% da associação). A equipe importa o extrato da administradora, que casa por CPF ou nº do cartão e mostra os cartões órfãos. A fatura fechada vira cobrança, que entra na remessa e na dívida.
  - **success:** Um extrato com 3 compras de um associado e 1 de um CPF desconhecido vira 3 lançamentos e 1 órfão. Ao fechar a fatura, a cobrança aparece na remessa da forma do associado.
- **CAP-6**
  - **intent:** Lançamentos padrões: um catálogo com código, nome, valor, se é automático, se está ativo e o tipo de contrato. Cada item é atribuído a associados. Os automáticos geram a cobrança do mês, que entra na remessa.
  - **success:** Um padrão automático atribuído a 2 associados gera 2 cobranças no mês, as duas na remessa. Gerar de novo não duplica.
- **CAP-7**
  - **intent:** O vale gás e o vale combustível também podem ser pedidos um a um (pela equipe ou pelo app), com data e valor, e passam por aprovação e entrega. Cada tipo de vale define se é descontado do associado. O lançamento em lote continua.
  - **success:** Um pedido de vale gás feito no app aparece em Solicitações. Ao aprovar, ele vira vale lançado e, se o tipo é descontado, a cobrança entra na remessa do mês.
- **CAP-8**
  - **intent:** No app, o associado vê os planos com as vidas, a fatura do cartão e os vales, e pode pedir um vale. Os relatórios mostram as vidas por operadora, a conferência da operadora, a mudança de faixa e o cartão. Todos exportam.
  - **success:** A tela "Meus benefícios" do app mostra as duas adesões e a fatura do mês. O relatório "Vidas por operadora" fecha com o total de vidas ativas.

## Constraints

- Tudo fica em `index.html`, num módulo novo "v39 · onda 4 revisada" antes de "navegação", mais ajustes pontuais na v32. Os ganchos listados em brownfield.md não podem quebrar.
- O contrato de remessa e retorno da Onda 2 não muda. Cartão, padrão e vale entram como `fin_lanc` com origem nova em `O2_LANC_COB`, e também na dívida da Onda 3 (`O38_DIV_ORIG`).
- Tudo é retrocompatível: a adesão antiga `pa-<assoc>` abre, cobra, cancela e entra no IRPF. As compras manuais do cartão e os vales `bn-*` continuam. Não há migração em lote.
- Os layouts dos arquivos das operadoras e da administradora são configuração provisória editável, não código fixo.
- LGPD: o CPF do dependente só aparece com `dadosCompletos()`. A importação guarda só o que casou, nunca a linha bruta. Informe, importação e aplicação em lote vão para o lgpd_log.
- Nenhum dado de exemplo no código. `dados-exemplo/` é atualizado e a apresentação ASSOMISE regerada. O teste headless roda com zero erros. Nenhuma função global com nome de propriedade do navegador.
- A entrega é commit e push em origin/main.

## Non-goals

- Banco Rural (legado).
- Integração online com operadoras ou com a administradora do cartão. A troca continua por arquivo.
- Reajuste anual da ANS automático.
- Contratar o plano direto pelo app. Continua como pedido de serviço.
- Telefonia (fechada na Onda 5).

## Success signal

- No banco simulado: criar um plano odonto e aderir com um dependente, num associado que já tem saúde, e com outro associado como responsável financeiro. Lançar os planos do mês e conferir a cobrança no nome do responsável, na remessa. Importar uma fatura da operadora com 1 órfão e 1 diferença e confirmar a coparticipação. Aplicar a mudança de faixa prevista. Gerar o informe de IRPF só com o pago. Importar um extrato do cartão com 1 órfão e fechar a fatura até a remessa. Gerar um lançamento padrão automático sem duplicar. Pedir um vale pelo app, aprovar e ver a cobrança. Abrir "Meus benefícios" no app. Exportar os relatórios novos. Tudo sem erro.

## Assumptions

- Os arquivos das operadoras e da administradora chegam em CSV com cabeçalho. O mapeamento de colunas é provisório até chegar um arquivo real.
- O responsável financeiro é outro associado cadastrado, e a cobrança do plano sai no nome dele.
- A contrapartida do cartão é o percentual que a associação retém sobre a fatura, configurável, com padrão 0.
- O desconto do vale é definido por tipo, editável. Gás e combustível começam descontados.

## Open Questions

- Quais são os layouts reais dos arquivos da Unimed, Plamed, OdontoServ, PrevDonto e da administradora do Assomise Card?
- O vale gás e o vale combustível são descontados, subsidiados ou gratuitos? Há limite por mês?
- O que é a contrapartida do Assomise Card no sistema atual?
- Quais lançamentos padrões existem hoje (códigos, valores, quais são automáticos)?
- Existe um texto oficial do informe de IRPF ("Corpo do IRPF")?
