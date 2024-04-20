import { printWarPlacar, updateWarPlacar, setWarScore } from './war-score.js';
import { createSchedule, printSchedule, updateSchedule, destroySchedule, listSchedules } from './schedule.js';

import { commands } from './index.js';
import { Challenge, Response } from './english-challenges.js';

export const handlingSentMessages = async (message) => {
    if (message.author.bot) {
      return;
    }

    const msg = message.content.toLowerCase();
  
    if (message.member.roles.cache.some(role => role.name === "'-'")) {
      if (msg.startsWith("!create-sched")) {
        const name = message.content.split(" ")[1]
        const date = message.content.split(" ")[2]
    
        const names = message.content.split(" ").slice(3)
    
        createSchedule(message, name, date, ...names)
    
        printSchedule(message, name)
      }
    
      if(msg.startsWith("!update-sched")) {
        const name = message.content.split(" ")[1]
        const date = message.content.split(" ")[2]
  
        const names = message.content.split(" ").slice(3)
  
        if (names.length > 0) {
          updateSchedule(message, name, date, ...names)
        } else {
          updateSchedule(message, name, date)
        }
      }
  
        if(msg.startsWith("!destroy-sched")) {
        const name = message.content.split(" ")[1]
  
        if (name) {
          destroySchedule(message, name)
        }
  
        message.reply("Schedule destroyed successfully!")
      }
  
      if(msg.startsWith("!list-sched")) {
        listSchedules(message)
      }
    }
  
    const guildMember = await message.guild.members.fetch(message.author.id)
  
    if (guildMember.guild.ownerId == message.author.id) {
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
  
  
    if(msg.startsWith("!print-sched")) {
      const name = message.content.split(" ")[1]
      
      printSchedule(message, name)
    }
  
    
    if(msg.startsWith("!pau")) {
      const cm = Math.floor(Math.random() * (30 - 0 + 1)) + 0;

      const u = message.content.split(" ")[1]
      if (u) {
        message.reply(`${u} tem pauzin de ${cm}cm`)
      } else {
        message.reply(`${message.author.username} tem pauzin de ${cm}cm`)
      }
    }

    if (msg.startsWith("!challenge")) {
      Challenge(message)
    }

    if (msg.startsWith("!response")) {
      Response(message)
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
};
  