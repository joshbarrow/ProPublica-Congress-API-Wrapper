import './App.css';
import PropublicaAPI from './PropublicaAPI'

const propublicaAPI = new PropublicaAPI('8ZF7cG4fkrseYNv1rGE3H6V749DE2ttLcaS8Ryw5')
// const propublicaAPI2 = new PropublicaAPI(

function App() {
  propublicaAPI.Members
    .show("K000388")
    .votes()
    .before()
    .after("04/20/2020")
    .fetch()
    .then(response => {
      console.log(response);
    })
  return null
}

export default App
