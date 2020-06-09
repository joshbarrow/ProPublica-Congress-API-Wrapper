import axios from 'axios'

export default class Request {
  constructor(apiKey, {
    congress,
    chamber,
  }) {
    this.defaultCongress = congress
    this.defaultChamber = chamber
    this.apiKey = apiKey
    this.request = {
      url: null,
      response: null,
      responseFull: null,
      responseFiltered: null,
    }
  }

  async fetch(query, mode, modifiers) {
    const response = await this.performFetch(query, mode, modifiers)
    this.query = {}
    this.request.responseFiltered = response
    return {
      data: response,
      request: this.request,
    }
  }

  async send(url, params) {
    this.request.url = url
    this.request.responseFull = await axios.get(url, {
      params,
      headers: {
        'X-API-Key': this.apiKey
      }
    })

    return this.request.responseFull
  }
}
