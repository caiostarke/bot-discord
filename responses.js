import * as fs from 'fs';
import { log } from './logger.js';

const FILENAME = './data/givenResponse.json';

function readData() {
    const data =  fs.readFileSync(FILENAME)
    return JSON.parse(data)
}

function saveData(data) {
    const updatedJSON = JSON.stringify(data);

    fs.writeFileSync(FILENAME, updatedJSON, 'utf8');
}

export function userSent(username, challengeID) {
    let data = readData()
    
    const relevantData = data.responses.find(response => response.challengeID === challengeID )

    if (relevantData) {
        relevantData.users.push(username)
    } else {
        data = addResponse(challengeID, username)
    }

    saveData(data)
}

export function hasUserSentResponse(username, challengeID) {
    const data = readData()

    const relevantResponse = data.responses.find(response => response.challengeID == challengeID)
    
    if (!relevantResponse) {
        return false
    }

    return relevantResponse.users.includes(username)
}

function addResponse(challengeID, username) {
    const data = readData()

    const newResponse = {
        challengeID: challengeID,
        users: [username]
    }

    data.responses.push(newResponse)

    return data
}