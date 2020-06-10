import Request from './Request'
import Resource from '../Resource'

export default class CongressionalStatements extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    if (this.query.date) return "on"
    return this._mode
  }

  recent() {
    this._mode = "recent"
    return this
  }

  search(term) {
    this._mode = "search"
    this.query.term = term
    return this
  }

  subjects() {
    this._mode = "subjects"
    return this
  }

  bySubject(subject) {
    this._mode = "bySubject"
    this.query.subject = subject
    return this
  }

  byMember(memberID, congress) {
    this._mode = "byMember"
    this.query.memberID = memberID
    this.query.congress = congress
    return this
  }

  byBill(billID, congress) {
    this._mode = "byBill"
    this.query.billID = billID
    this.query.congress = congress
    return this
  }
}
