import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { hasUserSentResponse, userSent } from './responses.js';
import { log } from './logger.js';

const FILENAME = './data/users.json';

function readData() {
    try {
        const data =  fs.readFileSync(FILENAME)

        return JSON.parse(data)

    } catch (error) {
        console.error(error)
        return
    }
}

function createUser(username) {
    const data = readData()

    const newUser = {
        id: randomUUID(),
        username: username,
        exp: 0,
        level: 0
    } 

    data.users.push(newUser)

    const updatedJsonUsers = JSON.stringify(data)

    fs.writeFileSync(FILENAME, updatedJsonUsers)
    log("info", `User ${username} created`)
}

export function getUserByName(username) {
    const data = readData()

    const user = data.users.find(user => user.username == username)

    if (!user) {
        createUser(username)
        return readData().users.find(user => user.name == username)
    } 

    return user
}

export function HandleUser(name, isResponseCorect, challengeID) {
    const data = readData()

    if (isResponseCorect) {
        data.users.map((user) => {
            if (user.username == name) {
                user.exp += 1
                user.level = Math.floor(user.exp / 10)
                
                log("info", `User ${name} received 1 exp`)
            }
        })

        saveData(data)
    } 

    userSent(name, challengeID)
}

function saveData(data) {
    const updatedJSON = JSON.stringify(data);
 
    fs.writeFileSync(FILENAME, updatedJSON, 'utf8');
}