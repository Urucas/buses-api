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
  
  it(".cities should return a promise", (done) => {
    buses.cities.should.not.equal(null)
    buses.cities.should.not.equal(undefined)
    expect(buses.cities).to.be.a("function")
    expect(buses.cities()).to.be.a("promise")
    done()    
  })
  
  it("expect .cities to return an array", (done) => {
    buses.cities().then( (cities) => {
      cities.should.not.equal(null)
      cities.should.not.equal(undefined)
      expect(cities).to.be.a("array")
      done()  
    })
  })
  
  it(".travel should return a promise", (done) => {
    buses.travel.should.not.equal(null)
    buses.travel.should.not.equal(undefined)
    expect(buses.travel).to.be.a("function")
    expect(buses.travel()).to.be.a("promise")
    done()    
  })
  
  it("expect .travel to return an array", (done) => {
    let origin = 7172, destination = 2000
    buses.travel(origin, destination).then( (travels) => {
      travels.should.not.equal(null)
      travels.should.not.equal(undefined)
      expect(travels).to.be.a("array")
      travels.length.should.not.equal(0)
      for(let i=0;i<travels.length;i++) {
        let travel = travels[i]
        travel.origin.should.equal(origin)
        travel.destination.should.equal(destination)
        travel.company.should.not.equal(undefined)
        travel.company.url.should.not.equal(undefined)
        travel.company.name.should.not.equal(undefined)
        travel.leaves.should.not.equal(undefined)
        travel.arrives.should.not.equal(undefined)
        travel.days.should.not.equal(undefined)
        expect(travel.days).to.be.a("object")
        expect(travel.days.mon).to.be.a("boolean")
        expect(travel.days.tue).to.be.a("boolean")
        expect(travel.days.wed).to.be.a("boolean")
        expect(travel.days.thu).to.be.a("boolean")
        expect(travel.days.fri).to.be.a("boolean")
        expect(travel.days.sat).to.be.a("boolean")
        expect(travel.days.sun).to.be.a("boolean")
        expect(travel.days.hol).to.be.a("boolean")
        travel.service.should.not.equal(undefined)
      }
      done()    
    })
  })
})
