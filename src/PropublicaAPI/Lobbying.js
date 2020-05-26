import axios from 'axios'

export default class Lobbying {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.query = {}
  }

  async fetch() {
    const url = "https://api.propublica.org/congress/v1/lobbying/latest.json"
    const response = await axios.get(url, {
      headers: {
        'X-API-Key': this.apiKey
      }
    })
    const lobbying = response.data.results[0].lobbying_representations
    const filteredLobbying =  lobbying.filter(lobby => {

      return true
    })

    this.query = {}
    return filteredLobbying
  }
}
