import Request from './Request'
import Resource from '../../Resource'

export default class Committee extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    const {
      date,
      committeeID,
      term,
    } = this.query

    if (term) return "search"
    if (committeeID) return "byCommittee"
    if (date) return "on"

    return "recent"

    throw new ModeNotSet()

  }
}
