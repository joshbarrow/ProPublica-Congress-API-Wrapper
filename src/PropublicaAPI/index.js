import Members from './Members'
import Bills from './Bills'
import Statements from './Statements'
import Votes from './Votes'
import Committees from './Committees'
import Nominations from './Nominations'
import FloorActions from './FloorActions'
import Lobbying from './Lobbying'

export default class PropublicaAPI {
  constructor(apiKey) {
    this.Members = new Members(apiKey)
    this.Bills = new Bills(apiKey)
    this.Votes = new Votes(apiKey)
    this.Statements = new Statements(apiKey)
    this.Committees = new Committees(apiKey)
    this.Nominations = new Nominations(apiKey)
    this.FloorActions = new FloorActions(apiKey)
    this.Lobbying = new Lobbying(apiKey)
  }
}
