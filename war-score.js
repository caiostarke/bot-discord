import * as fs from 'fs';

function readWarPlacar() {
    const data = fs.readFileSync('./data/data.json')

    return JSON.parse(data)
}
  
function saveWarScore(data) {
    const updatedJSON = JSON.stringify(data);
    fs.writeFileSync('./data/data.json', updatedJSON, 'utf8');
}


export function printWarPlacar(message) {
    const data = readWarPlacar()
  
    let msg = "Placar War Atualizado:\n\n"
  
    data['players'].forEach(player => {
      if (message.author.displayName == player.name) {
        msg += `**${player.name}**: ${player.score} \n`
      } else {
        msg += `${player.name}: ${player.score} \n`
      }
    })
  
    message.channel.send(msg)
}
  
export function updateWarPlacar(name, message) {
    const data = readWarPlacar()

    data['players'].forEach(player => {
        if (player.name == name)  {
            player.score += 1
            parseInt(player.score)
        }
    })

    saveWarScore(data)

    printWarPlacar(message)
}

export function setWarScore(name, score, message) {
    const data = readWarPlacar()

    data['players'].forEach(player => {
        if (player.name == name)  {
            player.score = parseInt(score)
        }
    })

    saveWarScore(data)
    
    printWarPlacar(message)
}   

