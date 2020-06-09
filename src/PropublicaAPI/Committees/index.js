import Request from './Request'
import Resource from '../Resource'

export default class Committees extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    return this._mode
  }

  list() {
    this._mode = "list"
    return this
  }

  show(committeeID) {
    this._mode = "show"
    this.query.committeeID = committeeID
    return this
  }

  recentHearings() {
    this._mode = "recentHearings"
    return this
  }

  hearingsByCommittee(committeeID) {
    this._mode = "hearingsByCommittee"
    this.query.committeeID = committeeID
    return this
  }

  subcommittee(committeeID, subcommitteeID ) {
    this._mode = "subcommittee"
    this.query.committeeID = committeeID
    this.query.subcommitteeID = subcommitteeID
    return this
  }

  communications(date, category) {
    this._mode = "communications"
    this.query.date = date
    this.query.category = category
    return this
  }
}
