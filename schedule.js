import { FILE } from 'dns';
import * as fs from 'fs';

const FILENAME = './data/schedule.json';

function readSchedule(message) {
    try {
        const data =  fs.readFileSync(FILENAME)
        return JSON.parse(data)
    } catch (error) {
        console.error(error)
        message.channel.send(`An error ocurred while reading Schedule database: ${error}`)
    }
}
  
function saveSchedule(message, data) {
    try {
        const updatedJSON = JSON.stringify(data);
        fs.writeFileSync(FILENAME, updatedJSON, 'utf8');
    } catch (error) {
        console.error(error)
        message.channel.send(`An error ocurred while saving Schedule database: ${error}`)
    }
}

export function createSchedule(message, sched_name, date, ...names) {
    try {
        const sched = readSchedule(message)

        sched['schedules'][sched_name] = {
            date: date,
            players: names
        }
    
        saveSchedule(message, sched)
    } catch (error) {
        console.error(error)
        message.channel.send(`An error ocurred while creating Schedule: ${error}`)
    }

}


export function printSchedule(message, name) {
    try {
        const data = readSchedule(message)

        const schedule = data['schedules'][name]
        if (!schedule) {
            message.channel.send(`Schedule ${name} not found`)
            return
        }

        let  msg  = `Agenda Atualizada: ${name} - Data: ${schedule.date} \n\n`
    
        schedule.players.forEach(user => {
            msg += `Confirmed users: **${user}**\n`
        })
    
        message.reply(msg)
    
    } catch(error){ 
        console.error(error)
        message.channel.send(`An error ocurred while printing Schedule: ${error}`)
    }
}
  
export function updateSchedule(message, name, date, ...names) {
    try {
        const data = readSchedule(message)

        if (date) {
            data['schedules'][name].date = date
        }
    
        if (names.length > 0) {
            data['schedules'][name].players.push(...names)
        }
    
        saveSchedule(message, data)
    
        printSchedule(message, name)
    } catch (error) {
        console.error(error)
        message.channel.send(`An error ocurred while updating Schedule: ${error}`)
    }
}

export function destroySchedule(message, name ) {
    try {
        const data = readSchedule(message)
        if (data['schedules'].hasOwnProperty(name)) {
            delete data['schedules'][name]
        }
        
        saveSchedule(message, data)

    }catch (error){
        console.error(error)
    }
}

export function listSchedules(message) {
    try {
        const data = readSchedule(message)

        let msg = "Schedules:\n\n"

        Object.keys(data['schedules']).forEach(sched => {
            msg += `${sched}\n`
        })

        message.reply(msg)

    }catch(error) {
        console.error(error)
        message.channel.send(`An error ocurred while listing Schedules: ${error}`)
    }
}