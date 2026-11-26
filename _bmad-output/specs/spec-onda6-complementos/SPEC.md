---
id: SPEC-onda6-complementos
companions:
  - brownfield.md
  - ../spec-onda1-cadastro/SPEC.md
  - ../../../docs/sistema-atual/03-modulos-e-comparativo.md
  - ../../../docs/sistema-atual/01-menu.md
sources: []
---

> **Contrato canônico.** Este SPEC e os arquivos em `companions:` são o contrato completo do que construir, testar e validar.

# Onda 6 · Indicações, sorteio, termos, carteirinha de não sócio, equipe e Prefeitura

## Why

Depois das Ondas 1 a 5, sobraram no comparativo os itens ❌ e 🟡: indicação de sócios com pagamento, sorteio, termos e contratos editáveis, carteirinha de não sócio (alunos da academia e da natação), cadastro de empresas da Prefeitura de Aracaju, avisos internos da equipe, e usuários com grupos e permissão por tela. O protótipo já tem o campo "indicado por", o vínculo de não sócio, três PDFs de termo com texto fixo, papéis fixos e um sino só com pendências. Esta onda fecha essas lacunas.

## Capabilities

- **CAP-1**
  - **intent:** A equipe vê quem indicou quem. A regra de bonificação é configurável (valor e quando gera direito). O pagamento é registrado com data, valor e forma e vira despesa no financeiro. Há um ranking de quem mais indicou.
  - **success:** Com valor R$ 50 e direito na aprovação, aprovar um indicado faz a indicação aparecer "a pagar". Pagar cria a despesa no mês, e a indicação passa a "paga". Um indicado ainda pendente aparece "aguardando".
- **CAP-2**
  - **intent:** A equipe cria um sorteio com prêmios e público, gera bilhetes numerados para os elegíveis, imprime os bilhetes em PDF e sorteia prêmio a prêmio, sem repetir ganhador. O resultado fica registrado com autor e hora e pode virar comunicado. O associado vê o bilhete e o resultado no app.
  - **success:** Num sorteio com 2 prêmios para ativos, os bilhetes cobrem todos os ativos e só eles. Sortear duas vezes dá dois ganhadores diferentes, o resultado aparece no app do ganhador e um comunicado é criado.
- **CAP-3**
  - **intent:** Termos e contratos são modelos editáveis com campos do associado (termo para oficiais, praças, BANESE, funcionários, não sócio). São impressos da ficha em PDF, e dá para marcar o termo como assinado. O termo de funcionário usa dados digitados que não são gravados.
  - **success:** Editar o termo para oficiais e imprimir pela ficha de um oficial gera um PDF com o texto novo e o nome, posto e matrícula preenchidos. "Marcar assinado" fica no histórico da ficha.
- **CAP-4**
  - **intent:** Um não sócio ativo (academia, natação...) tem carteirinha própria, com o tipo e a validade configurável. A equipe emite uma ou várias em PDF. O app mostra essa carteirinha com visual próprio.
  - **success:** Emitir em lote para os alunos da academia gera um PDF com uma carteirinha por aluno, onde aparece "Não sócio · Academia". No app, o aluno vê a carteirinha em vez do aviso de "só associados ativos".
- **CAP-5**
  - **intent:** O administrador escolhe quais telas cada papel vê, cria grupos novos (com suas telas e o acesso a dados completos) e atribui pessoas a eles. O sistema registra quem da equipe acessou e quando.
  - **success:** Um grupo "Recepção" com Associados e Eventos, atribuído a uma pessoa, faz o menu dela mostrar só essas telas. Ela vê o CPF mascarado se o grupo não tem dados completos. Apagar o grupo faz a pessoa cair em Secretaria sem erro.
- **CAP-6**
  - **intent:** Qualquer pessoa da equipe envia um aviso interno para todos, para um grupo ou para uma pessoa, com validade, link e etiquetas. O aviso aparece no sino de quem recebe. A caixa de saída mostra quem já leu.
  - **success:** Um aviso enviado ao grupo Tesouraria aparece no sino de quem é da Tesouraria e não no de quem é da Secretaria. Depois que um tesoureiro abre o sino, a caixa de saída mostra 1 leitura. Um aviso vencido some do sino.
