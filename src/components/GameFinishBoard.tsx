import { useContext } from 'react'
import { GAME_STATUS, PLAYERS } from '../consts/consts'
import { TableContext } from '../context/TableContext'
import { type TypeContext } from '../type.d'

const GameFinishBoard: React.FC = () => {
    const { gameStatus, actualPlayer, idiom } = useContext(TableContext) as TypeContext

    const className = gameStatus !== GAME_STATUS.INTIAL && gameStatus !== GAME_STATUS.IN_PROGRESS ? 'game-finish' : ''
    return (
        <div className={`game-board ${className}`}>
            {
                gameStatus !== GAME_STATUS.DRAW
                    ? <div>{actualPlayer === PLAYERS.PLAYER_ONE
                        ? idiom.traduction.playerOneWin
                        : idiom.traduction.playerTwoWin}</div>
                    : <div>{idiom.traduction.draw}</div>
            }
        </div>
    )
}

export default GameFinishBoard
