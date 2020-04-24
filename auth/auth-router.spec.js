const server = require("../api/server")
 const request = require("supertest")
 const db = require("../database/dbConfig")

 describe('post /', function(){
     it('should return 200 OK ', async function(){
         const response = await request(server).post("/api/auth/register")
         expect(response.status).toBe(201)
        
     })
 })