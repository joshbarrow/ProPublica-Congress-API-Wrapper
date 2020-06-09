import Resource from '../Resource'
import Request from './Request'

export default class Votes extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    if (this.query.before && this.query.after) return "byDate"
    if (this.query.year && this.query.month) return "byDate"
    return this._mode
  }

  recent(offset) {
    this._mode = "recent"
    if (offset)
      this.query.offset = offset
    return this
  }

  byRollCall(sessionNumber, rollCallNumber) {
    this._mode = "byRollCall"
    this.query.sessionNumber = sessionNumber
    this.query.rollCallNumber = rollCallNumber
    return this
  }

  byType(type) {
    this._mode = "byType"
    this.query.type = type
    return this
  }

  nominations() {
    this._mode = "nominations"
    return this
  }

  explanations({votes, memberID, category, offset}) {
    this._mode = "explanations"
    if (offset)
      this.query.offset = offset
    this.query.memberID = memberID
    this.query.votes = votes
    this.query.category = category || this.query.category
    return this
  }

}
