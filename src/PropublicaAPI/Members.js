import Fetch from './Members/Fetch'

export default class Members {
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

  position(position) {
    this.query.position = position
    return this
  }

  state(state) {
    this.query.state = state
    return this
  }

  district(district) {
    this.query.district = district
    return this
  }

  compareVotes(firstMemberID, secondMemberID) {
    this._mode = "compareVotes"
    this.query.firstMemberID = firstMemberID
    this.query.secondMemberID = secondMemberID
    return this
  }

  compareSponsorships(firstMemberID, secondMemberID) {
    this._mode = "compareSponsorships"
    this.query.firstMemberID = firstMemberID
    this.query.secondMemberID = secondMemberID
    return this
  }

  get mode() {
    if (this._mode) return this._mode
    if (this.query.district) return "district"
    if (this.query.id) return "show"
    if (this.query.position) return "position"

    return "index"
  }

  republican() {
    this.query.party = "R"
    return this
  }

  democratic() {
    this.query.party = "D"
    return this
  }

  fromState(state) {
    this.query.state = state
    return this
  }

  show(id) {
    this.query.id = id
    return this
  }

  chamber(chamber) {
    this.query.chamber = chamber
    return this
  }

  cosponsoredByMember(id, type) {
    this._mode = "cosponsored"
    this.query.id = id
    this.query.type = type
    return this
  }

  new() {
    this._mode = "new"
    return this
  }

  leaving() {
    this._mode = "leaving"
    return this
  }

  expenses(id, year, quarter) {
    this._mode = "expenses"
    this.query.id = id
    this.query.year = year
    this.query.quarter = quarter
    return this
  }

  quarterlyMemberExpensesByCategory(id, category) {
    this._mode = "quarterlyMemberExpensesByCategory"
    this.query.id = id
    this.query.category = category
    return this
  }

  quarterlyMemberExpenses(id, year, quarter) {
    this._mode = "quarterlyMemberExpenses"
    this.query.id = id
    this.query.year = year
    this.query.quarter = quarter
    return this
  }

  quarterlyOfficeExpensesByCategory(category, year, quarter) {
    this._mode = "quarterlyOfficeExpensesByCategory"
    this.query.category = category
    this.query.year = year
    this.query.quarter = quarter
    return this
  }

  privatelyFundedTravel() {
    this._mode = "privatelyFundedTravel"
    return this
  }

  privatelyFundedTravelByMember() {
    this._mode = "privatelyFundedTravelByMember"
    return this
  }

  votes() {
    this._mode = "votes"
    return this
  }

}
