var archiver = require('hypercore-archiver')
var swarm = require('hypercore-archiver/swarm')
var hypercore = require('hypercore')
var archiverWs = require('.')

var ar = archiver('./my-archiver') // also supports passing in a storage provider
// var feed = hypercore('./my-feed', {valueEncoding: 'json'})
var server = archiverWs(ar, {port: 8080})
swarm(ar)

ar.on('ready', function () {
  console.log('changes feed', ar.changes.key.toString('hex'))
})

ar.add('227d9212ee85c0f14416885c5390f2d270ba372252e781bf45a6b7056bb0a1b5', function () {
  console.log('dat added')
})
// ar.add(feed.key, function () {
//   console.log('will now archive the feed')
// })

// feed.on('ready', function () {

// })

ar.on('sync', function (feed) {
  console.log('feed is synced', feed.key.toString('hex'))
})

// // setup replication
// var stream = ar.replicate()
// stream.pipe(feed.replicate({live: true})).pipe(stream)

// feed.append({hello: 'world'})
