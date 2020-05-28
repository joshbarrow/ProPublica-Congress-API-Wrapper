import './App.css';
import PropublicaAPI from './PropublicaAPI'

const propublicaAPI = new PropublicaAPI('8ZF7cG4fkrseYNv1rGE3H6V749DE2ttLcaS8Ryw5')

function App() {
  propublicaAPI.Bills
  .chamber("senate")
  .upcomingBills()
  .fetch()
  return null
}

export default App
