#!/usr/bin/env node

const amqp = require('amqplib')

const RABBIT_URL = 'amqp://localhost'
const EXCHANGE = 'myexchange'
const TOPIC = 'something.b'

const run = async () => {
  const connection = await amqp.connect(RABBIT_URL)
  const channel = await connection.createChannel()
  channel.assertExchange(EXCHANGE, 'topic', {
    durable: false
  })

  const q = await channel.assertQueue('', {
    exclusive: true
  })

  channel.bindQueue(q.queue, EXCHANGE, TOPIC)

  channel.consume(q.queue, (msg) => {
    console.log(" [x] Received %s: '%s'", msg.fields.routingKey, msg.content.toString())
  }, {
    noAck: true
  })
}

run()
  .catch(console.error)
