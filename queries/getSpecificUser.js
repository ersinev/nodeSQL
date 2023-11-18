const getUserById=(userData)=> `
SELECT * FROM nodesql.user
WHERE id = ${userData.id}
`

module.exports = getUserById