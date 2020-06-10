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
      id,
      year,
      quarter,
      category,
    } = query
    let response

    switch(mode) {
    case "new":
      response = await this.fetchNew()
      break


    case "memberExpenses":
      if (year)
        response = await this.fetchExpenses(id, year, quarter)
      else if (category)
        response = await this.fetchExpensesByCategory(id, category)
      break

    case "officeExpenses":
      response = await this.fetchOfficeExpenses(category, year, quarter)
      break

    case "index":
      response = await this.fetchAll(congress, chamber, { party, state })
      break

    default:
      throw new ModeNotSet()
    }

    return response
  }

  async fetchMemberExpenses(id, year, quarter) {
    const responseFull = await this.send(`https://api.propublica.org/congress/v1/members/${id}/office_expenses/${year}/${quarter}.json`)
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
}
