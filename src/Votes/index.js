import Resource from '../Resource'
import Request from './Request'
import PersonalExplanations from './PersonalExplanations'


export default class Votes extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
    this.PersonalExplanations = new PersonalExplanations(apiKey, config)
  }

  get mode() {
    const {
      chamber,
      congress,
      before,
      after,
      type,
      rollCallNumber,
      sessionNumber,
      year,
      month
    } = this.query

    if (congress && chamber && sessionNumber && rollCallNumber) return "rollCall"
    if (congress && chamber && type) return "byType"
    if (before && after) return "byDate"
    if (year && month) return "byDate"
    if (congress) return "byNomination"
    if (chamber) return "index"


    return this._mode
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
