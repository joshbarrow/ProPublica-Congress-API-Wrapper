import Request from './Request'
import Resource from '../../Resource'
import ModeNotSet from '../../Exceptions/ModeNotSet'

export default class Communications extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    const {
      congress,
      category,
      chamber,
      date,
    } = this.query

    if (congress && category) return "byCategory"
    if (congress && chamber) return "byChamber"
    if (date) return "byDate"
    if (congress) return "index"

    throw new ModeNotSet()
  }
}
