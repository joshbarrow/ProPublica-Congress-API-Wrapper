export default class Resource {
  constructor(apiKey, Request, { congress, chamber }) {
    this.apiKey = apiKey
    this.query = {}
    this.modifiers = {}
    this._mode = null
    this.Request = Request
    this.defaultCongress = congress || 116
    this.defaultChamber = chamber
  }

  get mode() {
    return this._mode
  }

  get queryWithDefaults() {
    return {
      ...this.query,
      congress: this.query.congress || this.defaultCongress,
      chamber: this.query.chamber || this.defaultChamber,
    }
  }

  async fetch() {
    this.request = new this.Request(this.apiKey, {
      congress: this.defaultCongress,
      chamber: this.defaultChamber,
    })
    const response = await this.request.fetch(this.queryWithDefaults, this.mode, this.modifiers)
    return response
  }

  on(date) {
    this.query.date = date
    return this
  }

  before(before) {
    this.query.before = before
    return this
  }

  offset(offset) {
    this.query.offset = offset
    return this
  }

  category(category) {
    this.query.category = category
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

  subject(subject) {
    this.query.subject = subject
    return this
  }

  subcommittee(subcommitteeID) {
    this.query.subcommitteeID = subcommitteeID
    return this
  }

  chamber(chamber) {
    this.query.chamber = chamber
    return this
  }

  year(year) {
    this.query.year = year
    return this
  }

  bill(billID) {
    this.query.billID = billID
    return this
  }

  sort(field, dir) {
    this.query.dir = dir || this.query.dir
    this.query.sort = field
    return this
  }

  committee(committeeID) {
    this.query.committeeID = committeeID
    return this
  }

  member(memberID) {
    this.query.memberID = memberID
    return this
  }

  quarter(quarter) {
    this.query.quarter = quarter
    return this
  }

  type(type) {
    this.query.type = type
    return this
  }

  term(term) {
    this.query.term = term
    return this
  }

  sessionNumber(sessionNumber) {
    this.query.sessionNumber = sessionNumber
    return this
  }

  rollCallNumber(rollCallNumber) {
    this.query.rollCallNumber = rollCallNumber
    return this
  }

  month(month) {
    this.query.month = month
    return this
  }

  search(query) {
    this.query.query = query
    return this
  }
}
