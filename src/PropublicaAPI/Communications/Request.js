import PropublicaRequest from '../Request'
import ModeNotSet from '../Exceptions/ModeNotSet'

export default class extends PropublicaRequest {

  async performFetch(query, mode) {

    const {
      congress,
      chamber,
      category,
      date,
    } = query
    let response

    switch(mode) {
    case "category":
      response = await this.fetchByCategory(congress, category)
      break

    case "chamber":
      response = await this.fetchByChamber(congress, chamber)
      break

    case "date":
      response = await this.fetchByDate(date)
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
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/communications.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByCategory(congress, category) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/communications/category/${category}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByDate(date) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/communications/date/${date}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByChamber(congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/communications/${chamber}.json`)
    return this.request.response = responseFull.data.results
  }
}
