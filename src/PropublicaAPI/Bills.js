import axios from 'axios'

export default class Bills {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.query = {}
  }

  async fetch(query, sort, dir) {
    const url = `https://api.propublica.org/congress/v1/bills/search.json`
    const response = await axios.get(url, {
      params: {
        query,
        sort,
        dir,
      },
      headers: {
        'X-API-Key': this.apiKey
      }
    })
    const bills = response.data.results[0].bills
    console.log();
    const filteredBills =  bills.filter(bill => {

      return true
    })

    this.query = {}
    return filteredBills
  }

  

}
