import moment from 'moment'
import PropublicaRequest from '../../Request'
import ModeNotSet from '../../Exceptions/ModeNotSet'

export default class Request extends PropublicaRequest {

  async performFetch(query, mode) {
    const {
      congress,
      memberID,
    } = query
    let response

    switch(mode) {
    case "byCongress":
      response = await this.fetchByCongress(congress)
      break

    case "byMember":
      response = await this.fetchByMember(memberID)
      break

    default:
      throw new ModeNotSet()
    }

    return response
  }

  async fetchByCongress(congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/private-trips.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByMember(memberID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${memberID}/private-trips.json`)
    return this.request.response = responseFull.data.results
  }
}
