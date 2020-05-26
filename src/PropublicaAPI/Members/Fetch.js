import axios from 'axios'

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

  fetch(query, mode) {
    const { congress, chamber, state, district, id } = query
    switch(mode) {
    case "new":
      return this.fetchNew()

    case "district":
      return this.fetchByStateAndDistrict(chamber, state, district)

    case "show":
      return this.fetchOne(id)

    case "votes":
      return this.fetchVotes(id)

    case "leaving":
      return this.fetchLeaving(congress, chamber)

    case "index":
      return this.fetchAll(congress, chamber)

    default:
      throw `Unknown mode ${mode}`
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

  async fetchAll(congress, chamber) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`)
    const response = this.request.response = responseFull.data.results[0].members
    const responseFiltered = response.filter(member => {
      if (this.query.party) {
        if (member.party !== this.query.party) return false
      }

      if (this.query.state) {
        if (member.state !== this.query.state) return false
      }

      return true
    })
    this.query = {}
    this.request.responseFiltered = responseFiltered
    return responseFiltered
  }

  async fetchOne() {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/members/${this.id}.json`)
    const response = this.request.response = responseFull.data.results

    this.query = {}
    this.request.responseFiltered = response
    return response
  }



  async fetchNew() {
    const responseFull = await this._fetch("https://api.propublica.org/congress/v1/members/new.json")
    const response = this.request.response = responseFull.data.results

    this.query = {}
    this.request.responseFiltered = response
    return response
  }

  async fetchVotes(id) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/members/${id}/votes.json`)
    const response = this.request.response = responseFull.data.results

    this.query = {}
    this.request.responseFiltered = response
    return response
  }

  async fetchByStateAndDistrict(chamber, state, district) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/members/${chamber}/${state}/${district}/current.json`)
    const response = this.request.response = responseFull.data.results


    this.query = {}
    this.request.responseFiltered = response
    return response
  }

  async fetchLeaving(congress, chamber) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/${congress}/${chamber}/members/leaving.json`)
    const response = this.request.response = responseFull.data.results


    this.query = {}
    this.resopnse.responseFiltered = response
    return response
  }

}
