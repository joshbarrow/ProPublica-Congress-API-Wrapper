import Request from './Request'
import Resource from '../../Resource'

export default class Subjects extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    const {
      query,
      congress,
      billID,
    } = this.query

    if (query) return "search"
    if (congress && billID) return "byBill"

  }
}
