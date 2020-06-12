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

    case "index":
      if (!chamber) throw new ChamberNotSet()
      response = await this.fetchRecent(chamber, offset)
      break

    case "rollCall":
      response = await this.fetchRollCall(sessionNumber, rollCallNumber, congress, chamber)
      break

    case "byType":
      response = await this.fetchByType(congress, chamber, type)
      break

    case "byDate":
      response = await this.fetchByDate(chamber, year, month, before, after)
      break

    case "byNomination":
      response = await this.fetchByNomination(congress)
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

  async fetchRollCall(sessionNumber, rollCallNumber, congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/sessions/${sessionNumber}/votes/${rollCallNumber}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByType(congress, chamber, type) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/votes/${type}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByDate(chamber, year, month, before, after) {
    const date1 = year ? year : before
    const date2 = year ? month : after
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${chamber}/votes/${date1}/${date2}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByNomination(congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/nominations.json`)
    return this.request.response = responseFull.data.results
  }
}
