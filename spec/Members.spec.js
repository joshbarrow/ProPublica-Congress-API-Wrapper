import chai from "chai"
import sinon from 'sinon'
import axios from 'axios'
import PropublicaAPI from '../src'

const propublicaAPI = new PropublicaAPI("", {})
const genericResponse = {
  data: {
    results: [

    ]
  }
}
const indexResponse = {
  data: {
    results: [
      {
        members: []
      }
    ]
  }
}

chai.should()

function stubEndpoint(url, response, { dir, offset, sort } = {}) {
  const stub = sinon
    .mock(axios)
    .expects("get")
    .withArgs(url, {
      headers: { "X-API-Key": "" },
      params: { dir , offset , sort }
    })
    .once()
    .resolves(Promise.resolve(response))
}

afterEach(() => {
  sinon.restore()
})

describe("Members", () => {
  it("index", () => {
    stubEndpoint(`https://api.propublica.org/congress/v1/116/house/members.json`, indexResponse)
    propublicaAPI.Members.congress(116).chamber("house").fetch()
  })
  it("show", () => {
    stubEndpoint(`https://api.propublica.org/congress/v1/members/id.json`, genericResponse)
    propublicaAPI.Members.show("id").fetch()
  })
})
