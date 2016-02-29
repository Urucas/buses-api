# buses-api [![Build Status](https://travis-ci.org/Urucas/buses-api.svg?branch=master)](https://travis-ci.org/Urucas/buses-api)
Get Argentina long distance buses schedules

#Install
```bash
npm install --save buses-api
```

#Usage
```javascript
import buses from 'buses-api'
// get all cities availables
buses.cities().then( (cities) => {
  // [ ..., 
  //   { id: '7172', nombre: 'General Roca (CBA)' }, 
  //   ..., 
  //   { id: '2000', nombre: 'Rosario' }, 
  //  ... ]
})

// get travels availables by passing origin, destination ids
buses.travel(7172, 2000).then(travels) => {
  // [{ origen: 7172, destino: 2000,
  //    empresa: { 
  //      url: 'http://www.terminalrosario.gob.ar/wp-content/themes/terminal-rosario/popups/empresa.php?id=37',
  //      nombre: 'General Urquiza' 
  //   },
  //   sale: '00:15',
  //   llega: '02:45',
  //   dias: { mon: true, tue: true, wed: true,
  //     thu: true, fri: true, sat: true, 
  //     sun: false, hol: false },
  //   servicio: 'Semicama' 
  //  }, ... ]
})
```

#Deploy on Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Urucas/buses-api)


* /gities
```
[ ..., 
  { id: '7172', nombre: 'General Roca (CBA)' }, 
  ..., 
  { id: '2000', nombre: 'Rosario' }, 
... ]
```
* /travel?origin=7172&dest=2000
```
[{ 
  origen: 7172, destino: 2000,
  empresa: { 
    url: 'http://www.terminalrosario.gob.ar/wp-content/themes/terminal-rosario/popups/empresa.php?id=37',
    nombre: 'General Urquiza' 
  },
  sale: '00:15',
  llega: '02:45',
  dias: { mon: true, tue: true, wed: true,
    thu: true, fri: true, sat: true, 
    sun: false, hol: false },
  servicio: 'Semicama' 
}, ... ]
```

