const getUserById = (userId) => {
    return {
        sql: 'SELECT * FROM nodesql.users WHERE id = ?',
        values: [userId],
    };
};

module.exports = getUserById;