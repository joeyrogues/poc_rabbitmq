const amqp = require('amqplib')
const RABBIT_URL = 'amqp://localhost'

const getInstance = async (exchange, topic) => {
  const connection = await amqp.connect(RABBIT_URL)
  const channel = await connection.createChannel()
  channel.assertExchange(exchange, 'topic', {
    durable: false
  })

  const q = await channel.assertQueue('', {
    exclusive: true
  })

  channel.bindQueue(q.queue, exchange, topic)

  const consume = (cb) => {
    channel.consume(q.queue, (msg) => {
      const msgStr = msg.content.toString()
      const msgObj = JSON.parse(msgStr)
      console.log(" [x] Received (%s) %s", msg.fields.routingKey, msgStr)
      cb(msgObj)
    }, { noAck: true })
  }

  const produce = (key, msgObj) => {
    const msg = JSON.stringify(msgObj)
    channel.publish(exchange, key, Buffer.from(msg))
    console.log(" [x] Send     (%s) %s", key, msg)
  }

  const disconnect = () => {
    setTimeout(() => connection.close(), 2000)
  }

  return {
    produce,
    consume,
    disconnect
  }
}

module.exports = {
  getInstance
}
