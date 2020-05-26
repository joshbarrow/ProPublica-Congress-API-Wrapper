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

  async fetch(query, mode) {
    const { congress, chamber, state, district, id } = query
    let response

    switch(mode) {
    case "new":
      response = await this.fetchNew()
      break

    case "district":
      response = await this.fetchByStateAndDistrict(chamber, state, district)
      break

    case "show":
      response = await this.fetchOne(id)
      break

    case "votes":
      response = await this.fetchVotes(id)
      break

    case "leaving":
      response = await this.fetchLeaving(congress, chamber)
      break

    case "index":
      response = await this.fetchAll(congress, chamber)
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

  async fetchAll(congress, chamber) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`)
    const response = this.request.response = responseFull.data.results[0].members
    return response.filter(member => {
      if (this.query.party) {
        if (member.party !== this.query.party) return false
      }

      if (this.query.state) {
        if (member.state !== this.query.state) return false
      }

      return true
    })
  }

  async fetchOne() {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/members/${this.id}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchNew() {
    const responseFull = await this._fetch("https://api.propublica.org/congress/v1/members/new.json")
    return this.request.response = responseFull.data.results
  }

  async fetchVotes(id) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/members/${id}/votes.json`)
    return this.request.response = responseFull.data.results[0].votes
  }

  async fetchByStateAndDistrict(chamber, state, district) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/members/${chamber}/${state}/${district}/current.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchLeaving(congress, chamber) {
    const responseFull = await this._fetch(`https://api.propublica.org/congress/v1/${congress}/${chamber}/members/leaving.json`)
    return this.request.response = responseFull.data.results
  }
}
