import Members from './Members'
import Bills from './Bills'

export default class PropublicaAPI {
  constructor(apiKey) {
    this.Members = new Members(apiKey)
    this.Bills = new Bills(apiKey)
  }
}
