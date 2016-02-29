import express from 'express'
import buses from './index.js'
export default function server(port) {
  let app = express()
  app.get("/", (req, res) => {
    res.send([
      '<img src="http://i.giphy.com/mEjT1jbXelaEg.gif">',
      '<br />Method not available. Check the ',
      '<a href="https://github.com/Urucas/buses-api">documentation</a>'
    ].join("")) 
  })
  app.get("/cities", (req, res) => {
    buses.cities().then( (cities) => {
      res.json(cities)
    }, (err) => {
      res.json({error: err})
    })
  })
  app.get("/travel", (req, res) => {
    let query = req.query
    let o = query.origin
    if(o == undefined) return res.json({error:"origin param not defined"})
    let d = query.dest
    if(d == undefined) return res.json({error:"dest param not defined"})
    buses.travel(o, d).then( (travels) => {
      res.json(travels)  
    }, (err) => {
      res.json({error: err})
    })
  })
  return app.listen(port)
}