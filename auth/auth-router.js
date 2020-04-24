const router = require('express').Router();
const Users = require('./auth-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//-----register endpoint-------
router.post('/register', (req, res) => {
  // === implement registration
  const userInfo = req.body

  // === hash the password
  const ROUNDS = process.env.HASHING_ROUNDS|| 10
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS)
  userInfo.password = hash

  Users.add(userInfo)
  .then(user=>{
    res.status(201).json(user)
  })
  .catch(error=>{
    res.status(400).json(error)
  })
});

//------login endpoint-----
router.post('/login', (req, res) => {
  // === implement login
  const { username, password }= req.body
  
  Users.findBy({ username })
  .then(user=>{
    // === compare password 
     if(user && bcrypt.compareSync(password, user.password)){
    // === if user found with same password, add token to access
      const token = generateToken(user)    
     res.status(200).json({ message:`Welcome ${user.username}!`, token })
     }else{
      res.status(401).json({ message:"You shall not pass!" })        
     }
  })
  .catch(error=>{
    res.status(500).json(error)
  })
});

function generateToken(user){
  // === payload
  const payload = {
    id: user.id,
    username: user.username
  }
  // === secret
  const secret = "The secret !!"
  // === options
  const options ={
    expiresIn:'1h'
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
