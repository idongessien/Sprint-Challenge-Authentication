const db = require('../database/dbConfig')

module.exports = {
    findAll,
    findBy,
    findById,
    add
}

function findAll(){
    return db("users")
    .select('id',"username", "password")
    .first()

}

function findBy(filter){
    return db("users")
    .where(filter)
    .first()
    
}
function findById(id){
    return db("users")
    .where({id})
    .select("id","username")
    .first()
    
}

async function add(user){
    const [id] = await db("users").insert(user, "id")
    return findById(id)
    
}