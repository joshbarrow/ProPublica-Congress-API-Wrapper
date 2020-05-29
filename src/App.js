import './App.css';
import PropublicaAPI from './PropublicaAPI'

const propublicaAPI = new PropublicaAPI('8ZF7cG4fkrseYNv1rGE3H6V749DE2ttLcaS8Ryw5')

function App() {
  propublicaAPI.Bills
  .congress(114)
  .cosponsors("hr4249")
  .fetch()
  return null
}

export default App
