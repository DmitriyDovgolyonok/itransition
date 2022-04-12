const Game = require('./Game')
const secret_key = require('./Key')
const clc = require('cli-color')
const check = require('./HMAC')
const readline = require('readline')
const {createHmac} = require("crypto")
const prompt = require("prompt-sync")({sigint: true})
let crypto = require('crypto')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const game = new Game()
const secretKey = new secret_key()
const hmac = new check()

game.getMoves()
game.createRules()

newGame()

function newGame() {
    console.log(clc.green('New Game!'))
    //console.log(game.createComputerMove())
    game.createComputerMove()
    game.secret_key = secretKey.createKey()
    hmac.create(game.secret_key, game.computer_move)
    console.log(clc.black(`HMAC - ${hmac.HMAC}`))
    game.showGameTable()
    GameInterface()

}

function GameInterface() {
    const human_move = prompt('Please enter your choice: ')
    //console.log(human_move)

    if (human_move === '?') {
        //console.log('ur choise ?')
        console.table(game.rules)
        GameInterface()
        return
    } else if (human_move === '0') {
        return
    }

    if (human_move > 0 && human_move <= game.moves.length) {
        console.log(`Your choice  - ${game.moves[human_move - 1]}`)
        console.log(`Computer move - ${game.computer_move}`)
        result = game.determineMoves(game.moves[human_move - 1], game.computer_move)

        if (result === 'win')
            console.log(clc.green('You win!'))
        else if (result === 'lose')
            console.log(clc.red('You lost :('))
        else
            console.log('Draw')

        console.log(`HMAC key - ${game.secret_key}`)
        if (hmac.HMAC === crypto.createHmac('sha3-256', game.secret_key).update(game.computer_move).digest('hex')) {
            console.log('match')
        } else {
            console.log('no match')
        }

        while (true) {

            const next = prompt('Play again? :) (Y/N)')
            if (next === 'Y')
                newGame()
            else if (next === 'N')
                process.exit(1)
            else
                continue
        }
    } else {
        console.log(`Wrong terminal input. Your choice must be from 1 to ${game.moves.length}.Try again`)
        GameInterface()
    }
}







