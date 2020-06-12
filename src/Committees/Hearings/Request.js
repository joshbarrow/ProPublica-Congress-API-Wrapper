import PropublicaRequest from '../../Request'
import ModeNotSet from '../../Exceptions/ModeNotSet'

export default class extends PropublicaRequest {

  async performFetch(query, mode) {

    const {
      congress,
      chamber,
      committeeID
    } = query
    let response

    switch(mode) {

    case "byCommittee":
      response = await this.fetchByCommittee(congress, chamber, committeeID)
      break

    case "index":
      response = await this.fetchIndex(congress)
      break

    default:
      throw new ModeNotSet()
    }

    return response
  }

  async fetchIndex(congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/committees/hearings.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByCommittee(congress, chamber, committeeID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees/${committeeID}/hearings.json`)
    return this.request.response = responseFull.data.results
  }
}
