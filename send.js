#!/usr/bin/env node

const { getInstance } = require('./lib/rabbit')
const faker = require('faker')

const EXCHANGE = 'myexchange'
const TOPIC = process.env.TOPIC || 'default'

const run = async () => {
  const { produce, consume } = await getInstance(EXCHANGE, TOPIC)

  produce(TOPIC, {
    name: faker.name.findName()
  })
}

run()
  .catch(console.error)
