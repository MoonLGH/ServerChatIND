const D = require("discord.js");
const chalk = require("chalk");
const mineflayer = require("mineflayer");
const fs = require("fs")
const color = "#0A00AD"
const client = new D.Client();

let config = require("./config.json");
let guild = config.guild
let prefix = config.prefix;
let token = config.token;
let ip = config.server;
let username = config.username;
let password = config.password;
let ver = config.version;
let login = config.login;
let botver = config.botver;

let status = [];
let player = [];

const bot = mineflayer.createBot({
    version: config.version,
    host: ip,
    username: username,
	password: password
});

// =========================
// SET ACTIVITY BOT
// =========================
client.on('ready', () => {
   client.user.setStatus(`online`)
   client.user.setActivity(
     `${ip} Servers Chat, | For Help Do  ${prefix}help |`,
     { type: "WATCHING" }
   );
});
	

// =========================
//  Bot Logins / Serverchat
// =========================

//SERVER CHAT (log)
client.on("ready", async () => {
    console.log('\x1B[2J\x1B[3J\x1B[H\x1Bc')
    console.log(chalk.hex("#FFFFFF").bold("────────────────────────────────────────────────────────────"))
    console.log(chalk.hex("#006CFF")(`\u00BB Credits: `) + chalk.hex("#FFFFFF")(`Max.#0069`))
	console.log(chalk.hex("#006CFF")(`\u00BB Modifier: `) + chalk.hex("#FFFFFF")(`MoonL#6995`))
    console.log(chalk.hex("#006CFF")(`\u00BB Discord Bot: `) + chalk.hex("#FFFFFF")(`Discord Bot is now Online`))
    console.log(chalk.hex("#006CFF")(`\u00BB Any Issue Contact:`) + chalk.hex("#FFFFFF")(`Max.#0069`))
	console.log(chalk.hex("#006CFF")(`\u00BB Or`) + chalk.hex("#FFFFFF")(`MoonL#6995`))
    console.log(chalk.hex("#006CFF")(`\u00BB Bot Info:`) + chalk.hex("#FFFFFF")(` Logged into user `) + chalk.hex("#006CFF")(`${client.user.tag}. `))
		console.log(chalk.hex("#006CFF")(`\u00BB Bot Curret Version: `) + chalk.hex("#FFFFFF")(`${botver}`))
    console.log(chalk.hex("#FFFFFF").bold("────────────────────────────────────────────────────────────"))
})
bot.on("login", async () => {
    bot.chat(config.joincommand)
    console.log(chalk.hex("#006CFF")(`\u00BB Ingame Bot: `) + chalk.hex("#FFFFFF")(`Ingame Bot is now Online`))
    console.log(chalk.hex("#006CFF")(`\u00BB Bot Info: `) + chalk.hex("#FFFFFF")(`Logged into user `) + chalk.hex("#006CFF")(`${username}`))
console.log(chalk.hex("#006CFF")(`\u00BB Server Info: `) + chalk.hex("#FFFFFF")(`Logged into server `) + chalk.hex("#006CFF")(`${ip}`) + chalk.hex("#FFFFFF")(` on version `) + chalk.hex("#006CFF")(`${ver}`))
    console.log(chalk.hex("#FFFFFF").bold("────────────────────────────────────────────────────────────"))
    console.log(chalk.hex("#FFFFFF")(`\u00BB Server chat is `) + chalk.hex("#006CFF")("Enabled.") + chalk.hex("#FFFFFF")(" Logging all chats below"))
})

//SERVER CHAT (Discord)
bot.on("message", message => {
    let channel = client.channels.get(config.sc)
    if (!channel) return;
    channel.send(`From Server Chat >> ${message}`)
})
bot.on("message", message => {
    setTimeout(() => {
        console.log(chalk.hex("#006CFF")(`Serverchat \u00BB `) + chalk.hex("#FFFFFF")(`${message}`))
    }, 5000);
})

