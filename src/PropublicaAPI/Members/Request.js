import axios from 'axios'
import moment from 'moment'
import PropublicaAPIRequest from '../PropublicaAPIRequest'

export default class Request extends PropublicaAPIRequest {
  constructor(apiKey) {
    super(apiKey)
  }

  async fetch(query, mode) {
    const {
      congress,
      chamber,
      state,
      district,
      id,
      type,
      firstMemberID,
      secondMemberID,
      year,
      quarter,
      category,
    } = query
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
      response = await this.fetchVotes(id, query)
      break

    case "leaving":
      response = await this.fetchLeaving(congress, chamber)
      break

    case "expenses":
      response = await this.fetchExpenses(id, year, quarter)
      break

    case "quarterlyMemberExpensesByCategory":
    response = await this.fetchQuarterlyMemberExpensesByCategory(id, category)
    break

    case "quarterlyMemberExpenses":
    response = await this.fetchQuarterlyMemberExpenses(id, year, quarter)
    break

    case "quarterlyOfficeExpensesByCategory":
    response = await this.fetchQuarterlyOfficeExpensesByCategory(category, year, quarter)
    break

    case "compareVotes":
      response = await this.fetchVoteComparison(firstMemberID, secondMemberID, congress, chamber)
      break

    case "privatelyFundedTravel":
      response = await this.fetchPrivatelyFundedTravel(congress)
      break

      case "privatelyFundedTravelByMember":
        response = await this.fetchPrivatelyFundedTravelByMember(id)
        break

    case "cosponsored":
      response = await this.fetchCosponsoredByMember(id, type)
      break

    case "compareSponsorships":
      response = await this.fetchSponsorshipComparison(firstMemberID, secondMemberID, congress, chamber)
      break

    case "position":
      response = await this.fetchPosition(id)
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


  async fetchAll(congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`)
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
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${this.id}.json`)
    return this.request.response = responseFull.data.results
  }


  async fetchVoteComparison(firstMemberID, secondMemberID, congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${firstMemberID}/votes/${secondMemberID}/${congress}/${chamber}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchExpenses(id, year, quarter) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/office_expenses/${year}/${quarter}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchPrivatelyFundedTravel(congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/private-trips.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchPrivatelyFundedTravelByMember(id) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/private-trips.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchQuarterlyMemberExpenses(id, year, quarter) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/office_expenses/${year}/${quarter}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchQuarterlyMemberExpensesByCategory(id, category) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/office_expenses/category/${category}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchQuarterlyOfficeExpensesByCategory(category, year, quarter) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/office_expenses/category/${category}/${year}/${quarter}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchSponsorshipComparison(firstMemberID, secondMemberID, congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${firstMemberID}/bills/${secondMemberID}/${congress}/${chamber}.json`)
    return this.request.response = responseFull.data.results
  }


  async fetchCosponsoredByMember(id, type) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/bills/${type}.json`)
    return this.request.response = responseFull.data.results
  }


  async fetchNew() {
    const responseFull = await this.send("https://api.propublica.org/congress/v1/members/new.json")
    return this.request.response = responseFull.data.results
  }

  async fetchPosition() {
    const responseFull = await this.send("https://api.propublica.org/congress/v1/members/new.json")
    return this.request.response = responseFull.data.results
  }

  async fetchVotes(id, query) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/votes.json`)
    const response = this.request.response = responseFull.data.results
    return response.filter( vote => {

      if (query.before) {
        if (!moment(vote.date).isBefore(query.before)) return false
      }

      if (query.after) {
        if (!moment(vote.date).isAfter(query.after)) return false
      }

      return true
    })
  }

  async fetchByStateAndDistrict(chamber, state, district) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${chamber}/${state}/${district}/current.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchLeaving(congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/members/leaving.json`)
    return this.request.response = responseFull.data.results
  }
}
