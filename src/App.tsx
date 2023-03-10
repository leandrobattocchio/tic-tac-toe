import Board from './components/Board'
import { TableContextProvider } from './context/TableContext'
import './App.css'

function App (): JSX.Element {
  return (
    <TableContextProvider>
      <Board />
    </TableContextProvider>
  )
}

export default App
