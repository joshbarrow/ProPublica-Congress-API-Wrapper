import PropublicaRequest from '../Request'
import ModeNotSet from '../Exceptions/ModeNotSet'

export default class Request extends PropublicaRequest {

  async performFetch(query, mode, modifiers) {

    const {
      congress,
      date,
      term,
      subject,
      memberID,
      billID,
      committeeID,
    } = query
    let response

    switch(mode) {

    case "recent":
      if (modifiers.committeeMode)
        response = await this.fetchWithinCommittee()
      else
        response = await this.fetchRecent()
      break

    case "on":
      if (modifiers.committeeMode)
        response = await this.fetchWithinCommitteeByDate(date)
      response = await this.fetchOn(date)
      break

    case "search":
      if (modifiers.committeeMode)
        response = await this.fetchWithinCommitteeByTerm(term)
      else
        response = await this.fetchSearch(term)
      break

    case "subjects":
      response = await this.fetchSubjects()
      break

    case "bySubject":
      response = await this.fetchBySubject(subject)
      break

    case "byMember":
      response = await this.fetchByMember(memberID, congress)
      break

    case "byBill":
      response = await this.fetchByBill(congress, billID)
      break

    default:
      if (modifiers.committeeMode) {
        if (committeeID) {
          response = await this.fetchByCommittee(committeeID)
          break
        } else
          throw new ModeNotSet()
      }
      throw new ModeNotSet()
    }

    return response
  }

  async fetchRecent() {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/latest.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchOn(date) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/date/${date}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchSearch(term) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/search.json?query=${term}`)
    return this.request.response = responseFull.data.results
  }

  async fetchSubjects() {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/subjects.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchBySubject(subject) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/subject/${subject}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByMember(memberID, congress) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${memberID}/statements/${congress}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchByBill(congress, billID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/${congress}/bills/${billID}/statements.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchWithinCommittee() {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/committees/latest.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchWithinCommitteeByDate(date) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/committees/date/${date}.json`)
    return this.request.response = responseFull.data.results
  }

  async fetchWithinCommitteeByTerm(term) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/committees/search.json?query=${term}`)
    return this.request.response = responseFull.data.results
  }

  async fetchByCommittee(committeeID) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/statements/committees/${committeeID}.json`)
    return this.request.response = responseFull.data.results
  }
}
