---
id: SPEC-onda1-cadastro
companions:
  - brownfield.md
  - ../../../docs/sistema-atual/02-ficha-associado.md
  - ../../../docs/sistema-atual/01-menu.md
sources: []
---

> **Contrato canônico.** Este SPEC e os arquivos em `companions:` são o contrato completo do que construir, testar e validar.

# Onda 1 · Cadastro de associados (refeita com BMAD)

## Why

Mandato de migração: a secretaria só larga o sistema antigo da ASSOMISE quando a ficha do protótipo guarda tudo o que a ficha antiga guarda. A Onda 1 (v31) foi feita sem spec e cobriu a maior parte. Esta revisão compara campo a campo com o sistema atual (02-ficha-associado.md) e fecha o que ficou de fora: profissão, UF, dependentes completos, documentos extras, bloqueio, auditoria com operador, ficha impressa e pesquisa ampla. O código da v31 fica; só entram correções e o que falta.

## Capabilities

- **CAP-1**
  - **intent:** A ficha guarda todos os dados pessoais e de contato do sistema atual (inclui profissão, UF, 3 e-mails e telefone do trabalho), com os campos opcionais recolhidos.
  - **success:** Cadastrar e editar com todos esses campos grava e mostra cada um. Uma ficha antiga, sem os campos novos, abre e salva sem erro.
- **CAP-2**
  - **intent:** Cada dependente tem nome, parentesco, nascimento, CPF, sexo, situação (ativo/inativo) e foto. Existe uma listagem geral de dependentes.
  - **success:** O CPF do dependente é validado e mascarado como o do titular. A listagem filtra por parentesco, idade e situação e exporta Excel, PDF e CSV.
- **CAP-3**
  - **intent:** O vínculo (efetivo, remido, não sócio com tipo de uso) fica separado do posto. Os postos cobrem alunos e cadetes. O desligamento guarda data e motivo. O bloqueio impede uso sem desligar.
  - **success:** O associado bloqueado aparece com o sinal e o motivo na ficha e na lista, e o app recusa pedidos de serviço e reserva dele. Desbloquear devolve o acesso. Ambos ficam no histórico.
- **CAP-4**
  - **intent:** A mensalidade vem da tabela por posto e vínculo. O remido fica isento e travado, e um valor próprio aparece sinalizado. A ficha e a lista mostram a última mensalidade paga.
  - **success:** Mudar a tabela mostra quantos associados divergem e aplica a diferença com um clique. A ficha mostra "Última paga: mês/ano".
- **CAP-5**
  - **intent:** Cada associado tem um responsável da equipe. É possível cadastrar a equipe, distribuir, remanejar e ver a lista agrupada por responsável.
  - **success:** Remanejar uma carteira move todos os associados dela e grava no histórico de cada ficha. A lista de associados tem a opção "Agrupar por responsável".
- **CAP-6**
  - **intent:** O recadastramento vale 24 meses, com sinal na ficha, filtro e registro pela equipe e pelo app.
  - **success:** O filtro "Recadastro vencido" lista quem passou de 24 meses. Salvar dados no app, com o recadastro vencido, grava a data de hoje.
- **CAP-7**
  - **intent:** Além dos 6 documentos obrigatórios para a filiação, a ficha aceita documentos extras de tipo livre, cada um com arquivo ou "recebido em papel".
  - **success:** Um documento extra adicionado aparece na aba Documentos e pode ser apagado. A aprovação continua exigindo só os 6 obrigatórios.
- **CAP-8**
  - **intent:** A pesquisa de associados filtra por cidade, sexo, faixa de idade, forma de pagamento, órgão, ter dependentes, serviço, período de filiação, mês de aniversário e pelos filtros atuais. As buscas podem ser salvas e toda lista exporta.
  - **success:** Combinar três filtros novos, salvar a busca, reabrir e exportar em Excel devolve as mesmas linhas da tela.
- **CAP-9**
  - **intent:** Cada alteração da ficha guarda quem fez e quando, e a ficha completa sai em PDF para imprimir.
  - **success:** O histórico mostra o nome de quem alterou. O PDF da ficha traz os dados, os dependentes, os documentos e um campo de assinatura, com o CPF mascarado quando quem gera não tem dadosCompletos().

## Constraints

- Tudo fica em `index.html`, no módulo "v31 · onda 1" ou num módulo novo antes de "navegação", sem quebrar iniciarOnda1, o1Click, o1Change e ligarOnda1 (ver brownfield.md).
- Todo campo novo é opcional e retrocompatível. Nenhuma migração em lote no banco.
- LGPD: o CPF do dependente fica mascarado. Profissão, pai, mãe e dados de dependentes só aparecem com `dadosCompletos()`. A exportação com CPF completo continua separada e registrada no lgpd_log.
- Nenhum dado de exemplo no código. `dados-exemplo/` é atualizado e a apresentação ASSOMISE regerada.
- Nenhuma função global com nome de propriedade do navegador. Cada story passa no teste headless com banco simulado: zero erros, claro e escuro, larguras 390 e 1300.
- A entrega é commit e push em origin/main. O artifact está abandonado.

## Non-goals

- Base cadastral e empresas da Prefeitura de Aracaju.
- Exportação em XML ou RTF.
- Observações em editor de texto rico.
- IP do terminal na auditoria.
- Termos/contratos impressos e indicações com pagamento (ficam para as próximas ondas).

## Success signal

- No banco simulado, a secretaria cadastra um sócio com profissão, UF, 3 e-mails e 2 dependentes com CPF, além de um documento extra. Depois bloqueia o sócio, que no app não consegue pedir reserva, e desbloqueia. Em seguida filtra por "cidade + tem dependentes + aniversário no mês", salva a busca, exporta em Excel e imprime a ficha em PDF. O histórico mostra quem fez cada passo.

## Assumptions

- Bloqueio: o associado continua sócio, mas não pode pedir serviços nem reservas no app até ser desbloqueado. O motivo é obrigatório.
- Postos novos: Aluno Soldado, Cadete e Aluno-Oficial. Pensionista continua na situação militar (SITMIL), não nos postos.
- Profissão é um texto com sugestões, não uma lista fechada de 119 opções.
- O não sócio ganha os tipos "Só plano de saúde" e "Só odontológico", que cobrem as situações Dependente UNIMED, ServDonto e ASIMUSEP do sistema antigo.

## Open Questions

- O "Bloqueado" do sistema antigo só marca a ficha ou também impede descontos e serviços?
- ASIMUSEP é convênio de outra entidade? Quem tem essa situação é sócio ou não sócio?
- O campo "Pendências" do topo da ficha é texto livre ou uma lista de tipos?
