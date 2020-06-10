import Request from './Request'
import Resource from '../Resource'

export default class OfficeExpenses extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    if (this._mode) return this._mode

    return "index"
  }

  memberExpenses({id, year, quarter, category}) {
    this._mode = "expenses"
    this.query.id = id
    this.query.year = year
    this.query.quarter = quarter
    this.query.category = category || this.query.category
    return this
  }

  officeExpenses(year, quarter, category) {
    this._mode = "officeExpenses"
    this.query.category = category || this.query.category
    this.query.year = year
    this.query.quarter = quarter
    return this
  }
}
