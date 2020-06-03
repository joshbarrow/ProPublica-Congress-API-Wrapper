import './App.css';
import PropublicaAPI from './PropublicaAPI'

const propublicaAPI = new PropublicaAPI('8ZF7cG4fkrseYNv1rGE3H6V749DE2ttLcaS8Ryw5', {
  congress: 114,
  // chamber:
})

function App() {
  propublicaAPI.Votes
  .chamber("senate")
  .recent(4)
  .fetch()
  return null
}

export default App
