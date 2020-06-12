import PropublicaRequest from '../../Request'
import ModeNotSet from '../../Exceptions/ModeNotSet'

export default class extends PropublicaRequest {

  async performFetch(query, mode) {

    const {
      congress,
      chamber,
      committeeID,
      subcommitteeID
    } = query
    let response

    switch(mode) {

    case "index":
      response = await this.fetchIndex(congress, chamber, committeeID, subcommitteeID)
      break

    default:
      throw new ModeNotSet()
    }

    return response
  }

  async fetchIndex(congress, chamber, committeeID, subcommitteeID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees/${committeeID}/subcommittees/${subcommitteeID}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByCommittee(congress, chamber, committeeID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/committees/${committeeID}/hearings.json`)
    return this.request.response = responseFull.data.results
  }
}
