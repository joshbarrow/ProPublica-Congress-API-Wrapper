import Request from './Request'
import Resource from '../../Resource'
import ModeNotSet from '../../Exceptions/ModeNotSet'

export default class Subcommittees extends Resource {
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

    if (congress && chamber && committeeID && subcommitteeID) return "index"

    throw new ModeNotSet()
  }

  subcommittee(subcommitteeID) {
    this.query.subcommitteeID = subcommitteeID
    return this
  }
}
