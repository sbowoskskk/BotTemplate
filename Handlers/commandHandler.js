function loadCommands(client) {
  const fs = require("fs");
  require("colors");
  const moment = require('moment');
  const chalk = require('chalk');

  let commandsArray = [];
  let commandRow = [];

  const commandsFolder = fs.readdirSync("./Commands");
  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./Commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);

      const properties = { folder, ...commandFile };
	  if(commandFile.data) {
          client.commands.set(commandFile.data.name, properties);

          commandsArray.push(commandFile.data.toJSON());
          commandRow.push(`${chalk.hex('#a9a9a9')(`[${moment().format('DD/MM - HH:mm:ss')}]`)} ${chalk.hex('#141414').bgHex('#fa25cb')("[CMD]")} - ${file.slice(0, file.length - 3)}`);
          continue;
      }
    }
  }

  client.application.commands.set(commandsArray);

  return console.log(commandRow.join('\n').toString());
}

module.exports = { loadCommands };
