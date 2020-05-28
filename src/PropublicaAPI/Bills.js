import axios from 'axios'
import Fetch from './Bills/Fetch'

export default class Bills {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.query = {}
    this._mode = null
  }

  async fetch() {
    this._fetch = new Fetch(this.apiKey)
    const response = await this._fetch.fetch(this.query, this.mode)
    return response
  }

  twentyMostRecentBills() {
    this._mode = "twentyMostRecentBills"
    return this
  }

  twentyMostRecentBillsByType(type) {
    this._mode = "twentyMostRecentBillsByType"
    this.query.type = type
    return this
  }

  twentyMostRecentBillsByMember(id, type) {
    this._mode = "twentyMostRecentBillsByMember"
    this.query.id = id
    this.query.type = type
    return this
  }

  twentyMostRecentBillsBySubject(subject) {
    this._mode = "twentyMostRecentBillsBySubject"
    this.query.subject = subject
    return this
  }

  upcomingBills(subject) {
    this._mode = "upcomingBills"
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
    if (this.query.district) return "district"
    if (this.query.id) return "show"
    if (this.query.position) return "position"

    return "index"
  }


}
