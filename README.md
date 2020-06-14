# Table of Contents

- [Introduction](#introduction)
- [Initialization](#initialization)
- [Members](#members)
  - [Index](#index)
  - [Get a Specific Member](#get-a-specific-member)
  - [Get New Members](#get-new-members)
  - [Get Current Members by State/District](#get-current-members-by-state-district)
  - [Get Members Leaving Office](#get-members-leaving-office)
  - [Get a Specific Member's Vote Positions](#get-a-specific-member-s-vote-positions)
  - [Compare Two Members Vote Positions](#compare-two-members-vote-positions)
  - [Compare Two Members' Bill Sponsorships](#compare-two-members--bill-sponsorships)
  - [Get Bills Cosponsored by a Specific Member](#get-bills-cosponsored-by-a-specific-member)
- [Office Expenses](#office-expenses)
  - [Get Quarterly Office Expenses by a Specific House Member](#get-quarterly-office-expenses-by-a-specific-house-member)
  - [Get Quarterly Office Expenses by Category for a Specific House Member](#get-quarterly-office-expenses-by-category-for-a-specific-house-member) 
  - [Get Quarterly Office Expenses for a Specified Category](#get-quarterly-office-expenses-for-a-specified-category)
- [Privately Funded Travel](#privately-funded-travel)
  - [Get Recent Privately Funded Trips](#get-recent-privately-funded-trips)
  - [Get Recent Privately Funded Trips by a Specific House Member](#get-recent-privately-funded-trips-by-a-specific-house-member)
- [Bills](#bills)
  - [Get Recent Bills](#get-recent-bills)
  - [Get Recent Bills by a Specific Member](#get-recent-bills-by-a-specific-member)
  - [Get Recent Bills by a Specific Subject](#get-recent-bills-by-a-specific-subject)
  - [Get Upcoming Bills](#get-upcoming-bills)
  - [Get Specific Bill](#get-specific-bill)
  - [Get Amendments for a Specific Bill](#get-amendments-for-a-specific-bill)
  - [Get Subjects for a Specific Bill](#get-subjects-for-a-specific-bill)
  - [Get Related Bills for a Specific Bill](#get-related-bills-for-a-specific-bill)
  - [Get a Specific Bill Subject](#get-a-specific-bill-subject)
  - [Get Cosponsors for a Specific Bill](#get-cosponsors-for-a-specific-bill)
- [Votes](#votes)
  - [Get Recent Votes](#get-recent-votes)
  - [Get a Specific Roll Call Vote](#get-a-specific-roll-call-vote)
  - [Get Votes by Type](#get-votes-by-type)
  - [Get Votes by Date](#get-votes-by-date)
  - [Get Senate Nomination Votes](#get-senate-nomination-votes)
- [Personal Explanations](#personal-explanations)
  - [Get Recent Personal Explanations](#get-recent-personal-explanations)
  - [Get Recent Personal Explanation Votes](#get-recent-personal-explanation-votes)
  - [Get Recent Personal Explanation Votes by Category](#get-recent-personal-explanation-votes-by-category)
  - [Get Recent Personal Explanations by a Specific Member](#get-recent-personal-explanations-by-a-specific-member)
  - [Get Recent Personal Explanation Votes by a Specific Member](#get-recent-personal-explanation-votes-by-a-specific-member)
  - [Get Recent Personal Explanation Votes by a Specific Member by Category](#get-recent-personal-explanation-votes-by-a-specific-member-by-category)

# Introduction

A wrapper for the ProPublica API

> Unit tests and TypeScript implementation in progress. Anticipated completion by November 2020.

# Initialization

```javascript
const propublicaAPI = new PropublicaAPI(apiKey)

// optionally, pass congress and chamber to set as global defaults
const propublicaAPI = new PropublicaAPI(apiKey, {
  congress: 114,
  chamber: "house"
})
```

> Obtain a ProPublica API key [here](https://www.propublica.org/datastore/api/propublica-congress-api)

# Members

Wrapper around the Members ProPublica API. More details can be found [here](https://projects.propublica.org/api-docs/congress-api/members/#members).

## Index

### URL:

`https://api.propublica.org/congress/v1/{congress}/{chamber}/members.json`

### Params:

**congress**: 102-116 for House, 80-116 for Senate **chamber**: `house` or `senate`

### Examples:

```javascript
const response = await propublicaAPI.Members
  .congress(116)
  .chamber("house")
  .fetch()

// filter by democrats
const response = await propublicaAPI.Members
  .congress(116)
  .chamber("house")
  .democrat()
  .fetch()

// filter by republicans
const response = await propublicaAPI.Members
  .congress(116)
  .chamber("house")
  .republican()
  .fetch()

// filter by state
const response = await propublicaAPI.Members
  .congress(116)
  .chamber("house")
  .state("CA")
  .fetch()
```

## Get a Specific Member

### URL:

`https://api.propublica.org/congress/v1/members/{id}.json`

### Params:

**id**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request.

### Example:

```javascript
const id = "K000388"
const response =  await propublicaAPI.Members
  .show(id)
  .fetch()
`
```

## Get New Members

### URL:

`https://api.propublica.org/congress/v1/members/new.json`

### Example:

```javascript
const response =  await propublicaAPI.Members
  .new()  
  .fetch()
```

## Get Current Members by State/District

### Params:

**chamber**: `house` or `senate` **state:** Two-letter state abbreviation **district:** House of Representatives district number (House requests only)

### URL:

### **Senate Request:**

`https://api.propublica.org/congress/v1/members/{chamber}/{state}/current.json`

### Example:

```javascript
const state = "RI"
const chamber = "senate"
const response =  await propublicaAPI.Members
  .chamber(chamber)   
  .state(state)  
  .fetch()
```

### House Request:

`https://api.propublica.org/congress/v1/members/{chamber}/{state}/{district}/current.json`

### Example:

```javascript
const district = 48
const response =  await propublicaAPI.Members
  .chamber("house")   
  .state("CA")
  .district(district)  
  .fetch()
```

## Get Members Leaving Office

### URL:

`https://api.propublica.org/congress/v1/{congress}/{chamber}/members/leaving.json`

### Params:

**congress**: 111-116 **chamber**: `house` or `senate`

### Example:

```javascript
const chamber =  "house"
const response =  await propublicaAPI.Members
  .congress(115)
  .chamber(chamber)  
  .leaving()  
  .fetch()
```

## Get a Specific Member's Vote Positions

### Params:

**id**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request.

### URL:

`https://api.propublica.org/congress/v1/members/{id}/votes.json`

### Example:

```javascript
const id = "K000388"
const response =  await propublicaAPI.Members
  .votes(id)
  .fetch()
```

## Compare Two Members Vote Positions

### Params:

**firstMemberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **secondMemberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **congress**: 102-116 for House, 101-116 for Senate **chamber**: `house` or `senate`

### URL:

`https://api.propublica.org/congress/v1/members/{firstMemberID}/votes/{secondMemberID}/{congress}/{chamber}.json`

### Example:

```javascript
const firstMemberID = "G000575"
const secondMemberID = "D000624"
const response =  await propublicaAPI.Members
  .congress(114)
  .chamber("house")
  .compareVotes(firstMemberID, secondMemberID)
  .fetch()
```

## Compare Two Members' Bill Sponsorships

### Params:

**firstMemberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **secondMemberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **congress**: 102-116 for House, 101-116 for Senate **chamber**: `house` or `senate`

### URL:

`https://api.propublica.org/congress/v1/members/{firstMemberID}/bills/{secondMemberID}/{congress}/{chamber}.json`

### Example:

```javascript
const firstMemberID = "B001283"
const secondMemberID = "C001101"
const response =  await propublicaAPI.Members
  .congress(114)
  .chamber("house")
  .compareSponsorships(firstMemberID, secondMemberID)
  .fetch()
```

## Get Bills Cosponsored by a Specific Member

### Params:

**id**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **type:** `cosponsored` or `withdrawn`

### URL:

`https://api.propublica.org/congress/v1/members/{id}/bills/{type}.json`

### Example:

```javascript
const id = "K000388"
const type = "cosponsored"
const response =  await propublicaAPI.Members
  .cosponsored(id, type)
  .fetch()
```

# Office Expenses

Wrapper around the Office Expenses ProPublica API. More details can be found [here](https://projects.propublica.org/api-docs/congress-api/members/#office-expenses).

## Get Quarterly Office Expenses by a Specific House Member

### Params:

**memberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **year:** 2009-2019 **quarter:** 1, 2, 3, 4

### URL:

`https://api.propublica.org/congress/v1/members/{memberID}/office_expenses/{year}/{quarter}.json`

### Example:

```javascript
const memberID =  "A000374"
const year = 2017
const quarter = 4
const response =  await propublicaAPI.Members.OfficeExpenses
  .member(memberID)
  .year(year)
  .quarter(quarter)  
  .fetch()
```

## Get Quarterly Office Expenses by Category for a Specific House Member

### Params:

**memberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **category:** `travel` or `personnel` or `rent-utilities` or `other-services` or `supplies` or `franked-mail` or `printing` or `equipment` or `total`

### URL:

`https://api.propublica.org/congress/v1/members/{memberID}/office_expenses/category/{category}.json`

### Example:

```javascript
const memberID =  "A000374"
const category = "travel"
const response =  await propublicaAPI.Members.OfficeExpenses
  .member(memberID)
  .category(category)  
  .fetch()
```

## Get Quarterly Office Expenses for a Specified Category

### Params:

**category**: `travel` or `personnel` or `rent-utilities` or `other-services` or `supplies` or `franked-mail` or `printing` or `equipment` or `total` **year:** 2009-2019 **quarter:** 1, 2, 3, 4 **offset:** The API returns the first 20 results ordered by amount descending and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/office_expenses/category/{category}/{year}/{quarter}.json`

#### Example:

```javascript
const category = "travel"
const year = 2017
const quarter = 4
const offset = 40
const response =  await propublicaAPI.Members.OfficeExpenses
  .category(category)
  .year(2017)
  .quarter(4)  
  .offset(offset)
  .fetch()
```

# Privately Funded Travel

Wrapper around the Privately Funded Travel ProPublica API. More details can be found [here](https://projects.propublica.org/api-docs/congress-api/members/#privately-funded-travel)

## Get Recent Privately Funded Trips

### Params:

**congress**: 110-116

### URL:

`https://api.propublica.org/congress/v1/{congress}/private-trips.json`

### Example:

```javascript
const congress = 116
const offset = 20
const response =  await propublicaAPI.Members.Travel
  .congress(congress)
  .offset(20)
  .fetch()
```

## Get Recent Privately Funded Trips by a Specific House Member

### Params:

**memberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request.

### URL:

`https://api.propublica.org/congress/v1/members/{memberID}/private-trips.json`

### Example:

```javascript
const memberID = "W000797"
const response =  await propublicaAPI.Members.Travel
  .member(memberID)
  .fetch()
```

# Bills

Wrapper around the Bills ProPublica API. More details can be found [here](https://projects.propublica.org/api-docs/congress-api/bills/#bills)

## Search Bills

### Params:

**query:** keyword or phrase **sort:** `_score` or `date` (default is `date`) **dir:** `asc` or `desc` (default) is `desc` **offset:** You can paginate through bills using the `offset` querystring parameter that accepts multiples of 20.

### URL:

`https://api.propublica.org/congress/v1/bills/search.json?query={query}`

### Example:

```javascript
const query = "megahertz"
const response =  await propublicaAPI.Bills
  .search(query)
  .fetch()
```

## Get Recent Bills

### Params:

**type:** The order of the results depends on the value of `type` and all results are sorted in descending order: `introduced`, `updated`, `active`, `passed`, `enacted` or `vetoed` **congress:** 105-116 **chamber:** `house`, `senate` or `both` **offset:** You can paginate through bills using the `offset` querystring parameter that accepts multiples of 20.

### URL:

`https://api.propublica.org/congress/v1/{congress}/{chamber}/bills/{type}.json`

### Example:

```javascript
const congress = 115
const chamber = "house"
const type = "introduced"
const offset = 40
const response =  await propublicaAPI.Bills
  .congress(congress)
  .chamber(chamber)
  .type(type)
  .offset(offset)
  .fetch()
```

## Get Recent Bills by a Specific Member

### Params:

**memberID:** The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **type:** The order of the results depends on the value of `type` and all results are sorted in descending order: `introduced`, `updated`, `active`, `passed`, `enacted` or `vetoed`

### URL:

`https://api.propublica.org/congress/v1/members/{memberID}/bills/{type}.json`

### Example:

```javascript
const memberID = "L000287"
const type = "introduced"
const response =  await propublicaAPI.Bills
  .member(memberID)
  .type(type)
  .fetch()
```

## Get Recent Bills by a Specific Subject

### Params:

**subject:** A slug version of a legislative subject, displayed as `url_name` in subject responses.

### URL:

`https://api.propublica.org/congress/v1/bills/subjects/{subject}.json`

### Example:

```javascript
const subject = "meat"
const response =  await propublicaAPI.Bills
  .subject(subject)
  .fetch()
```

### Get Upcoming Bills

### Params:

**chamber:** `house` or `senate`

### URL:

`https://api.propublica.org/congress/v1/bills/upcoming/{chamber}.json`

### Example:

```javascript
const chamber = "senate"
const response =  await propublicaAPI.Bills
  .chamber(chamber)
  .fetch()
```

## Get Specific Bill

### Params:

**congress:** 105-116 **billID:** a bill slug, for example `hr4881` - these can be found in the recent bill response.

### URL:

`https://api.propublica.org/congress/v1/{congress}/bills/{billID}.json`

### Example:

```javascript
const congress = 116
const billID = "hr502"
const response =  await propublicaAPI.Bills
  .congress(congress)
  .show(billID)
  .fetch()
```

## Get Amendments for a Specific Bill

### Params:

**congress:** 105-116 **billID:** a bill slug, for example `hr4881` - these can be found in the recent bill response.

### URL:

`https://api.propublica.org/congress/v1/{congress}/bills/{billID}/amendments.json`

### Example:

```javascript
const congress = 115
const billID = "hr502"
const response =  await propublicaAPI.Bills
    .congress(congress)
    .bill(billID)
    .amendments()
    .fetch()
```

## Get Subjects for a Specific Bill

### Params:

**congress:** 105-116 **billID:** a bill slug, for example `hr4881` - these can be found in the recent bill response.

### URL:

`https://api.propublica.org/congress/v1/{congress}/bills/{billID}/subjects.json`

### Example:

```javascript
const congress = 114
const billID = "hr502"
const response =  await propublicaAPI.Bills.Subjects
    .congress(congress)
    .bill(billID)
    .fetch()
```

## Get Related Bills for a Specific Bill

### Params:

**congress:** 105-116 **billID:** a bill slug, for example `hr4881` - these can be found in the recent bill response.

### URL:

`https://api.propublica.org/congress/v1/{congress}/bills/{billID}/related.json`

### Example:

```javascript
const congress = 114
const billID = "hr502"
const response =  await propublicaAPI.Bills
    .congress(congress)
    .bill(billID)
    .related()
    .fetch()
```

## Get a Specific Bill Subject

### Params:

**query:** a word or phrase to search

### URL:

`https://api.propublica.org/congress/v1/bills/subjects/search.json`

### Example:

```javascript
const query = "climate"
const response =  await propublicaAPI.Bills.Subjects
    .search(query)
    .fetch()
```

## Get Cosponsors for a Specific Bill

### Params:

**congress**: 105-116 **billID:** a bill slug, for example `hr4881` - these can be found in the recent bill response.

### URL:

`https://api.propublica.org/congress/v1/{congress}/bills/{billID}/cosponsors.json`

### Example:

```javascript
const congress = 115
const billID = "hr4249"
const response =  await propublicaAPI.Bills
    .congress(congress)
    .bill(billID)
    .cosponsors()
    .fetch()
```

# Votes

Wrapper around the Votes ProPublica API. More details can be found [here]([https://projects.propublica.org/api-docs/congress-api/votes/#votes]https://projects.propublica.org/api-docs/congress-api/votes/#votes)

## Get Recent Votes

### Params:

**chamber:** `house`, `senate` or `both` **offset:** You can paginate through bills using the `offset` querystring parameter that accepts multiples of 20.

### URL:

`https://api.propublica.org/congress/v1/{chamber}/votes/recent.json`

### Example:

```javascript
const chamber = "house"
const response =  await propublicaAPI.Votes
  .chamber(chamber)
  .offset(40)
  .fetch()
```

## Get a Specific Roll Call Vote

### Params:

**congress:** 102-116 for House, 80-116 for Senate **chamber:** `house` or `senate` **sessionNumber:** `1` or `2`, depending on year (1 is odd-numbered years, 2 is even-numbered years) **rollCallNumber:** integer

### URL:

`https://api.propublica.org/congress/v1/{congress}/{chamber}/sessions/{sessionNumber}/votes/{rollCallNumber}.json`

### Example:

```javascript
const congress = 115
const chamber = "house"
const sessionNumber = 2
const rollCallNumber = 17
const response =  await propublicaAPI.Votes
  .congress(congress)
  .chamber(chamber)
  .sessionNumber(sessionNumber)
  .rollCallNumber(rollCallNumber)
  .fetch()
```

## Get Votes by Type

### Params:

**congress:** 102-116 for House, 80-116 for Senate **chamber:** `house` or `senate` **type:** `missed`, `party`, `loneno` or `perfect`

### URL:

`https://api.propublica.org/congress/v1/{congress}/{chamber}/votes/{type}.json`

### Example:

```javascript
const congress = 115
const chamber = "house"
const type = "missed"
const response =  await propublicaAPI.Votes
  .congress(congress)
  .chamber(chamber)
  .type(type)
  .fetch()
```

## Get Votes by Date

### Params:

For year and month requests:

**chamber:** `house`, `senate` or `both` **year:** YYYY format **month:** MM format

For date range requests:

**chamber:** `house`, `senate` or `both` **before:** YYYY-MM-DD format **after:** YYYY-MM-DD format

### URL:

`https://api.propublica.org/congress/v1/{chamber}/votes/{date1}/{date2}.json`

### Examples:

```javascript
// year and month requests:
const chamber = "house"
const date1 = "2017"
const date2 = "01"
const response =  await propublicaAPI.Votes
  .chamber(chamber)
  .before(date1)
  .after(date2)
  .fetch()


// date range requests:
const chamber = "house"
const date1 = "2017-01-03"
const date2 = "2017-01-31"
const response =  await propublicaAPI.Votes
  .chamber(chamber)
  .before(date1)
  .after(date2)
  .fetch()
```

## Get Senate Nomination Votes

### Params:

**congress:** 101-116

### URL:

`https://api.propublica.org/congress/v1/{congress}/nominations.json`

### Example:

```javascript
const congress = 116
const response =  await propublicaAPI.Votes
  .congress(congress)
  .fetch()
```

# Personal Explanations

Wrapper around the Personal Explanations ProPublica API. More details can be found [here](https://projects.propublica.org/api-docs/congress-api/votes/#personal-explanations)

## Get Recent Personal Explanations

### Params:

**congress:** 107-116 **offset:** The API returns the 20 most recent results in the specified congress and supports pagination using an `offset` URI parameter set to multiples of 20.

### URL:

`https://api.propublica.org/congress/v1/{congress}/explanations.json`

### Example:

```javascript
const congress = 116
const offset = 40
const response =  await propublicaAPI.Votes.PersonalExplanations
  .congress(congress)
  .offset(40)
  .fetch()
```

## Get Recent Personal Explanation Votes

### Params:

**congress:** 110-116 **offset:** The API returns the 20 most recent results in the specified congress and supports pagination using an `offset` URI parameter set to multiples of 20.

### URL:

`https://api.propublica.org/congress/v1/{congress}/explanations/votes.json`

### Example:

```javascript
const congress = 116
const offset = 40
const response =  await propublicaAPI.Votes.PersonalExplanations
  .congress(congress)
  .offset(40)
  .votes()
  .fetch()
```

## Get Recent Personal Explanation Votes by Category

### Params:

#### Categories:

**voted-incorrectly:** Voted yes or no by mistake **official-business:** Away on official congressional business **ambiguous:** No reason given **travel-difficulties:** Travel delays and issues **personal:** Personal or family reason **claims-voted:** Vote made but not recorded **medical:** Medical issue for lawmaker (not family) **weather:** Inclement weather **memorial:** Attending memorial service **misunderstanding:** Not informed of vote **leave-of-absence:** Granted leave of absence **prior-commitment:** Attending to prior commitment **election-related:** Participating in an election **military-service:** Military service **other:** Other

**congress:** 110-116 **category:** see parameter list above **offset:** The API returns the 20 most recent results in the specified congress and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/{congress}/explanations/votes/{category}.json`

#### Example:

```javascript
const congress = 116
const category = "official-business"
const response =  await propublicaAPI.Votes.PersonalExplanations
  .congress(congress)
  .category(category)
  .offset(40)
  .votes()
  .fetch()
```

## Get Recent Personal Explanations by a Specific Member

### Params:

**memberID:** The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **congress:** 110-116 **offset:** The API returns the 20 most recent results in the specified congress and supports pagination using an `offset` URI parameter set to multiples of 20.

### URL:

`https://api.propublica.org/congress/v1/members/{memberID}/explanations/{congress}.json`

### Example:

```javascript
const memberID = "S001193"
const congress = 116
const response =  await propublicaAPI.Votes.PersonalExplanations
  .member(memberID)
  .congress(116)
  .fetch()
```

## Get Recent Personal Explanation Votes by a Specific Member

### Params:

**memberID:** The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **congress:** 110-116 **offset:** The API returns the 20 most recent results in the specified congress and supports pagination using an `offset` URI parameter set to multiples of 20.

### URL:

`https://api.propublica.org/congress/v1/members/{memberID}/explanations/{congress}/votes.json`

### Example:

```javascript
const memberID = "S001193"
const congress = 116
const response =  await propublicaAPI.Votes.PersonalExplanations
  .member(memberID)
  .congress(116)
  .votes()
  .fetch()
```

## Get Recent Personal Explanation Votes by a Specific Member by Category

### Params:

**Categories:**

**voted-incorrectly:** Voted yes or no by mistake **official-business:** Away on official congressional business **ambiguous:** No reason given **travel-difficulties:** Travel delays and issues **personal:** Personal or family reason **claims-voted:** Vote made but not recorded **medical:** Medical issue for lawmaker (not family) **weather:** Inclement weather **memorial:** Attending memorial service **misunderstanding:** Not informed of vote **leave-of-absence:** Granted leave of absence **prior-commitment:** Attending to prior commitment **election-related:** Participating in an election **military-service:** Military service **other:** Other

**memberID:** The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **congress:** 110-116 **category:** see parameter list above **offset:** The API returns the 20 most recent results in the specified congress and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/members/{memberID}/explanations/{congress}/votes.json`

#### Example:

```javascript
const memberID = "S001193"
const congress = 116
const category = "military-service"
const response =  await propublicaAPI.Votes.PersonalExplanations
  .member(memberID)
  .congress(116)
  .category(category)
  .votes()
  .fetch()
```

# Congressional Statements

Wrapper around the Congressional Statements ProPublica API. More details can be found [here](https://projects.propublica.org/api-docs/congress-api/statements/#statements).

## Get Recent Congressional Statements

### Params:

**offset:** The API returns the 20 most recent statements published on congressional websites and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/statements/latest.json`

#### Example:

```javascript
const offset = 20
const response =  await propublicaAPI.CongressionalStatements
  .offset(offset)
  .recent()
  .fetch()
```

## Get Congressional Statements by Date

### Params:

**date:** YYYY-MM-DD format **offset:** The API returns the 20 most recent statements published on congressional websites on a particular date and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/statements/date/{date}.json`

#### Example:

```javascript
const date = "2017-05-08"
const offset = 40
const response =  await propublicaAPI.CongressionalStatements
  .on(date)
  .offset(offset)
  .fetch()
```

## Get Congressional Statements by Search Term

### Params:

**term:** search term **offset:** The API returns the 20 most recent statements published on congressional websites on a particular date and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/statements/search.json?query={term}`

#### Example:

```javascript
const term = "AHCA"
const offset = 20
const response =  await propublicaAPI.CongressionalStatements
  .term(term)
  .offset(offset)
  .fetch()
```

## Get Statement Subjects

### URL:

`https://api.propublica.org/congress/v1/statements/subjects.json`

### Example:

```javascript
const response =  await propublicaAPI.CongressionalStatements
  .subjects()
  .fetch()
```

## Get Congressional Statements by Subject

### Params:

**subject:** slug version of subject **offset:** The API returns the 20 most recent results and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/statements/subject/{subject}.json`

#### Example:

```javascript
const subject = "immigration"
const offset = 20
const response =  await propublicaAPI.CongressionalStatements
  .subject(subject)
  .offset(offset)
  .fetch()
```

## Get Congressional Statements by Member

### Params:

**memberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **congress:** 113-116 **offset:** The API returns the 20 most recent results and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/members/{memberID}/statements/{congress}.json`

#### Example:

```javascript
const memberID = "C001084"
const congress = 114
const offset = 20
const response =  await propublicaAPI.CongressionalStatements
  .member(memberID)
  .congress(congress)
  .offset(offset)
  .fetch()
```

## Get Congressional Statements by Bill

### Params:

**billID**: a bill slug, for example `s19` - these can be found in bill responses. **congress:** 113-116 **offset:** The API returns the 20 most recent results and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/{congress}/bills/{billID}/statements.json`

#### Example:

```javascript
const billID = "s19"
const congress = 115
const response =  await propublicaAPI.CongressionalStatements
  .bill(billID)
  .congress(congress)
  .fetch()
```

# Congressional Committee Statements

Wrapper around the Congressional Committee Statements ProPublica API. More details can be found [here](https://projects.propublica.org/api-docs/congress-api/statements/#congressional-committee-statements).

## Get Recent Congressional Committee Statements

### Params:

**offset:** The API returns the 20 most recent statements published on congressional websites and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/statements/committees/latest.json`

#### Example:

```javascript
const offset = 20
const response =  await propublicaAPI.CommitteeStatements
  .offset(offset)
  .recent()
  .fetch()
```

## Get Congressional Committee Statements by Date

### Params:

**date:** YYYY-MM-DD format **offset:** The API returns the 20 most recent statements published on congressional websites and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`https://api.propublica.org/congress/v1/statements/committees/date/{date}.json`

#### Example:

```javascript
const date = "2019-07-02"
const response =  await propublicaAPI.CommitteeStatements
  .on(date)
  .recent()
  .fetch()
```

## Get Congressional Committee Statements by Committee

### Params:

**committeeID:** Optional committee abbreviation, for example `HSAG`. Use the full committees response to find abbreviations. **offset:** The API returns the 20 most recent statements published on congressional websites and supports pagination using an `offset` URI parameter set to multiples of 20.

#### URL:

`hhttps://api.propublica.org/congress/v1/statements/committees/{committeeID}.json`

#### Example:

```javascript
const committeeID = "HSRU"
const response =  await propublicaAPI.CommitteeStatements
  .committee(committeeID)
  .recent()
  .fetch()
```
