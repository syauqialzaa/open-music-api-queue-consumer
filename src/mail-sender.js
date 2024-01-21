const nodemailer = require('nodemailer')
const credentials = require('../config/credentials')

class MailSender {
  constructor () {
    this._transporter = nodemailer.createTransport({
      host: credentials.smtp.host,
      port: credentials.smtp.port,
      auth: {
        user: credentials.smtp.user,
        pass: credentials.smtp.password
      }
    })
  }

  sendEmail (targetEmail, content) {
    const message = {
      from: 'Open Music Apps',
      to: targetEmail,
      subject: 'Songs From Playlist Exports.',
      text: 'Attached are the results of the Songs From Playlist Export.',
      attachments: [
        {
          filename: 'playlist_songs.json',
          content
        }
      ]
    }

    return this._transporter.sendMail(message)
  }
}

module.exports = MailSender
