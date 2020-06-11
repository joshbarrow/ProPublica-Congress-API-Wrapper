import moment from 'moment'
import PropublicaRequest from '../../Request'
import ModeNotSet from '../../Exceptions/ModeNotSet'

export default class Request extends PropublicaRequest {

  async performFetch(query, mode) {
    const {
      congress,
      chamber,
      state,
      party,
      memberID,
      year,
      quarter,
      category,
    } = query
    let response

    switch(mode) {
    case "new":
      response = await this.fetchNew()
      break

    case "quarterlyByMember":
      response = await this.fetchQuarterlyByMember(memberID, year, quarter)
      break

    case "categoricallyByMember":
      response = await this.fetchCategoricallyByMember(memberID, category)
      break

    case "byCategory":
      response = await this.fetchByCategory(category, year, quarter)
      break

    default:
      throw new ModeNotSet()
    }

    return response
  }

  async fetchQuarterlyByMember(id, year, quarter) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/office_expenses/${year}/${quarter}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchCategoricallyByMember(id, category) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/office_expenses/category/${category}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByCategory(category, year, quarter) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/office_expenses/category/${category}/${year}/${quarter}.json`)
    return this.request.response = responseFull.data.results
  }
}
