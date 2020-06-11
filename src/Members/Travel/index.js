import Request from './Request'
import Resource from '../../Resource'

export default class Travel extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    const {
      memberID,
      congress,
    } = this.query

    if (congress) return "byCongress"
    if (memberID) return "byMember"
  }
}
