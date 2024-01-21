const { Pool } = require('pg')
const NotFoundError = require('./exceptions/not-found-error')
const { mapDBToSongsFromPlaylist } = require('./utils')

class PlaylistsService {
  constructor () {
    this._pool = new Pool()
  }

  async getSongsFromPlaylist (playlistId) {
    const query = {
      text: `
        SELECT
          playlists.id,
          playlists.name,
          songs.id AS song_id,
          songs.title AS song_title,
          songs.performer AS song_performer
        FROM playlists
        JOIN playlist_songs ON playlists.id = playlist_songs.playlist_id
        JOIN songs ON playlist_songs.song_id = songs.id
        WHERE playlists.id = $1
      `,
      values: [playlistId]
    }

    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new NotFoundError('Playlist not found.')
    }

    const songsFromPlaylist = result.rows.reduce((acc, row) => {
      const mappedData = mapDBToSongsFromPlaylist(row)

      if (!acc.id) {
        acc = mappedData
      } else if (mappedData.songs.length > 0) {
        acc.songs.push(...mappedData.songs)
      }

      return acc
    }, {})

    return songsFromPlaylist
  }
}

module.exports = PlaylistsService
