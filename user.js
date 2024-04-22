import { randomUUID } from 'crypto';
import { create } from 'domain';
import * as fs from 'fs';
import { hasUserSentResponse } from './responses';

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

export function HandleUser(name, isResponseCorect) {
    const user = getUserByName(name)

    if (isResponseCorect && !hasUserSentResponse(name)) {
        user.exp += 1
        user.level = Math.floor(user.exp / 10)
    }

    return user
}