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

  hearings() {
    this._mode = "hearings"
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
    this.query.category = category || this.query.category
    return this
  }
}
