import axios from 'axios'
import Fetch from './Members/Fetch'

export default class Members {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.query = {}
    this._mode = null
    this._fetch = new Fetch(this.apiKey)
  }

  fetch() {
    return this._fetch.fetch(this.query, this.mode)
  }

  congress(congress) {
    this.query.congress = congress
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

  get mode() {
    if (this._mode) return this._mode
    if (this.query.district) return "district"
    if (this.query.id) return "show"

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

  new() {
    this._mode = "new"
    return this
  }

  leaving() {
    this._mode = "leaving"
    return this
  }

  votes() {
    this._mode = "votes"
    return this
  }

}
