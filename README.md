# hypercore-archiver-ws

websocket server for hypercore-archiver

## Install

```
npm install hypercore-archiver-ws
```

## Usage

```js
var archiver = require('hypercore-archiver')
var archiverWs = require('hypercore-archiver-ws')

var archives = archiver('./my-archiver')
var server = archiverWs(archives)
server.listen(8080, function () {
  console.log(`listening on port ${8080}`)
})
```

### Custom server

```js
var archiver = require('hypercore-archiver')
var archiverWs = require('hypercore-archiver-ws')

var archives = archiver('./my-archiver')
var server = archiverWs(archives)
server.listen(8080, function () {
  console.log(`listening on port ${8080}`)
})
```

## License

[MIT](LICENSE.md)
