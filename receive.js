#!/usr/bin/env node

const { getInstance } = require('./lib')

const EXCHANGE = 'myexchange'
const TOPIC = process.env.TOPIC || 'default'

const run = async () => {
  const { produce, consume } = await getInstance(EXCHANGE, TOPIC)

  consume((msgObj) => {
    // console.log(msgObj)
  })
}

run()
  .catch(console.error)
