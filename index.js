import discord from 'discord.js';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const { Discord, Client, IntentsBitField } = discord

import { printWarPlacar, updateWarPlacar, setWarScore } from './war-score.js';

const rawData = fs.readFileSync('./data/commands.json', 'utf8');
const commands = JSON.parse(rawData)

const API_KEY = process.env.API_KEY

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }
  const msg = message.content.toLowerCase();

  if (message.author.displayName == "Kaer") {
    if (msg.startsWith("!update-war")) {
      const player = message.content.split(" ")[1]
      updateWarPlacar(player, message)
    }

    if (msg.startsWith("!set-war-score")) {
      const player = message.content.split(" ")[1]
      const score = message.content.split(" ")[2]
  
      setWarScore(player, score, message)
    }
  
  }

  if (msg.startsWith("!placar-war")) {
    printWarPlacar(message)
  }


  if (commands['commands'][msg]) {
    const { additional = "", message: msg2 } = commands['commands'][msg];
    message.channel.send(msg2);
    if (additional ) {
      message.channel.send(additional);
    }
  }

  if (msg.startsWith("!commands")) {
    let msg = "- !placar-war\n"
    for (const [key, value] of Object.entries(commands.commands)) {
      msg += `- ${key} \n`
    }

    message.reply(msg);
  }


});

client.login(API_KEY)