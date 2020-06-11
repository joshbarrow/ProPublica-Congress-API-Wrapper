import moment from 'moment'
import PropublicaRequest from '../../Request'
import ModeNotSet from '../../Exceptions/ModeNotSet'

export default class Request extends PropublicaRequest {

  async performFetch(params, mode) {
    const {
      query,
      congress,
      billID,
    } = params
    let response

    switch(mode) {

    case "search":
      response = await this.fetchSearch(query)
      break

    case "byBill":
      response = await this.fetchByBill(congress, billID)
      break

    default:
      throw new ModeNotSet()
    }

    return response
  }

  async fetchSearch(query) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/bills/subjects/search.json`, { query })
    return this.request.response = responseFull.data.results
  }

  async fetchByBill(congress, billID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/bills/${billID}/subjects.json`)
    return this.request.response = responseFull.data.results[0].subjects
  }

}
