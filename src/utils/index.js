/* eslint-disable camelcase */

const mapDBToSongsFromPlaylist = (row) => {
  const { id, name, song_id, song_title, song_performer } = row

  return {
    playlists: {
      id,
      name,
      songs: song_id
        ? [{ id: song_id, title: song_title, performer: song_performer }]
        : []
    }
  }
}

module.exports = { mapDBToSongsFromPlaylist }
