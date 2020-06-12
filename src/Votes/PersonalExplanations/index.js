import Resource from '../../Resource'
import Request from './Request'

export default class PersonalExplanations extends Resource {
  constructor(apiKey, config){
    super(apiKey, Request, config)
  }

  get mode() {
    const {
      congress,
      category,
      memberID,
      votes,
    } = this.query
    if (this._mode) return this._mode
    if (memberID && congress && votes) return "byMemberVotes"
    if (memberID && congress && category) return "byMemberAndCategory"
    if (congress, votes) return "personalVotes"
    if (memberID && congress) return "byMember"
    if (congress && category) return "byCategory"
    if (congress) return "index"

  }

  votes() {
    this._mode = "votes"
    return this
  }

}
