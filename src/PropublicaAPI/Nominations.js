import axios from 'axios'

export default class Nominations {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.query = {}
  }

  async fetch(congress, type) {
    const url = "https://api.propublica.org/congress/v1/116/nominees/confirmed.json"
    const response = await axios.get(url, {
      parameters: {
        congress,
        type,
      },
      headers: {
        'X-API-Key': this.apiKey
      }
    })
    const nominations = response.data.results
    const filteredNominations =  nominations.filter(nomination => {

      return true
    })

    this.query = {}
    return filteredNominations
  }
}
