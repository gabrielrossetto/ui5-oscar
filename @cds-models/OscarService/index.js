// This is an automatically generated file. Please do not change its contents manually!
const cds = require('@sap/cds')
const csn = cds.entities('OscarService')
// service
const OscarService = { name: 'OscarService' }
module.exports = OscarService
module.exports.OscarService = OscarService
// Actors
module.exports.Actor = { is_singular: true, __proto__: csn.Actors }
module.exports.Actors = csn.Actors
// Films
module.exports.Film = { is_singular: true, __proto__: csn.Films }
module.exports.Films = csn.Films
// Awards
module.exports.Award = { is_singular: true, __proto__: csn.Awards }
module.exports.Awards = csn.Awards
// Categories
module.exports.Category = { is_singular: true, __proto__: csn.Categories }
module.exports.Categories = csn.Categories
// Actors.films
module.exports.Actors.film = { is_singular: true, __proto__: csn['Actors.films'] }
module.exports.Actors.films = csn['Actors.films']
// events
// actions
module.exports.setTorresAsWinner = 'setTorresAsWinner'
// enums
