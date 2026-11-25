---
id: SPEC-onda2-cobranca
companions:
  - brownfield.md
  - ../../../docs/sistema-atual/04-cobranca-estrutura.md
  - ../../../docs/sistema-atual/03-modulos-e-comparativo.md
sources: []
---

> **Contrato canônico.** Este SPEC e os arquivos em `companions:` são o contrato completo do que construir, testar e validar.

# Onda 2 · Cobrança (refeita com BMAD)

## Why

Quase toda a receita da ASSOMISE entra por cobrança fora do sistema: desconto em folha (SEAD/SEPLAG e Sergipe Previdência), débito em conta no BANESE e boletos. A secretaria só larga o sistema antigo quando o protótipo gera e confere esses arquivos com o mesmo detalhe. A v33 já cobre o fluxo principal: remessa, retorno, baixa automática e faturas. Esta revisão compara com os módulos 1 a 8 do sistema atual e fecha o que falta. O código da v33 fica.

## Capabilities

- **CAP-1**
  - **intent:** Cada lançamento da remessa da folha leva tipo de contrato, rubrica (mensalidade, benefícios ou benefícios banco), início, número de parcelas e taxa administrativa, além do que já leva.
  - **success:** Na remessa gerada, uma parcela 2 de 5 de fatura sai com parcelas = 5, o tipo de contrato da fatura e a taxa calculada. Uma remessa antiga, sem esses campos, abre e baixa o arquivo sem erro.
- **CAP-2**
  - **intent:** Existe uma listagem de todos os envios (canal, mês, data, operações, total) e, para cada associado, a conferência dos contratos ativos na folha: o que está sendo descontado hoje, com início, valor e última operação.
  - **success:** Ao filtrar a conferência por um associado, aparecem a mensalidade e cada parcela ativa, com a operação do último envio. A listagem exporta em Excel.
- **CAP-3**
  - **intent:** Associados de órgão marcado como previdência (inativos e pensionistas) vão para uma remessa e um retorno próprios, com layout próprio, e não entram na remessa SEAD/SEPLAG.
  - **success:** Com o órgão 00004 marcado como previdência, o associado desse órgão aparece só na aba Previdência. O retorno simulado dá baixa nele.
- **CAP-4**
  - **intent:** Cada margem consignável tem vigência e histórico. A importação diz se o arquivo é de ativos ou de inativos, e a lista de margens exporta.
  - **success:** Importar duas vezes gera duas entradas no histórico da ficha, com origem e vigência. A lista de margens sai em Excel.
- **CAP-5**
  - **intent:** O débito em conta guarda banco, agência, conta, dígito, autorização e máximo de desconto. O débito acima do máximo fica sinalizado. O termo de autorização sai em PDF para assinar, e o retorno filtra por situação.
  - **success:** Um associado com máximo de R$ 50 e R$ 94,50 a debitar aparece com aviso na remessa. O termo em PDF sai com nome, CPF (mascarado para quem não tem `dadosCompletos()`), agência e conta. O filtro "Não debitados" mostra só os recusados.
- **CAP-6**
  - **intent:** A equipe importa a planilha de boletos pagos e vê uma prévia. A importação dá baixa na mensalidade, parcela ou lançamento correspondente, e o que não casa fica listado.
  - **success:** Uma planilha com 3 linhas, sendo 2 com par e 1 sem par, dá baixa em 2 com a forma "Boleto" e lista a 3ª. Importar de novo não baixa em dobro.
- **CAP-7**
  - **intent:** A fatura guarda taxa administrativa, tipo de contrato (código consignado) e observação do boleto. O relatório de parcelas traz origem, situação, vencimento, baixa e valor recebido, e exporta.
  - **success:** Uma fatura criada com tipo de contrato e observação mostra os dois na gaveta. O relatório "Parcelas de faturas" do mês exporta em Excel com os totais.
- **CAP-8**
  - **intent:** A equipe lança uma mensalidade avulsa para um associado em qualquer mês e altera o valor de uma mensalidade em aberto, e as duas ações ficam no histórico. O relatório mostra pagas e não pagas por mês.
  - **success:** A mensalidade lançada para um mês passado aparece na ficha financeira. Alterar o valor grava "de → para" no histórico. O relatório "Pagas e não pagas" do mês fecha com o total do Financeiro.

## Constraints

- Tudo fica em `index.html`, num módulo novo "v36 · onda 2 revisada" antes de "navegação", mais ajustes pontuais na v33. Os ganchos listados em brownfield.md não podem quebrar.
- Os layouts continuam configuráveis. Os campos novos entram só nos layouts padrão provisórios, e um layout salvo pelo usuário continua valendo. O campo que não está no layout não vai para o arquivo.
- Tudo é retrocompatível: remessas, faturas e fichas antigas abrem e funcionam, e não há migração em lote.
- LGPD: a conta bancária aparece mascarada fora do formulário e o CPF aparece mascarado nos relatórios sem `dadosCompletos()`. Termo e importações registram no lgpd_log.
- Nenhum dado de exemplo no código. `dados-exemplo/` é atualizado e a apresentação ASSOMISE regerada. O teste headless roda com zero erros, em claro e escuro, nas larguras 390 e 1300. Nenhuma função global com nome de propriedade do navegador.
- A entrega é commit e push em origin/main.

## Non-goals

- Banco Rural (legado).
- Inadimplência, acordos e cartas (Onda 3).
- Assomise Card, planos de saúde detalhados e informe de IRPF (Onda 4).
- Integração online com SEAD, Previdência ou BANESE. A troca continua por arquivo.
- Layouts oficiais (aguardam o usuário).

## Success signal

- No banco simulado: marcar o órgão 00004 como previdência, gerar as remessas folha, previdência e banco do mês e conferir tipo de contrato, parcelas e taxa no arquivo. Depois simular os três retornos, importar uma planilha de boletos com 1 linha sem par, lançar uma mensalidade avulsa de mês passado e alterar o valor de outra. Por fim, gerar o termo BANESE e exportar a listagem de envios, a conferência de contratos e o relatório de parcelas, tudo sem erro.

## Assumptions

- A taxa administrativa é um percentual configurável por tipo de contrato (padrão 0), calculado por linha. Vai no arquivo e não muda o valor cobrado do associado.
- Os tipos de contrato formam uma lista configurável (código e nome) em app_config/cobranca. Cada origem tem um padrão: mensalidade, plano, caminhão, telefonia e fatura.
- Previdência é o órgão marcado com o canal previdência na lista de órgãos. O nome do canal é configurável.
- A planilha de boletos é um CSV ou Excel com cabeçalho. As colunas são reconhecidas pelo nome: cpf ou matrícula, vencimento ou competência, valor, data de pagamento e nosso número.
- Boleto casa com a cobrança de mesmo valor, ou até 20% acima (multa e juros) quando a planilha traz o mês. Fora disso, a linha fica sem par.
- O máximo de desconto no débito em conta é um valor por associado e opcional. O lançamento acima dele entra com aviso e não é cortado.

## Open Questions

- Taxa administrativa: é percentual ou valor fixo? Quem paga, o associado ou a associação?
- Quais são os códigos oficiais dos 48 tipos de contrato do SEAD? Eles vão no arquivo?
- Qual é o layout oficial da Sergipe Previdência e da planilha ServLoja?
- O máximo de desconto BANESE é definido pelo associado na autorização ou pelo banco?
