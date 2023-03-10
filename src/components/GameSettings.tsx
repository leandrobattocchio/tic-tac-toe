import { SoundIcon, SoundMuttedIcon } from './Icons'
import idiom from '../assets/idiom.png'
import { useContext } from 'react'
import { TableContext } from '../context/TableContext'
import { type TypeContext } from '../type.d'

const GameSettings = (): JSX.Element => {
    const { sound, toggleSound, toggleIdiom } = useContext(TableContext) as TypeContext

    return (
        <div className="game-settings">
            <div onClick={toggleIdiom}><img src={idiom} style={{ width: '40px', height: '33px' }} /></div>
            <div style={{ width: '30px', height: '30px' }} onClick={toggleSound}>{sound ? <SoundIcon /> : <SoundMuttedIcon />}</div>
        </div>
    )
}

export default GameSettings
