import PropublicaRequest from '../Request'
import ChamberNotSet from '../Exceptions/ChamberNotSet'
import ModeNotSet from '../Exceptions/ModeNotSet'

export default class Request extends PropublicaRequest {

  async performFetch(query, mode) {
    const {
      after,
      before,
      chamber,
      congress,
      category,
      memberID,
      month,
      offset,
      rollCallNumber,
      sessionNumber,
      type,
      year,
      votes
    } = query
    let response
    switch(mode) {

    case "recent":
      if (!chamber) throw new ChamberNotSet()
      response = await this.fetchRecent(chamber, offset)
      break

    case "byRollCall":
      response = await this.fetchRollCall(sessionNumber, rollCallNumber, congress, chamber)
      break

    case "byType":
      response = await this.fetchByType(congress, chamber, type)
      break

    case "byDate":
      response = await this.fetchByDate(chamber, year, month, before, after)
      break

    case "nominations":
      response = await this.fetchNominations(congress)
      break

    case "explanations":
      if (congress && votes && !memberID && !category)
        response = await this.fetchPersonalExplanationVotes(congress, votes, offset)
      else if (memberID && congress && votes)
        response = await this.fetchMemberExplanationVotes(memberID, congress)
      else if (memberID && congress && category)
        response = await this.fetchMemberExplanationVotesByCategory(memberID, congress, category)
      else if (memberID && congress && category)
        response = await this.fetchPersonalExplanationVotesByCategory(congress, category, offset)
      else if (memberID && congress)
        response = await this.fetchMemberExplanation(memberID, congress)
      else if (congress)
        response = await this.fetchPersonalExplanations(congress, offset)
      break

      default:
        throw new ModeNotSet()
    }

    return response
  }

  async fetchRecent(chamber, offset) {
    console.log(offset);
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${chamber}/votes/recent.json`, { offset })
    return this.request.response = responseFull.data.results
  }

  async fetchByRollCall(sessionNumber, rollCallNumber, congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/sessions/${sessionNumber}/votes/${rollCallNumber}.json`)
    return this.request.response = responseFull.data.results

  }
  async fetchByDate(chamber, year, month, before, after) {
    const date1 = year ? year : before
    const date2 = year ? month : after
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${chamber}/votes/${date1}/${date2}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchNominations(congress) {
    const responseFull = await this.send(`ttps://api.propublica.org/congress/v1/${congress}/nominations.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchPersonalExplanations(congress, offset) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/explanations.json`, { offset })
    return this.request.response = responseFull.data.results
  }

  async fetchPersonalExplanationVotes(congress, offset) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/explanations/votes.json`, { offset })
    return this.request.response = responseFull.data.results
  }

  async fetchPersonalExplanationVotesByCategory(congress, category) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/explanations/votes/${category}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchMemberExplanation(memberID, congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${memberID}/explanations/${congress}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchMemberExplanationVotes(memberID, congress, votes) {
    const responseFull = await this.send(`GET https://api.propublica.org/congress/v1/members/${memberID}/explanations/${congress}/votes.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchMemberExplanationVotesByCategory(memberID, congress, category) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${memberID}/explanations/${congress}/votes/${category}.json`)
    return this.request.response = responseFull.data.results
  }
}
