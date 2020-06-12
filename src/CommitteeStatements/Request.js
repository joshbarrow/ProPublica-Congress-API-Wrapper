import PropublicaRequest from '../Request'
import ModeNotSet from '../Exceptions/ModeNotSet'

export default class Request extends PropublicaRequest {

  async performFetch(query, mode) {

    const {
      date,
      term,
      committeeID,
    } = query
    let response

    switch(mode) {

    case "recent":
      response = await this.fetchRecent()
      break

    case "on":
      response = await this.fetchByDate(date)
      break

    case "search":
      response = await this.fetchSearch(term)
      break

    case "byCommittee":
      response = await this.fetchByCommittee(committeeID)
      break

    default:
      throw new ModeNotSet()
    }

    return response
  }

  async fetchRecent() {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/committees/latest.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByDate(date) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/committees/date/${date}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchSearch(term) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/committees/search.json?query=${term}`)
    return this.request.response = responseFull.data.results
  }

  async fetchByCommittee(committeeID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/committees/${committeeID}.json`)
    return this.request.response = responseFull.data.results
  }
}
