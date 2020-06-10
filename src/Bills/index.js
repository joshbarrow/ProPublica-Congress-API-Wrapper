import Request from './Request'
import Resource from '../Resource'

export default class Bills extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    if (this._mode) return this._mode
    if (this.query.id) return "show"

    return "search"
  }

  search(query, sort, dir) {
    this._mode = "search"
    this.query.query = query
    this.query.sort = sort
    this.query.dir = dir
    return this
  }

  recent({ type, member, subject }) {
    this._mode = "recent"
    this.query.type = type || "introduced"
    this.query.memberID = member
    this.query.subject = subject
    return this
  }

  upcoming() {
    this._mode = "upcoming"
    return this
  }

  show(billID) {
    this._mode = "show"
    this.query.billID = billID
    return this
  }

  amendments(billID) {
    this._mode = "amendments"
    this.query.billID = billID
    return this
  }

  cosponsors(billID) {
    this._mode = "cosponsors"
    this.query.billID = billID
    return this
  }

  subjects({ bill, query }) {
    this._mode = "subjects"
    this.query.billID = bill
    this.query.query = query || ""
    return this
  }

  related(billID) {
    this._mode = "related"
    this.query.billID = billID
    return this
  }
}
