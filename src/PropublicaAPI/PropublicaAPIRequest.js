import axios from 'axios'

export default class PropublicaAPIRequest {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.request = {
      url: null,
      response: null,
      responseFull: null,
      responseFiltered: null,
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
