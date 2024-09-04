function loadEvents(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Events', 'Status');
    require("colors");
    const moment = require('moment');
    const chalk = require('chalk');

    const folders = fs.readdirSync('./Events');
    let eventRow = [];
    for (const folder of folders) {
        const files = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(`../Events/${folder}/${file}`);

            if (event.rest) {
                if (event.once)
                    client.rest.once(event.name, (...args) =>
                        event.execute(...args, client)
                    );
                else
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client)
                    );
            } else {
                if (event.once)
                    client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args, client));
            }
            table.addRow(file, "loaded");
            
            eventRow.push(`${chalk.hex('#a9a9a9')(`[${moment().format('DD/MM - HH:mm:ss')}]`)} ${chalk.bgRed("[EVT]")} - ${file.slice(0, file.length - 3)}`);
            continue;
        }
    }
    return console.log(eventRow.join('\n').toString());
}

module.exports = { loadEvents };