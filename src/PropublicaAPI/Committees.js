import axios from 'axios'

export default class Committees {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.query = {}
  }

  async fetch(congress, chamber) {
    const url = "https://api.propublica.org/congress/v1/116/senate/committees.json"
    const response = await axios.get(url, {
      headers: {
        'X-API-Key': this.apiKey
      }
    })
    const committees = response.data.results
    const filteredCommittees =  committees.filter(committee => {

      return true
    })

    this.query = {}
    return filteredCommittees
  }
}
