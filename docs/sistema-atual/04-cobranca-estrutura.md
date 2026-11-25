# Sistema atual · estrutura da cobrança (lido em 25/11/2026)

Só estrutura: códigos, campos e tabelas de valores. Nenhum dado de associado copiado.

## Envio ao SEAD/SEPLAG (desconto em folha)
- Cada envio é um registro com: **Registro** (sequencial de 11 dígitos, ex. 00.000.000.824), CPF, nome, **órgão**, **rubrica**, **início** (data), **parcelas**, **valor**, **taxa administrativa**, **tipo de contrato** e **operação**.
- Operação: **I** Inclusão · **A** Alteração · **E** Exclusão. A consulta agrupa por data/hora do envio e operação.
- Rubricas (código da consignação na folha):
  - `1200123001` Mensalidade
  - `1200124012` Benefícios
  - `1200131012` Benefícios (banco)
- Tipos de contrato (48, sem os auxílios pecuniários nominais): acordos (cartão, diversos, Unimed), arma, cartão Assomise Card e dependente, caminhão, Claro, coparticipação/dependente/diferença Unimed, equipamentos eletrônicos, farmácia, livraria, mensalidades (oficiais; sargentos e subtenentes; soldados e cabos; sócio civil; convênio Sinpol), odonto, óticas, plano integrado de assistência à família, Prevdonto, Servdonto, serviços de segurança, Sesc, sorteio, entre outros.
- Telas ligadas: Contratos SEAD/SEPLAG, Conferência de contratos, Listagem de envio, Ler arquivo de baixa SEPLAG (sistema 2015), Margem consignada (margens fixas; importação de arquivos dos ativos e dos inativos).

## Órgãos de origem (141 códigos)
Códigos de 5 dígitos. Os de 00001 a 00030 são formas/datas de recebimento, não órgãos:
00001 Civil · 00002 Prefeitura · 00003 Inativo · 00004 Previdência · 00005 Pensão alimentícia · 00006 Dia 10 de cada mês · 00007 IPES Saúde · 00008 Dia 13 de cada mês · 00009 Civil, recebimento dia 15 · 00010 Boleto bancário Banese · 00019 Civil, recebimento dia 20 · 00030 Civil, dia 30.

Militares (os que mais importam para a associação):
- 21000 Sec. de Estado da Segurança Pública · 21150 SSP inativos/FUNASERP
- 21300 Corpo de Bombeiros Militar do Estado de Sergipe
- 21340 Polícia Militar de Sergipe, reformados · 21350 PM reformados/FUNASERP
- 21440 Corpo de Bombeiros, reformados · 21450 CBM reformados/FUNASERP

Demais: secretarias e autarquias estaduais de 10000 a 35900 (ex.: 13000 Administração, 13110 IPES Previdência, 13500 SEPLAG, 14000 Fazenda, 17000 Educação, 24000 Saúde, 28000 Tribunal de Justiça, 29000 Tribunal de Contas), cada uma com variação "- INATIVOS" e "- INATIVOS/FUNASERP"; vários "LANÇADO POR IMPORTAÇÃO"; 99999 genérico.

## Mensalidade por patente (tabela atual)
- Oficiais (Aspirante a Coronel, inclusive 1º/2º Tenente, Capitão, Major, Ten.-Coronel): **R$ 134,00**
- Praças e civis em geral (Soldado, Cabo, Sargentos, Subtenente, Cadete, Aspirante, Aluno, Civil, Pensionista, Não sócio, polícias civil/penal/federal, guarda municipal): **R$ 94,50**
- 2º Sargento aparece com R$ 113,47 (provável erro de cadastro)
- Academia R$ 35,00 · Academia/alunos não sócio R$ 50,00 · Natação R$ 85,00 · Responsável pgto. R$ 65,59
- R$ 0,00: Estágio, Falecido, Força Aérea, Funcionário, Jovem Aprendiz, Assimusep
- A tabela tem duplicatas e erros ("2 Sargento"/"SARGENTO", "Sub-tenente"/"Sub. Tenente", "3° Sagento").

## BANESE (débito em conta)
Telas: Lançamentos em conta corrente · Remessas prontas para envio · Remessas enviadas · Regerar arquivos CSV das remessas · Ler retorno BANESE · Retorno por status / por associado / por benefício · Retorno com baixa manual · Reenviar ao SEAD o que o banco não debitou · E-mail/SMS e carta de inadimplência a partir do retorno.
Ponto importante: o que o BANESE devolve como não debitado pode ser **reenviado ao SEAD** (folha).
