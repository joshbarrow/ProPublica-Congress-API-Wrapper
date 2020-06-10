- [Members](#Members)

  - [Index (List of Members)](#Index)

# Introduction

A wrapper for the ProPublica API

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

### * [Members](#Members)

```
* [Index (List of Members)](#Index)
```

# Introduction

A wrapper for the ProPublica API

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
const response = await propublicaAPI.Members
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

```js const id = "K000388" const type = "cosponsored" const response = await propublicaAPI.Members .cosponsored(id, type) .fetch()
