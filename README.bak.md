# Initialization

# Votes

```javascript
1\. propublicaAPI.Votes.chamber().recent()
2\. propublicaAPI.Votes.congress().chamber().byRollCall(sessionNumber, rollCallNumber)
3\. propublicaAPI.Votes.congress().chamber().byType(type)
4\. propublicaAPI.Votes.chamber().before().after()
5\. propublicaAPI.Votes.chamber().year().month()
6\. propublicaAPI.Votes.congress().nominations()
```

```
GET <https://api.propublica.org/congress/v1/{congress}/explanations.json>
GET <https://api.propublica.org/congress/v1/{congress}/explanations/votes.json>
GET <https://api.propublica.org/congress/v1/members/{member_id}/explanations/{congress}.json>
GET <https://api.propublica.org/congress/v1/members/{member_id}/explanations/{congress}/votes.json> GET <https://api.propublica.org/congress/v1/{congress}/explanations/votes/{category}.json>
GET <https://api.propublica.org/congress/v1/members/{member_id}/explanations/{congress}/votes/{category}.json>
```

```javascript
propublicaApi.Votes.congress(116).explanations({ offset: number, votes: boolean, member: string, category: string, })
```

# Statements

1. propublicaAPI.Statements.chamber().recent()
2. propublicaAPI.Statements.on(date)
3. propublicaAPI.Statements.search(term)
4. propublicaAPI.Statements.subjects()
5. propublicaAPI.Statements.bySubject(subject)
6. propublicaAPI.Statements.congress().byMember(memberID)
7. propublicaAPI.Statements.congress().byBill(billID)
8. propublicaAPI.Statements.congress().committee().recent()
9. propublicaAPI.Statements.congress().committee().byDate(date)
10. propublicaAPI.Statements.congress().byCommittee(committeeID)
11. propublicaAPI.Statements.congress().committee().search(term)

# committees

1. propublicaAPI.Committees.congress().chamber.list()
2. propublicaAPI.Committees.congress().chamber().show(committeeID)
3. propublicaAPI.Committees.congress().recentHearings()
4. propublicaAPI.Committees.congress().chamber().hearingsByCommittee(committeeID)
5. propublicaAPI.Committees.congress().chamber().subcommittee(committeeID, subcommitteeID)
6. propublicaAPI.Committees.congress().communications() // recent communications
7. propublicaAPI.Committees.congress().communications(category) // by category
8. propublicaAPI.Committees.communications(date) // by date
9. propublicaAPI.Committees.chamber().communications() // communications by chamber