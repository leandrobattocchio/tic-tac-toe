interface Props {
  winner: boolean
}

const Circle: React.FC<Props> = ({ winner }) => {
  const className = winner ? 'circle winner-circle' : 'circle'

  return (
    <div className={className}></div>
  )
}

export default Circle
