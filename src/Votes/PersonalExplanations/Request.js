import PropublicaRequest from '../Request'
import ChamberNotSet from '../../Exceptions/ChamberNotSet'
import ModeNotSet from '../../Exceptions/ModeNotSet'

export default class Request extends PropublicaRequest {

  async performFetch(query, mode) {
    const {
      congress,
      category,
      memberID,
      votes
    } = query
    let response
    switch(mode) {

    case "index":
      if (!congress) throw new ChamberNotSet()
      response = await this.fetchIndex(congress)
      break

    case "votes":
      response = await this.fetchWithVotesFilter(congress, votes)
      break

    case "byMemberAndCategory":
      response = await this.fetchByMemberAndCategory(memberID, congress, category)
      break

    case "byMember":
      response = await this.fetchByMember(memberID, congress)
      break

    case "byCategory":
      response = await this.fetchByCategory(congress, category)

    case "byMemberVotes":
      response = await this.fetchByMemberVotes(memberID, congress, votes)
      break

      default:
        throw new ModeNotSet()
    }

    return response
  }

  async fetchIndex(congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/explanations.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByCategory(congress, category) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/explanations/votes/${category}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchWithVotesFilter(congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/explanations/votes.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchVotesByCategory(congress, category) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/explanations/votes/${category}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByMember(memberID, congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${memberID}/explanations/${congress}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByMemberVotes(memberID, congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${memberID}/explanations/${congress}/votes.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByMemberAndCategory(memberID, congress, category) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${memberID}/explanations/${congress}/votes/${category}.json`)
    return this.request.response = responseFull.data.results
  }
}
