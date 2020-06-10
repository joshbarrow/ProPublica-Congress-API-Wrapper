import './App.css';
import PropublicaAPI from './PropublicaAPI'

const propublicaAPI = new PropublicaAPI('8ZF7cG4fkrseYNv1rGE3H6V749DE2ttLcaS8Ryw5', {
  // congress: 114,
  // chamber: "house"
})

function App() {
  propublicaAPI.Members
    .state("CA")
    .chamber("house")
    .district(48)
    .fetch()
  return null
}

export default App
