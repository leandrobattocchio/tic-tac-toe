import { type TypeContext, type Cell as TypeCell } from '../type.d'
import { useContext, useEffect, useState } from 'react'
import { TableContext } from '../context/TableContext'
import { GAME_STATUS, PLAYERS } from '../consts/consts'
import Circle from './Circle'
import Equis from './Equis'

interface Props {
    cell: TypeCell
}

const Cell: React.FC<Props> = ({ cell }) => {
    const { handleChangeCell, gameStatus, winnerRow } = useContext(TableContext) as TypeContext
    const [winner, setWinner] = useState(false)

    const changeCell = (): void => {
        if (gameStatus !== GAME_STATUS.IN_PROGRESS) {
            handleChangeCell(cell.id)
        }
    }

    useEffect(() => {
        if (winnerRow.length > 0) {
            const isWinner = winnerRow.some(id => cell.id === id)
            setWinner(isWinner)
        }
    }, [winnerRow])

    const isEmpty = cell.pick === ''
    if (isEmpty) return <div className='cell' onClick={() => { handleChangeCell(cell.id) }}></div>

    const CircleOrX = cell.pick === PLAYERS.PLAYER_ONE ? <Equis winner={winner} /> : <Circle winner={winner} />

    return <div className='cell' onClick={changeCell}>{CircleOrX}</div>
}

export default Cell
