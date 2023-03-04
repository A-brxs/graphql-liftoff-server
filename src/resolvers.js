const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: ( _, __, {dataSources} ) => {
      return dataSources.trackAPI.getTracksForHome()
    },
    // get a single track by ID, for the track page
    track: ( _, {id}, {dataSources}) => {
      return dataSources.trackAPI.getTrack(id)
    }
  },
  Track: {
    author: ( {authorId}, _, {dataSources} ) => {
      return dataSources.trackAPI.getAuthor(authorId)
    },
    modules: ({id},_, {dataSources}) => {
      return dataSources.trackAPI.getTrackModules(id)
    },
    durationInSeconds: ({length}) => length,
  },
  Module: {
    durationInSeconds: ({length}) => length,
  },
  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (  _, {id}, {dataSources} ) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id)
        return {
          code: 200,
          success: true,
          message: `OK update of track ${id}`,
          track
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        }
      }
    }
  }
}

module.exports = resolvers