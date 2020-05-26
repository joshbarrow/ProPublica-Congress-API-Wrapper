import axios from 'axios'

export default class FloorActions {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.query = {}
  }

  async fetch(congress) {
    const url = "https://api.propublica.org/congress/v1/Senate/floor_updates.json"
    const response = await axios.get(url, {
      headers: {
        'X-API-Key': this.apiKey
      }
    })
    const floorActions = response.data.results[0].floor_actions
    const filteredFloorActions =  floorActions.filter(floorAction => {

      return true
    })

    this.query = {}
    return filteredFloorActions
  }
}
