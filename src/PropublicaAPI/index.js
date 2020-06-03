import Members from './Members'
import Bills from './Bills'
import Votes from './Votes'

export default class PropublicaAPI {
  constructor(apiKey, config) {
    this.Members = new Members(apiKey, config)
    this.Bills = new Bills(apiKey, config)
    this.Votes = new Votes(apiKey, config)
  }
}
