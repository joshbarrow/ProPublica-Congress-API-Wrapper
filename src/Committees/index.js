import Request from './Request'
import Resource from '../Resource'

export default class Committees extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    const {
      congress,
      chamber,
      committeeID,
      subcommitteeID
    } = this.query

    if (this._mode) return this._mode
    if (congress && chamber && committeeID && subcommitteeID) return "subcommittee"
    if (congress && chamber && committeeID) return "hearingsByCommittee"
    if (congress && chamber) return "index"
    if (congress) return "hearings"

  }

  show(committeeID) {
    this._mode = "show"
    this.query.committeeID = committeeID
    return this
  }
}
