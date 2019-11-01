#!/usr/bin/env node

const amqp = require('amqplib')
const faker = require('faker')

const RABBIT_URL = 'amqp://localhost'
const EXCHANGE = 'myexchange'

const run = async () => {
  const connection = await amqp.connect(RABBIT_URL)

  const channel = await connection.createChannel()

  channel.assertExchange(EXCHANGE, 'topic', { durable: false })

  const send = (key) => {
    const msgObj = { name: faker.name.findName() }
    const msg = JSON.stringify(msgObj)
    channel.publish(EXCHANGE, key, Buffer.from(msg))
    console.log(" [x] Sent     %s: '%s'", key, msg)
  }

  send('something.a')
  send('something.b')

  setTimeout(() => connection.close(), 2000)
}

run()
  .catch(console.error)
