import discord from 'discord.js';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const { Discord, Client, IntentsBitField } = discord
import { handlingSentMessages} from './handlingMessages.js' 

const rawData = fs.readFileSync('./data/commands.json', 'utf8');
export const commands = JSON.parse(rawData)

const API_KEY = process.env.API_KEY

export const client = new Client({
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

client.on('messageCreate', async (message) => handlingSentMessages(message))


client.login(API_KEY)