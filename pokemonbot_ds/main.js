const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '**A wild pokémon ';
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('PescaPokemon è online');
});

client.on('message', message =>{

    if ( message.content.includes('The pokémon is') ){

        const args = message.content.slice(prefix.length).split(/ +/);
            
        client.commands.get('cattura').execute(message, args);
            
    }
});

client.login('YOUR DISCORD TOKEN');