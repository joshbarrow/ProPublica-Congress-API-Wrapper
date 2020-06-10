import Members from './Members'
import Bills from './Bills'
import Votes from './Votes'
import CongressionalStatements from './CongressionalStatements'
import CommitteeStatements from './CommitteeStatements'
import Committees from './Committees'
import Communications from './Communications'
import OfficeExpenses from './OfficeExpenses'

export default class PropublicaAPI {
  constructor(apiKey, config) {
    this.Members = new Members(apiKey, config)
    this.Bills = new Bills(apiKey, config)
    this.Votes = new Votes(apiKey, config)
    this.CongressionalStatements = new CongressionalStatements(apiKey, config)
    this.CommitteeStatements = new CommitteeStatements(apiKey, config)
    this.Committees = new Committees(apiKey, config)
    this.Communications = new Communications(apiKey, config)
    this.OfficeExpenses = new OfficeExpenses(apiKey, config)
  }
}
