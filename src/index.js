import Members from './Members'
import Bills from './Bills'
import Votes from './Votes'
import Statements from './Statements'
import Committees from './Committees'

export default class PropublicaAPI {
  constructor(apiKey, config) {
    this.Members = new Members(apiKey, config)
    this.Bills = new Bills(apiKey, config)
    this.Votes = new Votes(apiKey, config)
    this.Statements = new Statements(apiKey, config)
    this.Committees = new Committees(apiKey, config)
  }
}
