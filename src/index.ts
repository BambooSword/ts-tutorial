import { User } from './User'
import { Company } from './Compony'
import { CustomMap } from './CustomMap'
const key = 'AIzaSyBXKpDpyZouN10URCASIi3FgpatruFGpKE'
const user = new User()
const company = new Company()
console.log('🚀 ~ file: index.ts:4 ~ user:1', user)
console.log('🚀 ~ file: index.ts:5 ~ company:', company)

console.log('🚀 ~ file: index.ts:16 ~ map ~ google:', google)
// const map = new google.maps.Map(document.getElementById('map')!, {
//   zoom: 1,
//   center: {
//     lat: 0,
//     lng: 0,
//   },
// })
const map = new CustomMap('map')
map.addMarker(user)
map.addMarker(company)
