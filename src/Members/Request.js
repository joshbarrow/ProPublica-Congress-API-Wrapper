import moment from 'moment'
import PropublicaRequest from '../Request'
import ModeNotSet from '../Exceptions/ModeNotSet'

export default class Request extends PropublicaRequest {

  async performFetch(query, mode) {
    const {
      congress,
      chamber,
      state,
      party,
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

    case "byState":
      response = await this.fetchByState(chamber, state)
      break

    case "byStateAndDistrict":
      response = await this.fetchByStateAndDistrict(chamber, state, district)
      break

    case "show":
      response = await this.fetchOne(id)
      break

    case "votes":
      response = await this.fetchVotes(id)
      break

    case "leaving":
      response = await this.fetchLeaving(congress, chamber)
      break

    case "compareVotes":
      response = await this.fetchVoteComparison(firstMemberID, secondMemberID, congress, chamber)
      break

    case "privateTravel":
      if (id)
        response = await this.privateTravel(id)
      else if (congress)
        response = await this.privateTravelByCongress(congress)
      break

    case "cosponsored":
      response = await this.fetchCosponsored(id, type)
      break

    case "compareSponsorships":
      response = await this.fetchSponsorshipComparison(firstMemberID, secondMemberID, congress, chamber)
      break

    case "position":
      response = await this.fetchPosition(id)
      break

    case "index":
      response = await this.fetchAll(congress, chamber, { party, state })
      break

    default:
      throw new ModeNotSet()
    }

    return response
  }


  async fetchAll(congress, chamber, { party }) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress || this.congress}/${chamber || this.chamber}/members.json`)
    const response = this.request.response = responseFull.data.results[0].members
    return response.filter(member => {
      if (party) {
        if (member.party !== party) return false
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

  async privateTravelByCongress(congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/private-trips.json`)
    return this.request.response = responseFull.data.results
  }

  async privateTravel(id) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/private-trips.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchExpensesByCategory(id, category) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/office_expenses/category/${category}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchOfficeExpenses(category, year, quarter) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/office_expenses/category/${category}/${year}/${quarter}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchSponsorshipComparison(firstMemberID, secondMemberID, congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${firstMemberID}/bills/${secondMemberID}/${congress}/${chamber}.json`)
    return this.request.response = responseFull.data.results
  }


  async fetchCosponsored(id, type) {
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

  async fetchVotes(id) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/votes.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByStateAndDistrict(chamber, state, district) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${chamber}/${state}/${district}/current.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByState(chamber, state) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${chamber}/${state}/current.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchLeaving(congress, chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/members/leaving.json`)
    return this.request.response = responseFull.data.results
  }
}