// Cmds
client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return
    let args = msg.content.split(" ").slice(1)
    let command = msg.content.split(" ")[0];
    command = command.slice(prefix.length)
    if (command == "online") {
        var sharedAccounts = fs.readFileSync("./accounts.txt", "utf-8").split("\r\n");
        for (let i = 0; i < sharedAccounts.length; i++) {
            if (bot.players.hasOwnProperty(`${sharedAccounts[i]}`)) {
                player.push(`**${sharedAccounts[i]}**`)
                status.push(`__**This Account is Online**__`)
            } else {
                player.push(`**${sharedAccounts[i]}**`)
                status.push(`Offline`)
            }
        }
        setTimeout(() => {
            const embed = D.MessageEmbed()
                .setDescription(`**Online Accounts**`)
                .addField(`**Account:**`, `${player.join("\n")}`, true)
                .addField(`**Status:**`, `${status.join("\n")}`, true)
                .setColor(color)
                .setThumbnail(guild.iconURL)
            msg.channel.send(embed)
            status = []
            player = []
        }, 750);

    } else if (command == "help") {
        const help = new D.MessageEmbed()
            .setTitle(`Bantuan`)
			.setColor(color)
			.addField(`${prefix}help `, 'Menunjukan Pesan ini')
			.addField(`${prefix}online`, 'Menunjukan Siapa Temanmu yang online')
			.addField(`${prefix}sudo`, 'Menyuruh Bot Untuk Melakukan Sebuah Command/Chat')
			.addField(`${prefix}help_pergerakan`, 'Menunjukan Bantuan Untuk Pergerakan Bot')
			.addField(`${prefix}login`, 'Menyuruh bot untuk login dengan password yang kamu telah berikan di config.json')
        msg.channel.send(help)
		
	} else if (command == "help_pergerakan") {
        const Phelp = new D.MessageEmbed()
            .setTitle(`Bantuan`)
			.setColor(color)
			.addField(`${prefix}maju `, 'Menyuruh Bot Untuk Maju')
			.addField(`${prefix}mundur`, 'Menyuruh Bot Untuk Mundur')
			.addField(`${prefix}kiri`, 'Menyuruh Bot Untuk Ke Kiri')
			.addField(`${prefix}kanan`, 'Menyuruh Bot Untuk Ke Kanan')
			.addField(`${prefix}berhenti`, 'Menyuruh Berhenti')
        msg.channel.send(Phelp)

    } else if (command  == "sudo") {
        let toSend = args.join(" ")
        if (!toSend) return msg.reply("Specify a message to sudo")
        bot.chat(toSend)
        const success = new D.MessageEmbed()
            .setDescription(`:white_check_mark: ${msg.author.tag} sent \`${toSend}\``)
            .setColor(color)
        msg.channel.send(success)
	}else if (command  == "login") {
        let LoginCommand = (`${login}`)
        bot.chat(LoginCommand)
        const LoginSucsess = new D.MessageEmbed()
            .setDescription(`:white_check_mark: ${msg.author.tag} menyuruh bot untuk \`Login\``)
            .setColor(color)
        msg.channel.send(LoginSucsess)
	// -------------
	// Pergerakan
	// -------------
    }else if (command  == "maju") {
        bot.setControlState('forward', true)
        const PMaju = new D.MessageEmbed()
            .setDescription(`:white_check_mark: Aku sedang Bergerak Maju. Untuk Menghentikan Ketik -berhenti`)
            .setColor(color)
        msg.channel.send(PMaju)
	}else if (command  == "mundur") {
        bot.setControlState('back', true)
        const PMundur = new D.MessageEmbed()
            .setDescription(`:white_check_mark: Aku sedang Bergerak Mundur. Untuk Menghentikan Ketik -berhenti`)
            .setColor(color)
        msg.channel.send(PMundur)
    }else if (command  == "berhenti") {
        bot.clearControlStates()
        const PStop = new D.MessageEmbed()
            .setDescription(`:white_check_mark: Berhenti!`)
            .setColor(color)
        msg.channel.send(PStop)
	}else if (command  == "kiri") {
        bot.setControlState('left', true)
        const PKiri = new D.MessageEmbed()
            .setDescription(`:white_check_mark: Aku sedang Bergerak Ke Kiri. Untuk Menghentikan Ketik -berhenti`)
            .setColor(color)
        msg.channel.send(PKiri)
	}else if (command  == "kanan") {
        bot.setControlState('right', true)
        const PKanan = new D.MessageEmbed()
            .setDescription(`:white_check_mark: Aku sedang Bergerak Ke Kanan. Untuk Menghentikan Ketik -berhenti`)
            .setColor(color)
        msg.channel.send(PKanan)
	}
})



// ===================================
//
//          [ Auto Accounts ]
//
// ===================================
setInterval(() => {
    if (config.autoEnabled == true) {
        var sharedAccounts = fs.readFileSync("./accounts.txt", "utf-8").split("\r\n");
        for (let i = 0; i < sharedAccounts.length; i++) {
            if (bot.players.hasOwnProperty(`${sharedAccounts[i]}`)) {
                player.push(`**${sharedAccounts[i]}**`)
                status.push(`__**Online**__`)
            } else {
                player.push(`**${sharedAccounts[i]}**`)
                status.push(`Offline`)
            }
        }
        setTimeout(() => {
            const embed = new D.MessageEmbed()
                .setDescription(`**Online Accounts**`)
                .addField(`**Account:**`, `${player.join("\n")}`, true)
                .addField(`**Status:**`, `${status.join("\n")}`, true)
                .setColor(color)
                .setThumbnail(guild.iconURL)
            const sendto = client.channels.get(config.accountSharingChannel)
            sendto.send(embed)
            status = []
            player = []
        }, 750);
    }
}, config.checkInterval * 60 * 1000);

client.login(token)
    .catch(error => {
        console.log(chalk.hex("#F44421")(`[ Invalid Token in Config.json ]`));
    })
