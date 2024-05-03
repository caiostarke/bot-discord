import * as fs from 'fs';
import { hasUserSentResponse } from './responses.js';
import { HandleUser } from './user.js';
import { log } from './logger.js';

const FILENAME = './data/challenges.json';

function readData() {
    const data =  fs.readFileSync(FILENAME)
    return JSON.parse(data)
}

function help(message) {
    let msg = "List of commands: \n"

    commands.forEach(command => {
        msg += `${command}\n`
    })

    message.reply(msg)
}

export function Challenge(message) {
    let msg = "English Challenge\n\n"

    const data = readData()

    const RANDOM_ID = Math.floor(Math.random() * (data['challenges'].length - 1 + 1) + 1);

    msg = handleChallenge(data, msg, RANDOM_ID)

    message.reply(msg)
}

export function Response(message) {
    const data = readData()

    let ID = message.content.split(" ")[1]
    let RESPONSE = message.content.split(" ").slice(2).join(" ")

    if (hasUserSentResponse(message.author.username, ID)) {
        message.reply("You already sent a response D: Nice Try lil newbie.\n\nTry a new Challenge")
        log("error", `User has sent a response ${message.author.username} ${ID} ${RESPONSE}`)
        
        return
    }

    data.challenges.forEach(challenge => {
        if (challenge.id != ID) {
            return
        }

        if (challenge['correct-response'] == RESPONSE) {
            HandleUser(message.author.username, true, ID)
            log("info", `User has sent a correct response ${message.author.username} ${ID} ${RESPONSE}`)
            message.reply("Correct :D You got 1 exp")
            return 
        } else {
            HandleUser(message.author.username, false, ID)
            log("info", `User has sent a wrong response ${message.author.username} ${ID} ${RESPONSE}`)
            message.reply(`Wrong... The correct response is: ${challenge['correct-response']}, you got 0 exp`)
            return
        }
    })
}

    function handleChallenge(data, msg, challengeID) {
        data['challenges'].forEach(challenge => {

            if (challenge.id != challengeID) {
                return
            }
    
            switch (challenge.type) {
                case "pick one": 
                    msg += `Pick the correct sentence:\n\n`
                    msg += `Usage example:\n\n`
                    msg += `Copy the sentence you think is correct and paste it after the ID\n`
                    msg += `!response ${challenge.id} ${challenge.options[0]}\n\n`
    
                    challenge.options.forEach(option => {
                        msg += `- ${option}\n`
                    })
                    break
                
                case "rewrite": 
                    msg += `Rewrite the sentence correcting the errors:\n\n`
                    msg += `Usage example:\n\n`
                    msg += `Copy the sentence and correct it and paste it after the ID => ${challenge.id}\n\n`
    
                    msg += `My boss is being a lot older than me.\n`
                    msg += `!response ${challenge.id} My boss is a lot older than me.\n\n`
    
                    msg += `BE AWARE. COPIE A SENTENCA AND MANTENHA A PONTUACAO.\n\n`
    
                    msg += `- ${challenge.option}`
                    break
            }
        })

        return msg
    }
