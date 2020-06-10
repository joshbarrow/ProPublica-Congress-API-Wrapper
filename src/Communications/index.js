import Request from './Request'
import Resource from '../Resource'
import ModeNotSet from '../Exceptions/ModeNotSet'

export default class Communications extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    if (this.queryWithDefaults.congress && this.queryWithDefaults.category)
      return "category"
    else if (this.queryWithDefaults.congress && this.queryWithDefaults.chamber)
      return "chamber"
    else if (this.queryWithDefaults.date)
      return "date"
    else if (this.queryWithDefaults.congress)
      return "index"

    throw new ModeNotSet()
  }
}
