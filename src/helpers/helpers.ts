import { PLAYERS } from '../consts/consts'
import { type Row, type Board, type Winner } from '../type.d'

export const createGame = (size: number): Board => {
    const initialBoard: Board = []

    for (let i = 0; i < size; i++) {
        initialBoard.push([])
        for (let j = 0; j < size; j++) {
            initialBoard[i].push({ id: crypto.randomUUID(), pick: '' })
        }
    }

    return initialBoard
}

export const checkWinnerInRow = (row: Row): boolean => {
    return row.every((cell) => cell.pick === row[0].pick && cell.pick !== '')
}

export const checkDrawGame = (board: Board): boolean => {
    return board.flat().every((cell) => cell.pick !== '')
}

export const checkWinner = (board: Board): Winner => {
    // Check winner in row
    for (let i = 0; i < board.length; i++) {
        if (checkWinnerInRow(board[i])) {
            const cellsWinner = board[i].map((cell) => cell.id)
            return board[i][0].pick === PLAYERS.PLAYER_ONE ? { winner: PLAYERS.PLAYER_ONE, cellWinner: cellsWinner } : { winner: PLAYERS.PLAYER_TWO, cellWinner: cellsWinner }
        }

        // Check winner in column
        const column = []
        for (let j = 0; j < board.length; j++) {
            column.push(board[j][i])
        }

        if (checkWinnerInRow(column)) {
            const cellsWinner = column.map((cell) => cell.id)
            return column[0].pick === PLAYERS.PLAYER_ONE ? { winner: PLAYERS.PLAYER_ONE, cellWinner: cellsWinner } : { winner: PLAYERS.PLAYER_TWO, cellWinner: cellsWinner }
        }
    }

     // Check winner in diagonal
     const diagonal = []
     for (let j = 0; j < board.length; j++) {
         diagonal.push(board[j][j])
     }

     if (checkWinnerInRow(diagonal)) {
         const cellsWinner = diagonal.map((cell) => cell.id)
         return diagonal[0].pick === PLAYERS.PLAYER_ONE ? { winner: PLAYERS.PLAYER_ONE, cellWinner: cellsWinner } : { winner: PLAYERS.PLAYER_TWO, cellWinner: cellsWinner }
        }

     // Check winner in anti-diagonal
     const antiDiagonal = []
     for (let j = 0; j < board.length; j++) {
         antiDiagonal.push(board[j][board.length - 1 - j])
     }

     if (checkWinnerInRow(antiDiagonal)) {
        const cellsWinner = antiDiagonal.map((cell) => cell.id)
         return antiDiagonal[0].pick === PLAYERS.PLAYER_ONE ? { winner: PLAYERS.PLAYER_ONE, cellWinner: cellsWinner } : { winner: PLAYERS.PLAYER_TWO, cellWinner: cellsWinner }
        }

     if (checkDrawGame(board)) {
        return { winner: 'draw', cellWinner: [] }
     }

    return { winner: '', cellWinner: [] }
}
