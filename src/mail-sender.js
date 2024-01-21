const nodemailer = require('nodemailer')

class MailSender {
  constructor () {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
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
