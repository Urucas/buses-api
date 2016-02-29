import request from 'request'
import cheerio from 'cheerio'

class Parser{
  company(dom){
    let company = {}
    try {
      company.url = dom.children(".detalle_empresa")["0"].attribs.href.trim()
      company.nombre = dom.children(".detalle_empresa")["0"].children[0].data.trim()
    }catch(e){}
    return company 
  }
  leaves(dom){
    return dom.text().trim()
  }
  arrives(dom) {
    return dom.text().trim()
  }
  days(dom) {
    let days = {
      mon : 
        cheerio(dom["0"]).children("img").attr("src").toString().indexOf("icon-yes.png") >= 0
        ? true : false,
      tue : 
        cheerio(dom["1"]).children("img").attr("src").toString().indexOf("icon-yes.png") >= 0
        ? true : false,
      wed : 
        cheerio(dom["2"]).children("img").attr("src").toString().indexOf("icon-yes.png") >= 0
        ? true : false,
      thu : 
        cheerio(dom["3"]).children("img").attr("src").toString().indexOf("icon-yes.png") >= 0
        ? true : false,
      fri : 
        cheerio(dom["4"]).children("img").attr("src").toString().indexOf("icon-yes.png") >= 0
        ? true : false,
      sat : 
        cheerio(dom["5"]).children("img").attr("src").toString().indexOf("icon-yes.png") >= 0
        ? true : false,
      sun : 
        cheerio(dom["6"]).children("img").attr("src").toString().indexOf("icon-yes.png") >= 0
        ? true : false,
      hol :
        cheerio(dom["7"]).children("img").attr("src").toString().indexOf("icon-yes.png") >= 0
        ? true : false
    }
    return days
  }
  service(rows) {
    let len = rows.length
    return cheerio(rows[len-2]).text().trim()
  }
}

export default {
  cities: _ => {
    return new Promise( (res, rej) => {
      request.post('http://www.terminalrosario.gob.ar/wp-content/plugins/terminal-rosario/ajax.php', 
      {form:{method:'obtenerLocalidades', module:'buscador', type:'json'}},
      (err, response, body) => {
        if(err) return rej(err)
        if(response.statusCode != 200) return rej(response.statusCode)
        let results = []
        try { 
          results = JSON.parse(body)
          res(results.results)
        }catch(e) {
          rej(e)
        }
      })  
    })
  },
  travel: (origin, destination) => {
    let parser = new Parser()
    return new Promise( (res, rej) => {
      request.post('http://www.terminalrosario.gob.ar/resultados-buscador', 
      {form: {origen: origin, destino: destination, buscar: 'Buscar'}},
      (err, response, body) => {
        if(err) return rej(err)
        if(response.statusCode != 200) return rej(response.statusCode)
        let html = cheerio.load(body)
        let travels = []
        let tbody = html('#resultados tbody')
        let rows = tbody.children("tr")
        for(let i=0; i<rows.length;i++){
          let row = cheerio.load(rows[i]);
          let travel = {
            origen: origin,
            destino: destination,
            empresa: parser.company(row(".empresa")),
            sale: parser.leaves(row(".sale")),
            llega: parser.arrives(row(".llega")),
            dias: parser.days(row(".dias")),
            servicio: parser.service(row("td"))
          }
          travels.push(travel)
        }
        res(travels)
      })
    })  
  }
}
