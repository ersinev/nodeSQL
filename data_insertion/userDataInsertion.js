const userDataInsertion = (userData)=>{
    const { username, email } = userData;
    const query = `
      INSERT INTO users (username, email) VALUES
      ('${username}', '${email}')
    `;
    return query;
}
    
module.exports = userDataInsertion