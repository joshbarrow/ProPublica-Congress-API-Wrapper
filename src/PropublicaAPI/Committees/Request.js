import PropublicaRequest from '../Request'
import ModeNotSet from '../Exceptions/ModeNotSet'

export default class extends PropublicaRequest {

  async performFetch(query, mode) {

    const {
      congress,
      chamber,
      committeeID,
      subcommitteeID,
    } = query
    let response

    switch(mode) {
    case "index":
      response = await this.fetchIndex(congress, chamber)
      break

    case "show":
      response = await this.fetchShow(committeeID, congress, chamber)
      break

    case "hearings":
      response = await this.fetchHearings(congress)
      break

    case "hearingsByCommittee":
      response = await this.fetchHearingsByCommittee(committeeID, congress, chamber)
      break

    case "subcommittee":
      response = await this.fetchSubcommittee(committeeID, subcommitteeID, congress, chamber)
      break

    default: throw new ModeNotSet()

    }
    return response
  }

  async fetchIndex(congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchShow(committeeID, congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees/${committeeID}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchHearings(congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/committees/hearings.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchHearingsByCommittee(committeeID, congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees/${committeeID}/hearings.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchSubcommittee(committeeID, subcommitteeID, congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees/${committeeID}/subcommittees/${subcommitteeID}.json`)
    return this.request.response = responseFull.data.results
  }
}
