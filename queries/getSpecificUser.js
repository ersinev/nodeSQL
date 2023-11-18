const getUserById=(id)=> `
SELECT * FROM nodesql.user
WHERE id = ${id}
`

module.exports = getUserById