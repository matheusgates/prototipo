# Pontos de encaixe no index.html (Onda 6)

| Onde | O que reaproveitar |
|---|---|
| Onda 1 (v31): `indicadoPor`, `o1FichaAssoc` (quem indicou / indicou), `catDe`, `ehNaoSocio`, `NS_TIPOS` | indicações e público da carteirinha de não sócio |
| `aprovadoEm` (gravado ao aprovar filiação), `fin_lanc` (tipo saida), `fin.lanc` | direito e pagamento da indicação |
| carteirinha: `cartVal`, `codCart`, `cartFoto`, `pCarteira` (só Ativo sócio), `carregarPDF`, `carregarQR` | carteirinha de não sócio no app e em PDF; `pCarteira` é reatribuída |
| termos: `o36Termo` (BANESE), `o38Termo` (acordo), `o35FichaPDF`, `o35Mais` (botões da ficha em "Mais ações") | termos editáveis impressos da ficha; os dois PDFs antigos continuam |
| LGPD: `PAPEIS`, `ACESSO` (objetos mutáveis), `papelReal`, `papel`, `podeVer`, `dadosCompletos`, `lgpd_config.papeis`, select `data-lpapel` (lista `Object.entries(PAPEIS)`) | grupos novos entram em PAPEIS/ACESSO e aparecem no select de papel |
| sino da equipe: `o3Sino`, `o3AbrirSino` (functions, reatribuíveis) | avisos da equipe no topo do sino |
| comunicados (coleção `comunicados`) | publicar resultado do sorteio |
| app: `O5_TELAS`, `TIT_P`, `pMais` | tela `sorteios` no app |
| `REL.push`, `exportarTabela`, `registrar`, `hist`, `o35Autor`, `o39DlAssoc`/`o39AchaAssoc` | relatórios, histórico, log e escolha de associado |
| ganchos | iniciar → iniciarOnda40; clique → o40Click antes de o39Click; change → o40Change; route → ligarOnda40; renderFicha embrulhado |

Ajustes pontuais fora do módulo:
- `dadosCompletos` passa a ler um `Set` mutável (`PAPEL_DC`) em vez da lista fixa.
- `papelReal` devolve "secretaria" quando o papel gravado não existe em `ACESSO`.

Coleções e campos novos:
- `app_config/indicacoes` {valor, quando: aprovacao|mensalidade}.
- `fin_lanc/ind-<indicadoId>` {tipo:"saida", cat:"Indicações", origem:"indicacao", indicadoId, indicadorId, valor, pagoEm, forma, status:"pago"}.
- `sorteios` {titulo, data, desc, publico: ativos|emdia|todos, premios[], bilhetes{assocId:num}, resultado[{premio, assocId, num, nome, em, por}], status: rascunho|bilhetes|encerrado|cancelado, cancelMotivo, comunicadoId}.
- `app_config/termos` {itens{k:{titulo, texto, ativo}}}; padrões `O40_TERMOS` (oficiais, pracas, banese, funcionarios, naosocio). Campos `{{nome}}`, `{{cpf}}`, `{{rg}}`, `{{mat}}`, `{{posto}}`, `{{forca}}`, `{{om}}`, `{{end}}`, `{{cidade}}`, `{{mens}}`, `{{banco}}`, `{{agencia}}`, `{{conta}}`, `{{tipo}}`, `{{funcao}}`, `{{data}}`, `{{associacao}}`.
- `associados.termos{k:{em, por}}` (assinado); `associados.cartNS{em, validade}`; `associados.empresaId`.
- `app_config/carteira_ns` {meses (validade), texto}.
- `app_config/equipe` {grupos{gid:{n, d, telas[], dc}}, telasPapel{papel:[telas]}}.
- `equipe_acessos/{uid}` {em, papel}.
- `equipe_avisos` {titulo, msg, link, validade, tags[], para:{tipo: todos|grupo|pessoa, v}, em, por, lidos{uid:em}}.
- `empresas` {cnpj, razao, fantasia, contato, tel, email, end, obs, ativa, criadoEm}.
