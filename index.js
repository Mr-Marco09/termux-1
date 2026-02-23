//cat index.js
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys")
const P = require("pino")
const qrcode = require("qrcode-terminal")
const path = require("path")
const logoPath = path.resolve("./media/logo.png")
const startTime = Date.now()
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session")
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: P({ level: "silent" }),
        auth: state
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("connection.update", (update) => {
        const { connection, qr, lastDisconnect } = update

        if (qr) {
            console.log("🇭🇹📲 𝐒𝐂𝐀𝐍𝐍𝐄 𝐋𝐄 𝐐𝐑 🇭🇹:")
            qrcode.generate(qr, { small: true })
        }

        if (connection === "open") {
            console.log("🇭🇹✅ 𝐃𝐀𝐑𝐊-𝐌𝐈𝐍𝐈-𝐌𝐃 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐑🇭🇹")
        }

        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

            console.log("🇭🇹❌ 𝐃𝐄𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐑🇭🇹")

        if (shouldReconnect) {
                startBot()
            }
        }
    })

    sock.ev.on("messages.upsert", async ({ messages }) => {
const msg = messages[0]
if (!msg.message) return

// 🔥 Ignore les anciens messages
if (msg.messageTimestamp * 1000 < startTime) return

        const jid = msg.key.remoteJid

        // 🔥 Lecture universelle du message
        let texte = ""

     if (msg.message.conversation) {
            texte = msg.message.conversation
        }
         else if (msg.message.extendedTextMessage?.text) {
            texte = msg.message.extendedTextMessage.text
        }

      if (!texte) return
      console.log("Message détecté :", texte)
        console.log("Message reçu :", texte)

        const prefixes = [".","/","🇭🇹","⚡"];

// Cherche si le message commence par un des préfixes
const usedPrefix = prefixes.find(p => texte.startsWith(p));

if (!usedPrefix) return; // si aucun préfixe ne correspond, ignore le message

// Extrait la commande et les arguments
const args = texte.slice(usedPrefix.length).trim().split(/ +/);
const cmd = args.shift().toLowerCase();

console.log("Préfixe utilisé :", usedPrefix);
console.log("Commande détectée :", cmd);

       if (cmd === "ping") {
            await sock.sendMessage(jid, {
                   text: "🇭🇹🏓 𝐏𝐨𝐧𝐠 ! 𝐃𝐀𝐑𝐊-𝐌𝐈𝐍𝐈-𝐌𝐃 𝐒𝐓𝐑𝐎𝐍𝐆 👹 🇭🇹"
       })


        }else if (cmd === "info") {
            await sock.sendMessage(jid, {
            text: "🇭🇹𝐜𝐫𝐞𝐞𝐫 𝐩𝐚𝐫 ©𝐌𝐫 𝐌𝐚𝐫𝐜𝐨 🚀 𝐥𝐞 𝐠𝐞𝐧𝐢𝐞 𝐢𝐧𝐞𝐠𝐚𝐥𝐞𝐫 👌🇭🇹"
       })


       }else if (cmd === "marco") {
            await sock.sendMessage(jid, {
            text: "🇭🇹𝐇𝐄𝐀𝐑𝐓 𝐁𝐑𝐄𝐀𝐊 💔🇭🇹"
       })


       }else if (cmd === "menu") {
            await sock.sendMessage(jid, {
       image: { url: logoPath },
                caption: `> ╭━━━〔 𝐃𝐀𝐑𝐊-𝐌𝐈𝐍𝐈-𝐌𝐃 〕━━━⬣
> ┃ ➪ 🇭🇹!𝐀𝐢
> ┃ ➪ 🇭🇹!𝐏𝐢𝐧𝐠
> ┃ ➪ 🇭🇹!𝐌𝐞𝐧𝐮
> ┃ ➪ 🇭🇹!𝐈𝐧𝐟𝐨
> ┃ ➪ 🇭🇹!𝐌𝐚𝐫𝐜𝐨
> ┃ ➪ 🇭🇹!▶
> ╰━━━━━━━━━━━━━━━━━━━⬣
> ╭━━━〔𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐒〕━━━⬣
> ┃ ➪ 🇭🇹!𝐓𝐢𝐤𝐭𝐨𝐤
> ┃ ➪ 🇭🇹!𝐲𝐨𝐮𝐭𝐮𝐛
> ┃ ➪ 🇭🇹!𝐩𝐥𝐚𝐲
> ┃ ➪ 🇭🇹!𝐬𝐨𝐧𝐠
> ┃ ➪ 🇭🇹!𝐯𝐢𝐝𝐞𝐨
> ┃ ➪ 🇭🇹!𝐟𝐚𝐜𝐞𝐛𝐨𝐨𝐤
> ╰━━━━━━━━━━━━━━━━━━━⬣
> ╭━━━〔𝐆𝐑𝐎𝐔𝐏𝐌𝐄𝐍𝐔〕━━━⬣
> ┃ ➪ 🇭🇹!𝐓𝐚𝐠
> ┃ ➪ 🇭🇹!𝐡𝐢𝐝𝐞𝐭𝐚𝐠
> ┃ ➪ 🇭🇹!𝐭𝐚𝐠𝐚𝐥𝐥
> ┃ ➪ 🇭🇹!𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤
> ┃ ➪ 🇭🇹!𝐦𝐮𝐭𝐞
> ┃ ➪ 🇭🇹!𝐮𝐧𝐦𝐮𝐭𝐞
> ╰━━━━━━━━━━━━━━━━━━━⬣
> 𝐛𝐲 ©𝐌𝐫 𝐌𝐚𝐫𝐜𝐨𓅓 `
            })


      } else if (cmd === "tagall") {

    // Vérifie si c'est un groupe
    if (!jid.endsWith("@g.us")) {
        return await sock.sendMessage(jid, { text: "❌ Cette commande ne fonctionne que dans un groupe !" });
    }

    // Récupère les infos du groupe
    const groupMetadata = await sock.groupMetadata(jid);
    const participants = groupMetadata.participants; // tableau des participants

    // Prépare le message et les mentions
    let texte = "🇭🇹⚡ TAG ALL ⚡🇭🇹\n";
    let mentions = [];

    participants.forEach(user => {
        mentions.push(user.id); // ajoute le JID pour mention
        texte += `@${user.id.split("@")[0]} `; // texte visible
    });

    // Envoie le message avec toutes les mentions
    await sock.sendMessage(jid, {
        text: texte,
        mentions: mentions
    });


       }else if (cmd === "ai") {

    const question = args.join(" ")

      if (!question) {
        return await sock.sendMessage(jid, {
            text: "❓ Exemple: +ai 1+1"
        })
    }

    await sock.sendMessage(jid, { text: "🇭🇹🔁 𝐀𝐧𝐚𝐥𝐲𝐬𝐞 𝐞𝐧 𝐜𝐨𝐮𝐫𝐬...🇭🇹" })

    try {

        // Si c’est un calcul mathématique
       if (/^[0-9+\-*/(). ]+$/.test(question)) {

            const result = eval(question)

            return await sock.sendMessage(jid, {
                text: `🇭🇹⚡ ${question} = ${result}🇭🇹`
            })
        }

        // Sinon réponse IA simple
        let réponse = "🇭🇹💬 𝐰𝐚𝐢𝐭......🇭🇹"

        if (question.toLowerCase().includes("bonjour")) {
            réponse = "🇭🇹👋 𝐁𝐨𝐧𝐣𝐨𝐮𝐫 ! 𝐉𝐞 𝐬𝐮𝐢𝐬 𝐃𝐚𝐫𝐤-𝐌𝐢𝐧𝐢-𝐀𝐈 𝐯𝐨𝐮𝐬 𝐚𝐯𝐞𝐳 𝐮𝐧𝐞 𝐝𝐞𝐦𝐚𝐧𝐝𝐞?🇭🇹"

        } else if (question.toLowerCase().includes("qui es tu")) {
            réponse = "🇭🇹🤖 𝐉𝐞 𝐬𝐮𝐢𝐬 𝐮𝐧𝐞 𝐢𝐧𝐭𝐞𝐥𝐥𝐢𝐠𝐞𝐧𝐜𝐞 𝐚𝐫𝐭𝐢𝐟𝐟𝐢𝐜𝐢𝐞𝐥 𝐜𝐫𝐞𝐞𝐫 𝐩𝐚𝐫 ©𝐌𝐫 𝐌𝐚𝐫𝐜𝐨⚡🇭🇹."

        } else if (question.toLowerCase().includes("bot")) {
            réponse = "🇭🇹💻 𝐮𝐧 𝐛𝐨𝐭 𝐞𝐬𝐭 𝐮𝐧 𝐩𝐫𝐨𝐠𝐫𝐚𝐦𝐦𝐞 𝐚𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐬𝐞𝐫 𝐜𝐨𝐦𝐦𝐞 𝐦𝐨𝐢🥰🇭🇹."
        }

        await sock.sendMessage(jid, { text: "⚡ " + réponse })

    } catch (error) {

        await sock.sendMessage(jid, {
            text: "🇭🇹❌ 𝐄𝐫𝐫𝐞𝐮𝐫.🇭🇹"
        })
     }
   }
 })
}
startBot()
~/my---m $
