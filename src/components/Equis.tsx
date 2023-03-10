interface Props {
    winner: boolean
}

const Equis: React.FC<Props> = ({ winner }) => {
    const className = winner ? 'equis winner-equis' : 'equis'

    return (
        <div className={className}></div>
    )
}

export default Equis
