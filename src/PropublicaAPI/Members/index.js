import Request from './Request'
import Resource from '../Resource'

export default class Members extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    if (this._mode) return this._mode
    if (this.query.state && this.query.district) return "byStateAndDistrict"
    if (this.query.state) return "byState"

    return "index"
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

  republican() {
    this.query.party = "R"
    return this
  }

  democrat() {
    this.query.party = "D"
    return this
  }

  fromState(state) {
    this.query.state = state
    return this
  }

  show(id) {
    this._mode = "show"
    this.query.id = id
    return this
  }

  cosponsored(id, type) {
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

  expenses({id, year, quarter, category}) {
    this._mode = "expenses"
    this.query.id = id
    this.query.year = year
    this.query.quarter = quarter
    this.query.category = category || this.query.category
    return this
  }

  officeExpenses(year, quarter, category) {
    this._mode = "officeExpenses"
    this.query.category = category || this.query.category
    this.query.year = year
    this.query.quarter = quarter
    return this
  }

  privateTravel({ id, congress }) {
    this._mode = "privateTravel"
    this.query.id = id
    this.query.congress = congress
    return this
  }

  votes(id) {
    this._mode = "votes"
    this.query.id = id
    return this
  }

}
