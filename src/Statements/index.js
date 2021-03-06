import Request from './Request'
import Resource from '../Resource'
import Committee from './Committee'

export default class Statements extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
    this.Committee = new Committee(apiKey, config)
  }

  get mode() {
    const {
      term,
      date,
      subject,
      memberID,
      congress,
      billID,
    } = this.query

    if (memberID && congress) return "byMember"
    if (billID && congress) return "byBill"
    if (term) return "search"
    if (date) return "on"
    if (subject) return "bySubject"

    return "recent"

  }
}
