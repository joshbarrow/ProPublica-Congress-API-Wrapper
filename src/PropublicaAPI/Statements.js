import axios from 'axios'

export default class Statements {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.query = {}
  }

  async fetch(chamber) {
    const url = "https://api.propublica.org/congress/v1/statements/latest.json"
    const response = await axios.get(url, {
      headers: {
        'X-API-Key': this.apiKey
      }
    })
    const statements = response.data.results
    const filteredStatements =  statements.filter(statement => {

      return true
    })

    this.query = {}
    return filteredStatements
  }
}
