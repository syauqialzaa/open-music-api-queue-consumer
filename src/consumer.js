require('dotenv').config()
const amqp = require('amqplib')
const PlaylistsService = require('./playlists-service')
const MailSender = require('./mail-sender')
const Listener = require('./listener')
const credentials = require('../config/credentials')

const init = async () => {
  const playlistsService = new PlaylistsService()
  const mailSender = new MailSender()
  const listener = new Listener(playlistsService, mailSender)

  const connection = await amqp.connect(credentials.rabbitmq.server)
  const channel = await connection.createChannel()

  await channel.assertQueue('export:playlist_songs', {
    durable: true
  })

  channel.consume('export:playlist_songs', listener.listen, { noAck: true })
}

init()
