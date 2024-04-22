import * as fs from 'fs';

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

    console.log(RANDOM_ID)

    data['challenges'].forEach(challenge => {
        if (challenge.id != RANDOM_ID) {
            return
        }

        if (challenge.type === "pick one") {
            msg += `Pick the correct sentence:\n\n`
            msg += `Usage example:\n\n`
            msg += `Copy the sentence you think is correct and paste it after the ID\n`
            msg += `!response ${challenge.id} ${challenge.options[0]}\n\n`

            challenge.options.forEach(option => {
                msg += `- ${option}\n`
            })
        }
    })

    message.reply(msg)

    console.log(msg)    
}

export function Response(message) {
    const data = readData()

    let ID = message.content.split(" ")[1]
    let RESPONSE = message.content.split(" ").slice(2).join(" ")

    console.log(ID, RESPONSE)

    data['challenges'].forEach(challenge => {
        if (challenge.id != ID) {
            return
        }

        if (challenge['correct-response'] == RESPONSE) {
            message.reply("Correct :D You got 1 exp")
        } else {
            message.reply("Wrong")
        }
    })
}