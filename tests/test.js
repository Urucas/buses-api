import buses from "../lib/"
import chai from 'chai'
let should = chai.should()
let expect = chai.expect

describe("API tests", () => {
  
  it("api should be an object", (done) => {
    buses.should.not.equal(null)
    buses.should.not.equal(undefined)
    expect(buses).to.be.a("object")
    done()
  })
  
  it("cities should return a promise", (done) => {
    buses.cities.should.not.equal(null)
    buses.cities.should.not.equal(undefined)
    expect(buses.cities).to.be.a("function")
    expect(buses.cities()).to.be.a("promise")
    done()    
  })
  
  it("expect cities to return an array", (done) => {
    buses.cities().then( (cities) => {
      cities.should.not.equal(null)
      cities.should.not.equal(undefined)
      expect(cities).to.be.a("array")
      done()  
    })
  })
})
