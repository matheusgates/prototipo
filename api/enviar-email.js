// Envio de e-mails da secretaria (cobrança em lote, avisos) pelo Resend.
// Roda como função do servidor na Vercel: POST /api/enviar-email
// Variáveis de ambiente (Vercel › Settings › Environment Variables):
//   RESEND_API_KEY  chave da conta no resend.com
//   EMAIL_FROM      remetente com domínio verificado no Resend, ex.: "Secretaria <secretaria@suaassociacao.com.br>"
//   EMAIL_TOKEN     senha de envio; a equipe digita uma vez no app (fica só no aparelho)
//   EMAIL_REPLY_TO  (opcional) e-mail que recebe as respostas
// Corpo: { mensagens: [{ para, assunto, texto }] }  (até 100 por chamada)
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ erro: "Use POST." });
  const { RESEND_API_KEY, EMAIL_FROM, EMAIL_TOKEN, EMAIL_REPLY_TO } = process.env;
  if (!RESEND_API_KEY || !EMAIL_FROM || !EMAIL_TOKEN) return res.status(503).json({ erro: "Envio de e-mail não configurado no servidor." });
  if (req.headers["x-envio-token"] !== EMAIL_TOKEN) return res.status(401).json({ erro: "Senha de envio incorreta." });
  let corpo = req.body;
  if (typeof corpo === "string") { try { corpo = JSON.parse(corpo); } catch { corpo = null; } }
  const msgs = Array.isArray(corpo && corpo.mensagens) ? corpo.mensagens : [];
  const emailOk = e => typeof e === "string" && /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(e);
  const validas = msgs.filter(m => m && emailOk(m.para) && m.assunto && m.texto).slice(0, 100);
  if (!validas.length) return res.status(400).json({ erro: "Nenhuma mensagem válida." });
  const lote = validas.map(m => ({
    from: EMAIL_FROM,
    to: [m.para],
    subject: String(m.assunto).slice(0, 200),
    text: String(m.texto).slice(0, 20000),
    ...(EMAIL_REPLY_TO ? { reply_to: EMAIL_REPLY_TO } : {})
  }));
  try {
    const r = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(lote)
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(502).json({ erro: (d && d.message) || "O serviço de e-mail recusou o envio." });
    return res.status(200).json({ enviados: lote.length, ignorados: msgs.length - lote.length });
  } catch (e) {
    return res.status(502).json({ erro: "Não foi possível falar com o serviço de e-mail." });
  }
};
