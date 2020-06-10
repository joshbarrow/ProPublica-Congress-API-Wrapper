import './App.css';
import PropublicaAPI from './PropublicaAPI'

const propublicaAPI = new PropublicaAPI('8ZF7cG4fkrseYNv1rGE3H6V749DE2ttLcaS8Ryw5', {
  // congress: 114,
  // chamber: "house"
})

function App() {
  propublicaAPI.Members
    .cosponsored("B001260", "cosponsored")
    .fetch()
  return null
}

export default App
