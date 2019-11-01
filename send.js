#!/usr/bin/env node

const { getInstance } = require('./lib')
const faker = require('faker')

const EXCHANGE = 'myexchange'
const TOPIC = process.env.TOPIC || 'default'

const run = async () => {
  const { produce, consume } = await getInstance(EXCHANGE, TOPIC)

  const msgObj = () => ({
    name: faker.name.findName()
  })

  produce(TOPIC, msgObj())
}

run()
  .catch(console.error)
