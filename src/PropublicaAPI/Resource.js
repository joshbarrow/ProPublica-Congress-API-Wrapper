export default class Resource {
  constructor(apiKey, Request, { congress, chamber }) {
    this.apiKey = apiKey
    this.query = {}
    this._mode = null
    this.Request = Request
    this.defaultCongress = congress || 116
    this.defaultChamber = chamber
  }

  async fetch() {
    this.request = new this.Request(this.apiKey, {
      congress: this.defaultCongress,
      chamber: this.defaultChamber,
    })
    const response = await this.request.fetch(this.query, this.mode)
    return response
  }

  before(before) {
    this.query.before = before
    return this
  }

  offset(offset) {
    this.query.offset = offset
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

  year(year) {
    this.query.year = year
    return this
  }

  month(month) {
    this.query.month = month
    return this
  }
}
