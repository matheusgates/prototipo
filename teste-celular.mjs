// uso: node cel.mjs <arquivo.html> <pastaSaida> <passos.json>
// passos: [{nome, js?, espera?, largura?}] -> tira print de cada um em 390x844 (celular)
import {spawn} from "node:child_process";
import fs from "node:fs";
const [,, arq, out, passosArq] = process.argv;
const passos = JSON.parse(fs.readFileSync(passosArq, "utf8"));
const dir = fs.mkdtempSync(out + "/prof-");
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ["--headless=new", "--remote-debugging-port=9333", "--user-data-dir=" + dir, "--no-first-run", "--hide-scrollbars", "about:blank"], {stdio: "ignore"});
const dorme = ms => new Promise(r => setTimeout(r, ms));
let alvo;
for (let i = 0; i < 40 && !alvo; i++) { await dorme(250); try { const l = await (await fetch("http://127.0.0.1:9333/json")).json(); alvo = l.find(t => t.type === "page"); } catch {} }
const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = {}; const erros = [];
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; }
  if (d.method === "Runtime.exceptionThrown") erros.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text);
  if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") erros.push(d.params.args.map(a => a.value || a.description).join(" ")); };
const cmd = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({id: i, method, params})); });
await cmd("Runtime.enable");
const larg = w => cmd("Emulation.setDeviceMetricsOverride", {width: w, height: 844, deviceScaleFactor: 2, mobile: w < 700});
await larg(390);
await cmd("Emulation.setEmulatedMedia", {features: [{name: "prefers-color-scheme", value: "light"}]});
await cmd("Page.navigate", {url: "file://" + arq});
await dorme(3500);
for (const p of passos) {
  if (p.largura) { await larg(p.largura); await dorme(400); }
  if (p.js) { const r = await cmd("Runtime.evaluate", {expression: p.js, awaitPromise: true, returnByValue: true}); if (r.result?.exceptionDetails) erros.push(p.nome + ": " + r.result.exceptionDetails.exception?.description); else if (r.result?.result?.value !== undefined) console.log(p.nome, "=>", JSON.stringify(r.result.result.value)); }
  await dorme(p.espera || 900);
  if (p.print !== false) { const s = await cmd("Page.captureScreenshot", {format: "png", captureBeyondViewport: !!p.inteira}); fs.writeFileSync(`${out}/${p.nome}.png`, Buffer.from(s.result.data, "base64")); }
}
console.log("erros:", erros.length ? erros : "nenhum");
ws.close(); chrome.kill();
