import Request from './Request'
import Resource from '../Resource'
import Communications from './Communications'

export default class Committees extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
    this.Communications = new Communications(apiKey, config)
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

    throw new ModeNotSet()
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
}
