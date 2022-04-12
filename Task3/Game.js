const clc = require('cli-color')
module.exports = class Game {
    rules
    moves
    computer_move
    secret_key

    getMoves(){
        const moves = process.argv.slice(2);
        this.errorInputHandler(moves)
        this.moves = moves;
    }

    determineMoves(yourMove, computerMove){
        return this.rules[yourMove][computerMove]
    }

    createRules(moves = this.moves) {

        this.rules = moves.reduce((columns, yourMove, index, array) => {

            columns[yourMove] = array.reduce((rows, computerMove) => {

                let centredMoves = this.centerMove(array.slice(0), yourMove)
                let indexComputerMove = centredMoves.indexOf(computerMove)

                rows[computerMove] =
                    (computerMove === yourMove) ? 'draw'
                        : indexComputerMove < Math.floor(array.length / 2) ? 'lose'
                            : 'win'

                return rows
            }, {})

            return columns
        }, {})

    }

    centerMove(element, moveToCenter) {

        while (element.indexOf(moveToCenter) !== Math.floor(element.length / 2)) {
            element.unshift(element.pop())
        }
        return element
    }

    showGameTable(){
        console.log('Moves: ')
        this.moves.forEach((el,i) => {
            console.log(clc.yellow(`${i + 1} - ${el}`))
        })
        console.log(clc.red('0 - to exit'))
        console.log(clc.red('? - to help'))
    }

    createComputerMove(){
        let i = Math.floor(Math.random() * this.moves.length)
        return this.computer_move = this.moves[i]
    }

    errorInputHandler(moves) {
        let errors = [
            {
                "description": "Input must be odd"
            },
            {
                "description": "Input must be >= 3"
            },
            {
                "description": "Input must be unique"
            }
        ]

        let hasDublicate = moves.some((val, i) => moves.indexOf(val) !== i)
        //console.log(hasDublicate)
        if (moves.length < 3) {
            console.log(errors[1].description)
            process.exit(1)
        }
        else if(moves.length % 2 === 0){
            console.log(errors[0].description)
            process.exit(1)
        }
        else if(hasDublicate){
            console.log(errors[2].description)
            process.exit(1)
        }

    }
}
