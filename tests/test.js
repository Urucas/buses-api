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
      for(let i=0;i<cities.length;i++) {
        let city = cities[i]
        expect(city).to.be.a("object")
        city.id.should.not.equal(undefined)
        city.nombre.should.not.equal(undefined)
      }
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
        travel.origen.should.equal(origin)
        travel.destino.should.equal(destination)
        travel.empresa.should.not.equal(undefined)
        travel.empresa.url.should.not.equal(undefined)
        travel.empresa.nombre.should.not.equal(undefined)
        travel.sale.should.not.equal(undefined)
        travel.llega.should.not.equal(undefined)
        travel.dias.should.not.equal(undefined)
        expect(travel.dias).to.be.a("object")
        expect(travel.dias.mon).to.be.a("boolean")
        expect(travel.dias.tue).to.be.a("boolean")
        expect(travel.dias.wed).to.be.a("boolean")
        expect(travel.dias.thu).to.be.a("boolean")
        expect(travel.dias.fri).to.be.a("boolean")
        expect(travel.dias.sat).to.be.a("boolean")
        expect(travel.dias.sun).to.be.a("boolean")
        expect(travel.dias.hol).to.be.a("boolean")
        travel.servicio.should.not.equal(undefined)
      }
      done()    
    })
  })
})