- **CAP-7**
  - **intent:** A equipe cadastra as empresas da Prefeitura de Aracaju (CNPJ validado, contato, situação), importa uma planilha e vincula associados a uma empresa.
  - **success:** Um CNPJ com dígito errado é barrado. A importação de uma planilha com 3 empresas, 1 delas repetida, cadastra 2. A empresa vinculada aparece na ficha do associado e no filtro da lista.

## Constraints

- Tudo fica em `index.html`, num módulo novo "v40 · onda 6" antes de "navegação". Os ajustes pontuais estão em brownfield.md. Os ganchos das ondas anteriores não podem quebrar.
- As permissões continuam só na interface, como hoje: o banco do protótipo não aplica regra por tela. O administrador sempre vê tudo e nunca perde a tela Equipe.
- Um grupo apagado ou um papel desconhecido cai em Secretaria, nunca quebra a tela.
- LGPD: o CPF completo no termo só aparece com `dadosCompletos()`, senão sai mascarado. O termo de funcionário não grava os dados digitados. Sorteio, pagamento de indicação, emissão de carteirinha e mudança de permissão vão para o lgpd_log.
- O sorteio usa `crypto.getRandomValues` e grava o resultado antes de mostrá-lo. Para refazer, é preciso cancelar com motivo.
- Nenhum dado de exemplo no código. `dados-exemplo/` é atualizado e a apresentação ASSOMISE regerada. O teste headless roda com zero erros. Nenhuma função global com nome de propriedade do navegador.
- A entrega é commit e push em origin/main.

## Non-goals

- Login próprio da equipe e regra de permissão no servidor.
- IP de acesso dos usuários.
- Notificação push ou por e-mail dos avisos da equipe.
- Abater a indicação na mensalidade.
- Sorteio pago (rifa).
- Integração com sistemas da Prefeitura.

## Success signal

- No banco simulado: configurar a indicação em R$ 50, aprovar um indicado e pagar a indicação até a despesa. Criar um sorteio com 2 prêmios, gerar os bilhetes, baixar o PDF, sortear 2 ganhadores diferentes, publicar o comunicado e ver o resultado no app. Editar o termo para oficiais e imprimir pela ficha. Emitir em lote as carteirinhas de não sócio e abrir a do aluno no app. Criar o grupo Recepção, simular o papel e ver o menu reduzido e o CPF mascarado. Enviar um aviso à Tesouraria e conferir o sino e a caixa de saída. Cadastrar uma empresa, barrar um CNPJ inválido, importar uma planilha e vincular um associado. Exportar os relatórios novos. Tudo sem erro.

## Assumptions

- Bonificação de indicação: valor fixo por indicado, com direito quando a filiação é aprovada (a outra opção é depois da 1ª mensalidade paga). O valor padrão é R$ 0 até a associação informar.
- O pagamento da indicação é despesa (`fin_lanc` saída `ind-<indicado>`, categoria Indicações).
- O público do sorteio pode ser: ativos, ativos sem dívida ou todos os vínculos ativos. Cada pessoa recebe um bilhete.
- O cadastro de empresas da Prefeitura de Aracaju são empresas ligadas a um convênio com a prefeitura. Foi feito como cadastro genérico, com vínculo opcional do associado.
- "Usuários logados": o protótipo não vê o IP. Ele registra a última entrada de cada pessoa da equipe, com o papel.

## Open Questions

- Qual é a regra real da bonificação por indicação (valor, quando é paga, se abate na mensalidade)?
- Sorteio: quem participa (só quem está em dia?), o número de bilhetes depende das mensalidades, existe regulamento ou regra no estatuto?
- Quais são os textos oficiais dos termos para oficiais, praças, BANESE e funcionários?
- Carteirinha de não sócio: qual a validade (semestre, ano), o modelo, e precisa de foto?
- Para que servem o cadastro de empresas da Prefeitura de Aracaju e a Base Cadastral da Prefeitura no sistema atual?
- Quem da equipe pode enviar avisos para todos?
