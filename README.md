# Table of Contents

- [Members](#Members)

  - [Index (List of Members)](#Index)
  - [Get a Specific Member](#GetASpecificMember)
  - [Get New Members](#GetNewMembers)
  - [Get Current Members by State/District](#GetCurrentMembersbyStateAndDistrict)
  - [Get Members Leaving Office](#GetMembersLeavingOffice)
  - [Get a Specific Member's Vote Positions](#GetaSpecificMember’sVotePositions)
  - [Compare Two Members' Vote Positions](#CompareTwoMembersVotePositions)
  - [Compare Two Members' Bill Sponsorships](#CompareTwoMembersVotePositions)
  - [Get Bills Cosponsored by a Specific Member](#GetBillCosponsoredbyaSpecificMember)

- [Office Expenses](#OfficeExpenses)

  - [Get Quarterly Office Expenses by a Specific House Member](#GetQuarterlyOfficeExpensesbyaSpecificHouseMember)
  - [Get Quarterly Office Expenses for a Specified Category](#GetQuarterlyOfficeExpensesForaSpecifiedCategory)

- [Office Expenses](#OfficeExpenses)

# Introduction

A wrapper for the ProPublica API

> Unit tests and TypeScript implementation in progress. Anticipated completion by November 2020\.

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

Wrapper around the Members ProPublica API. More details can be found [here](https://projects.propublica.org/api-docs/congress-api/members/#office-expenses).

## Get Quarterly Office Expenses by a Specific House Member

## Params:

**memberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **year:** 2009-2019 **quarter:** 1, 2, 3, 4

## URL:

`https://api.propublica.org/congress/v1/members/{memberID}/office_expenses/{year}/{quarter}.json`

## Example:

```javascript
const memberID =  "A000374"
const year = 2017
const quarter = 4
const response =  await propublicaAPI.OfficeExpenses
  .member(memberID)
  .year(year)
  .quarter(quarter)  
  .fetch()
```

## Get Quarterly Office Expenses by Category for a Specific House Member

## Params:

**memberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request. **category:** `travel` or `personnel` or `rent-utilities` or `other-services` or `supplies` or `franked-mail` or `printing` or `equipment` or `total`

## URL:

`https://api.propublica.org/congress/v1/members/{memberID}/office_expenses/category/{category}.json`

## Example:

```javascript
const memberID =  "A000374"
const category = "travel"
const response =  await propublicaAPI.OfficeExpenses
  .member(memberID)
  .category(category)  
  .fetch()
```

## Get Quarterly Office Expenses for a Specified Category

### Params:

**category**: `travel` or `personnel` or `rent-utilities` or `other-services` or `supplies` or `franked-mail` or `printing` or `equipment` or `total` **year:** 2009-2019 **quarter:** 1, 2, 3, 4

### URL:

`https://api.propublica.org/congress/v1/office_expenses/category/{category}/{year}/{quarter}.json`

### Example:

```javascript
const category = "travel"
const year = 2017
const quarter = 4
const response =  await propublicaAPI.OfficeExpenses
  .category(category)
  .year(2017)
  .quarter(4)  
  .fetch()
```

# Privately Funded Travel

Wrapper around the Members ProPublica API. More details can be found [here](https://projects.propublica.org/api-docs/congress-api/members/#privately-funded-travel)

## Get Recent Privately Funded Trips

## Params:

**congress**: 110-116

## URL:

`https://api.propublica.org/congress/v1/{congress}/private-trips.json`

## Example:

```javascript
const congress = 116
const offset = 20
const response =  await propublicaAPI.Travel
  .congress(congress)
  .offset(20)
  .fetch()
```

## Get Recent Privately Funded Trips by a Specific House Member

## Params:

**memberID**: The ID of the member to retrieve; it is assigned by the [Biographical Directory of the United States Congress](http://bioguide.congress.gov/biosearch/biosearch.asp) or can be retrieved from a member list request.

## URL:

`https://api.propublica.org/congress/v1/members/{memberID}/private-trips.json`

## Example:

```javascript
const memberID = "W000797"
const response =  await propublicaAPI.Travel
  .member(memberID)
  .fetch()
```
