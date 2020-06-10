import Request from './Request'
import Resource from '../Resource'

export default class CommitteeStatements extends Resource {
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

  committee(committeeID) {
    this._mode = "byCommittee"

    if (committeeID)
      this.query.committeeID = committeeID

    return this
  }
}
