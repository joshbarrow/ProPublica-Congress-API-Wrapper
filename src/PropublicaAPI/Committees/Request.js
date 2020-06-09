import PropublicaRequest from '../Request'
import ModeNotSet from '../Exceptions/ModeNotSet'

export default class extends PropublicaRequest {

  async performFetch(query, mode) {

    const {
      congress,
      chamber,
      committeeID,
      subcommitteeID,
      category,
      date,
    } = query
    let response

    switch(mode) {
    case "list":
      response = await this.fetchList(congress, chamber)
      break

    case "show":
      response = await this.fetchShow(congress, chamber, committeeID)
      break

    case "recentHearings":
      response = await this.fetchRecentHearings(congress)
      break

    case "hearingsByCommittee":
      response = await this.fetchHearingsByCommittee(congress, chamber, committeeID)
      break

    case "subcommittee":
      response = await this.fetchSubcommittee(congress, chamber, committeeID, subcommitteeID)
      break

    case "communications":
      if (congress && category)
        response = await this.fetchCommunicationsByCategory(congress, category)
      else if (congress && chamber)
        response = await this.fetchCommunicationsByChamber(congress, chamber)
      else if (date)
        response = await this.fetchCommunicationsByDate(date)
      else if (congress)
        response = await this.fetchRecentCommunications(congress)
      break

      default: throw new ModeNotSet()

    }
    return response
  }

  async fetchList(congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchShow(congress, chamber, committeeID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees/${committeeID}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchRecentHearings(congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/committees/hearings.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchHearingsByCommittee(congress, chamber, committeeID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees/${committeeID}/hearings.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchSubcommittee(congress, chamber, committeeID, subcommitteeID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees/${committeeID}/subcommittees/${subcommitteeID}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchRecentCommunications(congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/communications.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchCommunicationsByCategory(congress, category) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/communications/category/${category}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchCommunicationsByDate(date) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/communications/date/${date}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchCommunicationsByChamber(congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/communications/${chamber}.json`)
    return this.request.response = responseFull.data.results
  }
}
