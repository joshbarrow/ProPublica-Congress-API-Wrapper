import Request from './Request'
import Resource from '../../Resource'
import ModeNotSet from '../../Exceptions/ModeNotSet'

export default class Hearings extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    const {
      congress,
      chamber,
      committeeID,
    } = this.query

    if (congress && chamber && committeeID) return "byCommittee"
    if (congress) return "index"

    throw new ModeNotSet()
  }
}
