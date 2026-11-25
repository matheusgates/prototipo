# Sistema atual da ASSOMISE · módulos e comparação com o protótipo

Levantado em 25/11/2026 (somente leitura; nenhum dado de associado copiado). Ver também [01-menu.md](01-menu.md) e [02-ficha-associado.md](02-ficha-associado.md).

## Como o sistema atual funciona (resumo)
A receita vem quase toda de **cobrança fora do sistema**: desconto em folha do Estado (SEPLAG/SEAD, Sergipe Previdência para inativos), débito em conta no BANESE e boletos (ServLoja). O sistema gera arquivos de remessa, lê arquivos de retorno e dá baixa. Em cima disso a associação **revende serviços** (Unimed, Plamed, OdontoServ, PrevDonto, Assomise Card, telefonia, vale gás/combustível, caminhão) e repassa o custo ao associado pelas mesmas vias de desconto. A equipe trabalha por **carteiras de gestão** (cada funcionário cuida de um grupo de sócios) e negocia inadimplência com agenda própria.

## Módulos encontrados

| # | Módulo | O que faz (telas e campos principais) |
|---|---|---|
| 1 | **Desconto em folha (SEPLAG/SEAD)** | Contratos SEPLAG/SEAD, 142 órgãos de origem (código, descrição, sigla), envio mensal, conferência, leitura do arquivo de baixa, cruzamento do retorno (contrato, órgão, mês/ano, valor, rubrica, taxa adm.), reenvio |
| 2 | **Margem consignável** | Margem fixa e consignada por associado (vigência, valor, operação), importação dos arquivos de ativos e inativos, fechar período, exportar |
| 3 | **Débito em conta BANESE** | Dados bancários do sócio (banco, agência, conta, DV, autorização, máximo de desconto), gerar mensalidades → prontas para envio → enviadas, ler retorno, baixa manual, regerar arquivos, declarações, termo BANESE |
| 4 | **Sergipe Previdência** | Lançamento/envio e importação do retorno (inativos) |
| 5 | **Boletos** | Importar planilha ServLoja (boletos) |
| 6 | **Faturas e parcelas** | Fatura por associado com serviços lançados, forma de pagamento, total, taxa adm., nº de parcelas, 1º vencimento, obs. do boleto, código consignado; relatório de parcelas (origem, status, baixa, valor, recebido) |
| 7 | **Ficha financeira** | Ficha financeira do associado; extrato anual de mensalidades; resumos de pagas e não pagas; última mensalidade por sócio |
| 8 | **Mensalidades** | Tabela de valor por patente; lançamento geral e manual (CPF, ano, mês, valor, carteira) |
| 9 | **Inadimplência** | Pré-inadimplência (vem do retorno BANESE), inadimplência geral com acordo (tipo de acordo, valor total, parcelas, data, agendamento), agenda de negociação (calendário), lista de atendimento, e-mail/SMS em lote por remessa, carta de inadimplência impressa |
| 10 | **Carteiras de gestão** | Gestores (funcionários) com carteira de sócios, remanejamento entre gestores, listagem por gestor; a lista de associados é agrupada por gestor |
| 11 | **Planos de saúde** | Unimed: contratos, responsáveis financeiros, coparticipações, mudança de faixa etária, diferenças de valores Unimed × ASSOMISE, importações (contratos, coparticipação, mensalidades). Plamed, OdontoServ, PrevDonto: importação de contratos/faturas, ativos, contratos órfãos |
| 12 | **Informe de IRPF** | Informe de rendimentos dos descontos de saúde (por associado, por ano) |
| 13 | **Assomise Card** | Adesão (cartão de crédito/compras), margens, importação do extrato, conferência (por CPF), contrapartida, cartões órfãos, correlação sócio × cartão, períodos de processamento |
| 14 | **Banco Rural** | Faturas, cruzamento fatura × SEAD, inclusões (legado) |
| 15 | **Benefícios** | Lançamentos padrões (código, tipo, automático, valor, status) e listagem |
| 16 | **Vale gás / combustível** | Solicitações (associado, data, valor) |
| 17 | **Telefonia** | Linhas cedidas a associados: linha, aparelho, operadora, plano, valor, inclusão/exclusão, custo mensal |
| 18 | **Agenda de atendimento** | Calendário de atendimento |
| 19 | **Jurídico** | Agendamentos de atendimento jurídico |
| 20 | **Caminhão** | Agenda do caminhão (endereço de origem, cidade, data/hora de término, valor) |
| 21 | **Indicações** | Indicação de novos sócios com pagamento (data e valor) |
| 22 | **Sorteio** | Gerar bilhete de sorteio |
| 23 | **Termos e contratos** | Textos editáveis: termo para oficiais, praças, BANESE, funcionários; impressos a partir da ficha |
| 24 | **Não sócios** | Situações Sócio Remido / Desligado / Não sócio; alunos (academia, natação) com carteirinha de não sócio |
| 25 | **Prefeitura de Aracaju** | Base cadastral e cadastro de empresas da prefeitura |
| 26 | **Pesquisa genérica** | Busca com ~25 filtros e filtros salvos; toda lista exporta PDF, Excel, XML, CSV e RTF |
| 27 | **Relatórios financeiros** | Painel gráfico evolutivo, extrato de contas bancárias (créditos/débitos), movimentação |
| 28 | **Notificações da equipe** | Mensagem interna para perfil/grupo/usuário, com validade e link |
| 29 | **Segurança** | Usuários, grupos, permissão por tela, usuários logados (IP), troca de senha |

