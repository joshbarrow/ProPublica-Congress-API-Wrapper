import axios from 'axios'

export default class Votes {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.query = {}
  }

  async fetch() {
    const url = "https://api.propublica.org/congress/v1/senate/votes/recent.json"
    const response = await axios.get(url, {
      headers: {
        'X-API-Key': this.apiKey
      }
    })
    const votes = response.data.results.votes
    const filteredVotes =  votes.filter(vote => {

      return true
    })

    this.query = {}
    return filteredVotes
  }
}
