import { createContext, useEffect, useState } from 'react'
import { GAME_STATUS, LANGUAGES, PLAYERS } from '../consts/consts'
import { checkWinner, createGame } from '../helpers/helpers'
import { type Scoreboard, type ActualPlayer, type Board, type GameStatusValues, type TypeContext, type Traduction } from '../type.d'
import winningAudio from '../assets/game-over.mp3'
import pickingAudioEquis from '../assets/note-low.mp3'
import pickingAudioCircle from '../assets/note-high.mp3'
import { dictionaryLanguages } from '../traductions/traductions'

export const TableContext = createContext<TypeContext | null>(null)

interface Props {
    children: string | JSX.Element | JSX.Element[]
}

export const TableContextProvider: React.FC<Props> = ({ children }) => {
    const [gameStatus, setGameStatus] = useState<GameStatusValues>(GAME_STATUS.INTIAL)
    const [actualPlayer, setActualPlayer] = useState<ActualPlayer>(PLAYERS.PLAYER_ONE)
    const [board, setBoard] = useState<Board>(createGame(3))
    const [score, setScore] = useState<Scoreboard>({ playerOneWins: 0, playerTwoWins: 0, draws: 0 })
    const [winnerRow, setWinnerRow] = useState<string[]>([])
    const [sound, setSound] = useState(true)
    const [idiom, setIdiom] = useState<Traduction>({ language: LANGUAGES.SPANISH, traduction: dictionaryLanguages[LANGUAGES.SPANISH] })

    const changePlayer = (): void => {
        if (actualPlayer === PLAYERS.PLAYER_ONE) setActualPlayer(PLAYERS.PLAYER_TWO)
        if (actualPlayer === PLAYERS.PLAYER_TWO) setActualPlayer(PLAYERS.PLAYER_ONE)
    }

    const toggleIdiom = (): void => {
        idiom.language === LANGUAGES.SPANISH
            ? setIdiom({ language: LANGUAGES.ENGLISH, traduction: dictionaryLanguages[LANGUAGES.ENGLISH] })
            : setIdiom({ language: LANGUAGES.SPANISH, traduction: dictionaryLanguages[LANGUAGES.SPANISH] })
    }

    const toggleSound = (): void => {
        setSound(prevState => !prevState)
    }

    const restartGame = (): void => {
        const newGame = createGame(3)
        setBoard(newGame)
        setGameStatus(GAME_STATUS.INTIAL)
        setActualPlayer(PLAYERS.PLAYER_ONE)
        setWinnerRow([])
    }

    const handleChangeCell = (id: string): void => {
        if (gameStatus !== GAME_STATUS.IN_PROGRESS && gameStatus !== GAME_STATUS.INTIAL) {
            restartGame()
            return
        }

        const newBoard = board.map((row) => {
            return row.map((cell) => {
                if (cell.id === id) return { id, pick: actualPlayer }
                return cell
            })
        })

        if (actualPlayer === PLAYERS.PLAYER_ONE) {
            sound && pickAudioX().catch(e => { console.log(e) })
        } else {
            sound && pickAudioO().catch(e => { console.log(e) })
        }

        if (gameStatus === GAME_STATUS.INTIAL) {
            setGameStatus(GAME_STATUS.IN_PROGRESS)
        }

        setBoard(newBoard)
    }

    const changeScore = (player: GameStatusValues = 'DRAW'): void => {
        if (player === GAME_STATUS.PLAYER_ONE_WIN) {
            setScore(prevState => {
                return {
                    ...prevState,
                    playerOneWins: prevState.playerOneWins + 1
                }
            })
        }

        if (player === GAME_STATUS.PLAYER_TWO_WIN) {
            setScore(prevState => {
                return {
                    ...prevState,
                    playerTwoWins: prevState.playerTwoWins + 1
                }
            })
        }

        if (player === GAME_STATUS.DRAW) {
            setScore(prevState => {
                return {
                    ...prevState,
                    draws: prevState.draws + 1
                }
            })
        }
    }

    const winAudio = async (): Promise<void> => {
        const snd = new Audio(winningAudio)
        await snd.play()
    }

    const pickAudioX = async (): Promise<void> => {
        const snd = new Audio(pickingAudioEquis)
        await snd.play()
    }

    const pickAudioO = async (): Promise<void> => {
        const snd = new Audio(pickingAudioCircle)
        await snd.play()
    }

    useEffect(() => {
        if (gameStatus !== GAME_STATUS.INTIAL) {
            const gameFinish = checkWinner(board)
            if (gameFinish.winner !== '') {
                if (gameFinish.winner === PLAYERS.PLAYER_ONE) {
                    setWinnerRow(gameFinish.cellWinner)
                    setGameStatus(GAME_STATUS.PLAYER_ONE_WIN)
                    return
                }
                if (gameFinish.winner === PLAYERS.PLAYER_TWO) {
                    setWinnerRow(gameFinish.cellWinner)
                    setGameStatus(GAME_STATUS.PLAYER_TWO_WIN)
                    return
                }
                setGameStatus(GAME_STATUS.DRAW)
                return
            }

            changePlayer()
        }
    }, [board])

    useEffect(() => {
        if (gameStatus !== GAME_STATUS.IN_PROGRESS && gameStatus !== GAME_STATUS.DRAW && gameStatus !== GAME_STATUS.INTIAL) {
            changeScore(gameStatus)
            sound && winAudio().catch(e => { console.log(e) })
        }

        if (gameStatus === GAME_STATUS.DRAW) {
            changeScore(gameStatus)
        }
    }, [gameStatus])

    return (
        <TableContext.Provider value={{ actualPlayer, board, gameStatus, handleChangeCell, scoreboard: score, winnerRow, idiom, sound, toggleSound, toggleIdiom }}>
            {children}
        </TableContext.Provider>
    )
}
