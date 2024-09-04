const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
require('colors')
const client = new Client({ intents: [Object.keys(GatewayIntentBits)], partials: [Object.keys(Partials)],});

client.on("unhandledRejection", (reason, p) => { console.error("Unhandled promise rejection:", reason, p);});

client.config = require("./config.json");
client.package = require("./package.json");
client.commands = new Collection();

module.exports = client;

client.login(client.config.client.authToken).then(() => { loadEvents(client); loadCommands(client);})

client.on("interactionCreate", async interaction => {
	if(interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName); 
		if(!command) { return;}
		try { await command.autocomplete(interaction);} catch(err) { return;}
}})

process.on('exit', code => {
	console.log(`The process stopped with the code: ${code}!`)
})
process.on("unhandledRejection", async (err) => {
	if(err.code) return console.log(`[ANTI - CRASH] Unhandled Rejection : ${err}`.red.bold)
	console.log(`[ANTI - CRASH] Unhandled Rejection : ${err}`.red.bold)
	console.log(err)
})

process.on('uncaughtException', async (err) => {
	if(err.code) return console.log(`[ANTI - CRASH] Unhandled Rejection : ${err}`.red.bold)
	console.log(`[ANTI - CRASH] Unhandled Rejection : ${err}`.red.bold)
	console.log(err)
});
process.on('warning', (...args) => console.log(...args));