## Comparação com o protótipo

**Legenda:** ✅ o protótipo já tem · 🟡 tem parte · ❌ não tem

| Função do sistema atual | Protótipo |
|---|---|
| Cadastro, dependentes, documentos, foto | ✅ |
| Campos extras da ficha (3 e-mails, telefone do trabalho, 3 referências, pai/mãe, naturalidade, estado civil, profissão, indicação, recadastro, bloqueado, enviar correspondência) | ✅ todos, com bloqueio e pendências (Onda 1 revisada) |
| Status Sócio Remido / Desligado / Não sócio | ✅ vínculo efetivo/remido/não sócio + desligamento com data e motivo |
| Mensalidade por patente | ✅ tabela por posto e vínculo, última mensalidade paga |
| Mensalidades do mês, baixa, inadimplência simples | ✅ |
| **Desconto em folha SEPLAG/SEAD (remessa, retorno, baixa, órgãos)** | ✅ remessa com tipo de contrato, rubrica, parcelas e taxa; listagem de envios e conferência de contratos (Onda 2 revisada) |
| **Margem consignável** | ✅ com vigência, histórico, arquivo de ativos/inativos e exportação |
| **Débito em conta BANESE (dados bancários, remessa, retorno)** | ✅ banco, dígito, máximo de desconto, termo em PDF, retorno filtrável |
| Sergipe Previdência | ✅ canal próprio para órgãos de inativos |
| Boletos / importar planilha de boletos | ✅ importa planilha de pagos com prévia e baixa |
| **Faturas com parcelamento** | ✅ com tipo de contrato, taxa, obs. do boleto e relatório de parcelas |
| Ficha financeira / extrato anual do associado | ✅ aba Financeiro, extrato PDF, pagas e não pagas, mensalidade avulsa |
| **Inadimplência com acordo, agenda de negociação, carta, e-mail/SMS em lote** | 🟡 só "Cobrar no WhatsApp" individual |
| **Carteiras de gestão (gestor responsável por sócio)** | ✅ distribuir, remanejar, lista agrupada por responsável |
| **Planos de saúde (contratos, responsáveis, coparticipação, faixa etária)** | 🟡 "Plano de saúde" é só um serviço simples |
| Informe de IRPF | ❌ |
| Assomise Card (adesão, extrato, conferência) | 🟡 "Cartão da associação" simples |
| Benefícios (vale gás/combustível, lançamentos padrões) | ❌ |
| Telefonia | ✅ linhas cedidas, cobrança mensal e relatório (Onda 5) |
| Agenda de atendimento / jurídico | ✅ agenda com tipos, jurídico com assunto restrito, pedido pelo app (Onda 5) |
| Caminhão | ✅ agenda, pedido pelo app e cobrança do uso (Onda 5) |
| Indicações com pagamento | ❌ |
| Sorteio | ❌ |
| Termos/contratos editáveis e impressos | 🟡 ficha de filiação em PDF |
| Carteirinha de não sócio (alunos) | ❌ |
| Prefeitura de Aracaju | ❌ |
| Pesquisa com filtros salvos; exportar Excel/PDF | ✅ ~20 filtros, buscas salvas, Excel/PDF/CSV, listagem de dependentes, ficha em PDF |
| Painel gráfico, extrato de contas | ✅ resumo, gráfico, prestação de contas |
| Notificações para a equipe | 🟡 sino só no app do associado |
| Usuários, grupos e permissão por tela | 🟡 papéis só na interface |

**O que o protótipo já tem e o sistema atual não tem:** app do associado com login, autocadastro, carteirinha digital com QR, PIX, reservas de salão e quadra, eventos com inscrição, comunicados no app, vitrine de convênios, arquivo da entidade, adequação à LGPD, importar planilha, desfazer, visual de celular.

## Problemas vistos no sistema atual
- Servido por **http, sem criptografia**, num IP público: senhas e dados pessoais (CPF, conta bancária) trafegam abertos.
- A lista de "patentes" mistura posto, categoria de sócio e tipo de cadastro (Academia, Natação, Funcionário, Falecido, "Ratos da Praia"), tem duplicatas ("2 Sargento"/"SARGENTO", "Sub-tenente"/"Sub. Tenente") e erros de grafia ("3° Sagento").
- Telas quebradas ou vazias: "Não Pagantes" dá 404; várias consultas mostram rótulo "ERRO".
- Muito legado no menu: Unimed 2015, Banco Rural, importação de 2023.
- Lista de associados com CPF, e-mail e celular abertos para qualquer usuário, sem máscara (ponto de LGPD).
