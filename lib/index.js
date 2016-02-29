import request from 'request'
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
  }
}
