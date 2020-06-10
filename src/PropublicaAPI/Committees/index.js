import Request from './Request'
import Resource from '../Resource'

export default class Committees extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  index() {
    this._mode = "index"
    return this
  }

  show(committeeID) {
    this._mode = "show"
    this.query.committeeID = committeeID
    return this
  }

  hearings(committeeID) {
    this._mode = "hearings"
    if (committeeID) {
      this.query.committeeID = committeeID
      this._mode = "hearingsByCommittee"
    } else {
      this._mode = "hearings"
    }
    return this
  }

  subcommittee(committeeID, subcommitteeID ) {
    this._mode = "subcommittee"
    this.query.committeeID = committeeID
    this.query.subcommitteeID = subcommitteeID
    return this
  }
}
