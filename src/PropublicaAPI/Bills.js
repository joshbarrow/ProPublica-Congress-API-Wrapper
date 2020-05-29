import Request from './Bills/Request'

export default class Bills {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.query = {}
    this._mode = null
  }

  async fetch() {
    this.request = new Request(this.apiKey)
    const response = await this.request.fetch(this.query, this.mode)
    return response
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

  before(before) {
    this.query.before = before
    return this
  }

  after(after) {
    this.query.after = after
    return this
  }

  congress(congress) {
    this.query.congress = congress
    return this
  }

  chamber(chamber) {
    this.query.chamber = chamber
    return this
  }

  get mode() {
    if (this._mode) return this._mode
    if (this.query.id) return "show"

    return "search"
  }


}
