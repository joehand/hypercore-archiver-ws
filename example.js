var archiver = require('hypercore-archiver')
var hypercore = require('hypercore')
var archiverWs = require('.')

var ar = archiver('./my-archiver') // also supports passing in a storage provider
var feed = hypercore('./my-feed', {valueEncoding: 'json'})
var server = archiverWs(ar, {port: 8080})

ar.on('ready', function () {
  console.log('changes feed', ar.changes.key.toString('hex'))
})

feed.on('ready', function () {
  ar.add(feed.key, function () {
    console.log('will now archive the feed')
  })
})

ar.on('sync', function (feed) {
  console.log('feed is synced', feed.key.toString('hex'))
})

// setup replication
var stream = ar.replicate()
stream.pipe(feed.replicate({live: true})).pipe(stream)

feed.append({hello: 'world'})
