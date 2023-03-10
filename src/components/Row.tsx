import { type Row as TypeRow } from '../type.d'
import Cell from './Cell'

interface Props {
    row: TypeRow
}

const Row: React.FC<Props> = ({ row }) => {
    return (
        <div className='row'>
            {row.map((cell) => {
                return <Cell cell={cell} key={cell.id} />
            })}
        </div>
    )
}

export default Row
