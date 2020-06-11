import Request from './Request'
import Resource from '../Resource'
import Subjects from './Subjects'

export default class Bills extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
    this.Subjects = new Subjects(apiKey, config)
  }

  get mode() {
    const {
      query,
      congress,
      chamber,
      billID,
      type,
      subject,
      memberID,
    } = this.query

    if (query) return "search"
    if (congress && chamber && type) return "recent"
    if (memberID && type) return "byMember"
    if (subject) return "bySubject"
    if (chamber) return "upcoming"
    if (this._mode) return this._mode

  }

  show(billID) {
    if (memberID) return this._mode = "show"
    this.query.billID = billID
    return this
  }

  search(query) {
    this.query.query = query
    return this
  }

  recent(type, memberID, subject) {
    this.query.memberID = memberID
    this.query.subject = subject
    return this
  }

  amendments(congress) {
    this._mode = "amendments"
    return this
  }

  cosponsors() {
    this._mode = "cosponsors"
    return this
  }

  related() {
    this._mode = "related"
    return this
  }
}
