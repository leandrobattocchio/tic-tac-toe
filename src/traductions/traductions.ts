import { type Language } from '../type.d'
import { LANGUAGES } from '../consts/consts'

export const spanishTraduction: Language = {
    playerOneWin: 'JUGADOR UNO GANA',
    playerTwoWin: 'JUGADOR DOS GANA',
    draw: 'EMPATE',
    playerOne: 'JUGADOR UNO',
    playerTwo: 'JUGADOR DOS'
}

export const englishTraduction: Language = {
    playerOneWin: 'PLAYER ONE WINS',
    playerTwoWin: 'PLAYER TWO WINS',
    draw: 'DRAW',
    playerOne: 'PLAYER ONE',
    playerTwo: 'PLAYER TWO'
}

export const dictionaryLanguages = {
    [LANGUAGES.SPANISH]: spanishTraduction,
    [LANGUAGES.ENGLISH]: englishTraduction
}
