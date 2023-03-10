import { useContext } from 'react'
import { TableContext } from '../context/TableContext'
import { type TypeContext } from '../type.d'
import GameFinishBoard from './GameFinishBoard'
import GameSettings from './GameSettings'
import Row from './Row'
import Scoreboard from './Scoreboard'

const Board: React.FC = () => {
    const { board } = useContext(TableContext) as TypeContext

    return (
        <>
            <header>
                <GameSettings />
            </header>
            <main>
                <GameFinishBoard />
                <div className='board'>
                    {
                        board.map((row, index) => {
                            return <Row row={row} key={index} />
                        })
                    }
                </div>
                <Scoreboard />
            </main>
        </>
    )
}

export default Board
