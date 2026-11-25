# Pontos de encaixe no index.html (Onda 4)

| Onde | O que reaproveitar |
|---|---|
| módulo "v32 · ondas 3 e 4" (~l.3553), parte `o4*` | o4Plano, o4ValorIdade, o4Vidas, o4Recalc, o4Adesao (uma adesão), o4AdesoesHTML, o4FichaHTML/o4Ficha (aba Benefícios da ficha), o4Aderir, o4Copart, cartão (o4MovMes, o4FormMov, o4SalvarMov, o4CartaoHTML, o4FechaDia, o4Limite), vales (TIPOS_BEN, o4ValesHTML, o4LancarVales), IRPF (o4DadosIR, o4Informe, o4IRRel) |
| `views.beneficios`, `o4Ab` | abas planos, adesoes, cartao, vales: entram Operadoras (importação/conferência), Faixa etária e Lançamentos padrões |
| Onda 2: `o2PlanosPend`, `o2LancarPlanos` (fin_lanc `pl-<adesao>-<mês>`), `O2_LANC_COB`, `o2Coletar`, `o36Pref`/tipos de contrato | cobrança do plano por adesão e por responsável; origens novas `cartao`, `padrao`, `vale` |
| Onda 3: `O38_DIV_ORIG` | as origens novas entram na dívida |
| app: `telaP` → `O5_TELAS` (objeto, aceita chave nova), `TIT_P`, atalhos do Início (l.1778) e `pMais` | tela `beneficios` (Meus benefícios) e pedido de vale |
| `solTexto`, `aprovar` (reatribuíveis, como na v34) | pedido tipo `vale` em Solicitações |
| `exportarTabela`, `REL.push`, `carregarAutoTable`, `hist`, `registrar`, `o35Autor` | relatórios, histórico e log LGPD |
| ganchos | iniciar → iniciarOnda34; clique → o34Click; change → o34Change; route → ligarOnda34; renderFicha embrulhado (o34RenderFicha) |

Campos novos:
- `planos`: `operadora` vira opcional da lista `O39_OPER` (Unimed, Plamed, OdontoServ, PrevDonto, Outra); `codigo` (código do plano na operadora).
- `planos_adesoes`: id novo `pa-<assoc>-<plano>` (o antigo `pa-<assoc>` continua); `contrato`; `respId` (associado que paga); `vidas[i]` ganha `cart` (carteirinha), `cpf` (dependente), `inclEm`, `exclEm` (vida excluída fica com data, sai do valor); `copart[i]` ganha `vida` (índice) e `origem:"import"`.
- `planos_import` {planoId, tipo contratos|copart|fatura, mes, em, autor, casados, orfaos[{nome,cpfMasc,cart,valor}], difs[{adesaoId,vida,op,assoc}]}.
- `app_config/beneficios`: `layouts{operadora|cartao:{cpf,cart,nome,valor,data,estab,desc}}` (provisório), `irpfTexto`, `valeCfg{gas|combustivel:{desconta,valor}}`, `cartao{fecha,contrapartida}`.
- `associados.servicos.cartao`: `ref` = nº do cartão (já existe), `limite`.
- `cartao_mov`: `origem:"import"`, `importId`; `cartao_orfaos` não vira coleção: fica em `planos_import` com `tipo:"cartao"`.
- `fin_lanc`: `ct-<assoc>-<mês>` origem `cartao` (fatura fechada, `contrapartida`); `pd-<padrao>-<assoc>-<mês>` origem `padrao`; `vl-<vale>` origem `vale`.
- `ben_padroes` {cod, nome, valor, auto, ativo, tipoContrato, assocs[]}.
- `beneficios` (vales): `data`, `origem` app|equipe|lote, `pedidoId`; status ganha `pedido` (aguardando aprovação).
