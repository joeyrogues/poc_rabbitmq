#!/usr/bin/env node

const { getInstance } = require('./lib')
const faker = require('faker')

const EXCHANGE = 'myexchange'
const TOPIC = 'something.b'

const run = async () => {
  const { produce, consume, disconnect } = await getInstance(EXCHANGE, TOPIC)

  const msgObj = () => ({
    name: faker.name.findName()
  })

  produce('something.a', msgObj())
  produce('something.a', msgObj())
  produce('something.a', msgObj())
  produce('something.a', msgObj())
  produce('something.b', msgObj())

  disconnect()
}

run()
  .catch(console.error)
