import moment from 'moment'
import PropublicaRequest from '../Request'
import ModeNotSet from '../Exceptions/ModeNotSet'

export default class Request extends PropublicaRequest {

  async performFetch(params, mode) {
    const {
      type,
      sort,
      dir,
      query,
      subject,
      congress,
      chamber,
      billID,
      memberID,
    } = params
    let response

    switch(mode) {

    case "search":
      response = await this.fetchSearch(query, sort, dir)
      break

    case "show":
      response = await this.fetchShow(congress, billID)
      break

    case "specificBillSubject":
      response = await this.fetchSpecificBillSubject(subject)
      break

    case "amendments":
      response = await this.fetchAmendments(congress, billID)
      break

    case "cosponsors":
      response = await this.fetchCosponsors(congress, billID)
      break

    case "subjects":
      if (billID)
        response = await this.fetchSubjectsByBill(congress, billID)
      else
        response = await this.fetchSubjectsByTerm(query)
      break

    case "related":
      response = await this.fetchRelated(congress, billID)
      break

    case "upcoming":
      response = await this.fetchUpcoming(chamber)
      break

    case "recent":
      if (memberID)
        response = await this.fetchRecentByMember(memberID, type)
      else if (type)
        response = await this.fetchRecentByType(congress, chamber, type)
      else if (subject)
        response = await this.fetchRecentBySubject(subject)
      break



    default:
      throw new ModeNotSet()
    }

    return response
  }

  async fetchSearch(query, sort, dir) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/bills/search.json`, { query, sort, dir })
    return this.request.response = responseFull.data.results
  }

  async fetchRecentByType(congress, chamber, type) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/${chamber}/bills/${type}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchShow(congress, billID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/bills/${billID}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchAmendments(congress, billID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/bills/${billID}/amendments.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchRelated(congress, billID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/bills/${billID}/related.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchCosponsors(congress, billID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/bills/${billID}/cosponsors.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchSubjectsByBill(congress, billID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/bills/${billID}/subjects.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchSubjectsByTerm(query) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/bills/subjects/search.json`, { query })
    return this.request.response = responseFull.data.results
  }

  async fetchRecentByMember(memberID, type) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${memberID}/bills/${type}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchRecentBySubject(subject) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/bills/subjects/${subject}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchUpcoming(chamber) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/bills/upcoming/${chamber}.json`)
    return this.request.response = responseFull.data.results
  }
}
