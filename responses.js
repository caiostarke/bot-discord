import * as fs from 'fs';

const FILENAME = './data/givenResponse.json';

function readData() {
    const data =  fs.readFileSync(FILENAME)
    return JSON.parse(data)
}

export function hasUserSentResponse(username) {
    const data = readData()
    
    return data.responses.some(
        response => response.users.includes(username)
    )
}