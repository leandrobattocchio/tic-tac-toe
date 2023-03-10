import { type PLAYERS, type GAME_STATUS, type LANGUAGES } from './consts/consts'

export interface Cell {
    id: string
    pick: string
}

export interface Scoreboard {
    playerOneWins: number
    playerTwoWins: number
    draws: number
}

export interface TypeContext {
    actualPlayer: string
    board: Board
    gameStatus: GameStatusValues
    handleChangeCell: ({ id }: CellId) => void
    scoreboard: Scoreboard
    winnerRow: string[]
    idiom: Traduction
    sound: boolean
    toggleSound: () => void
    toggleIdiom: () => void
}

export interface Winner {
    winner: string
    cellWinner: string[]
}

export interface Language {
    playerOneWin: string
    playerTwoWin: string
    draw: string
    playerOne: string
    playerTwo: string
}

export interface Traduction {
    language: string
    traduction: Language
}

export type CellId = Pick<Cell, 'id'>
export type LanguagesValues = typeof LANGUAGES[keyof typeof LANGUAGES]
export type GameStatusValues = typeof GAME_STATUS[keyof typeof GAME_STATUS]
export type ActualPlayer = typeof PLAYERS[keyof typeof PLAYERS]
export type Row = Cell[]
export type Board = Row[]
