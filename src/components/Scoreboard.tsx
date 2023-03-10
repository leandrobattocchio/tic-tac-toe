import { useContext } from 'react'
import { GAME_STATUS, PLAYERS } from '../consts/consts'
import { TableContext } from '../context/TableContext'
import { type TypeContext } from '../type.d'

const Scoreboard: React.FC = () => {
    const { actualPlayer, scoreboard, gameStatus, idiom } = useContext(TableContext) as TypeContext

    const playerOne = actualPlayer !== PLAYERS.PLAYER_ONE || gameStatus === GAME_STATUS.DRAW ? 'no-selected' : ''
    const playerTwo = actualPlayer !== PLAYERS.PLAYER_TWO || gameStatus === GAME_STATUS.DRAW ? 'no-selected' : ''
    const draw = gameStatus === GAME_STATUS.DRAW ? '' : 'no-selected'

    return (
        <div className='scoreboard'>
            <div className={playerOne}>
                <h2>{idiom.traduction.playerOne} (X)</h2>
                <h3>{scoreboard.playerOneWins}</h3>
            </div>
            <div className={draw}>
                <h2>-</h2>
                <h3>{scoreboard.draws}</h3>
            </div>
            <div className={playerTwo}>
                <h2>{idiom.traduction.playerTwo} (O)</h2>
                <h3>{scoreboard.playerTwoWins}</h3>
            </div>
        </div>
    )
}

export default Scoreboard
