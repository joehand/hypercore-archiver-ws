var assert = require('assert')
var http = require('http')
var wss = require('websocket-stream')
var pump = require('pump')

module.exports = archiverWs

function archiverWs (archiver, opts) {
  assert.ok(archiver, 'hypercore-archiver-ws: archiver required')
  if (!opts) opts = {}

  var server = opts.server || http.createServer()
  wss.createServer({server: server}, onwebsocket)
  if (!opts.server) {
    server.on('request', function (req, res) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        name: 'hypercore-archiver',
        version: require('./package').version
      }))
    })
  }

  return server

  function onwebsocket (stream) {
    pump(stream, archiver.replicate(), stream, function (err) {
      console.error('websocket error', err)
    })
  }
}
