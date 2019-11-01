#!/usr/bin/env node

const { getInstance } = require('./lib')

const EXCHANGE = 'myexchange'
const TOPIC = 'something.b'

const run = async () => {
  const { produce, consume } = await getInstance(EXCHANGE, TOPIC)

  consume((msgObj) => {
    // console.log(msgObj)
  })
}

run()
  .catch(console.error)
