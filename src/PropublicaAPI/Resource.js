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
