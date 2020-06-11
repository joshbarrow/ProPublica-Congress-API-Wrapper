import Request from './Request'
import Resource from '../Resource'

export default class OfficeExpenses extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    const {
      memberID,
      year,
      quarter,
      category
    } = this.query
    if (memberID && year && quarter) return "quarterlyByMember"
    if (memberID && category) return "categoricallyByMember"
    if (category && year && quarter) return "byCategory"
  }
}
