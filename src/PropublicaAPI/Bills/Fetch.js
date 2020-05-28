import axios from 'axios'
import moment from 'moment'

export default class Fetch {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.request = {
      url: null,
      response: null,
      responseFull: null,
      responseFiltered: null,
    }
  }

  async fetch(query, mode) {
    const {
      congress,
      chamber,
      type,
      sort,
      dir,
      id,
      subject,
    } = query
    let response

    switch(mode) {

    case "twentyMostRecentBills":
      response = await this.fetchTwentyMostRecentBills(query, sort, dir)
      break

    case "upcomingBills":
      response = await this.fetchUpcomingBills(chamber)
      break

    case "twentyMostRecentBillsByType":
      response = await this.fetchTwentyMostRecentBillsByType(congress, chamber, type)
      break

    case "twentyMostRecentBillsByMember":
      response = await this.fetchTwentyMostRecentBillsByMember(id, type)
      break

    case "twentyMostRecentBillsBySubject":
      response = await this.fetchTwentyMostRecentBillsBySubject(subject)
      break

    default:
      throw `Unknown mode ${mode}`
    }

    this.query = {}
    this.request.responseFiltered = response
    return {
      data: response,
      request: this.request,
    }
  }

  async _fetch(url) {
    this.request.url = url
    this.request.responseFull = await axios.get(url, {
      headers: {
        'X-API-Key': this.apiKey
      }
    })

    return this.request.responseFull
  }

  async fetchTwentyMostRecentBills(query, sort, dir) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/bills/search.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchTwentyMostRecentBillsByType(congress, chamber, type) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/${congress}/${chamber}/bills/${type}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchTwentyMostRecentBillsByMember(id, type) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/members/${id}/bills/${type}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchTwentyMostRecentBillsBySubject(subject) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/bills/subjects/${subject}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchUpcomingBills(chamber) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/bills/upcoming/${chamber}.json`)
    return this.request.response = responseFull.data.results
  }
}
