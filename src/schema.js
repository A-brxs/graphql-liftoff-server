const { gql } = require('apollo-server')

const typeDefs = gql`
  # Schema definitions here
  """
  Track:
  Will show the course's information for a particular Author.
  """
  type Track {
    id: ID!
    "Title of the course"
    title: String!
    "The author of this module"
    author: Author!
    "Thumbnail"
    thumbnail: String
    "Total length of all modules"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The track's full duration, in seconds"
    durationInSeconds: Int
    "How many modules there are"
    modulesCount: Int
    "The track's complete description, can be in Markdown format"
    description: String
    "The number of times a track has been viewed"
    numberOfViews: Int
    "The list of Modules in this Track"
    modules: [Module!]!
  }
  """
  Author:
  The creator of a module or modules.
  """
  type Author {
    id: ID!
    "Name of the Author"
    name: String!
    "Photo of the Author"
    photo: String
  }

  "A Module is a single unit of teaching. Multiple Modules compose a Track"
  type Module {
    id: ID!
    "The Module's title"
    title: String!
    "The Module's length in minutes"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The module's video duration, in seconds"
    durationInSeconds: Int
  }

  type Query {
    "Get tracks array for homepage grid"
    tracksForHome: [Track!]!
    "Fetch a specific track, provided a track's ID"
    track(id: ID!): Track
  }

  type Mutation {
    "Increment number of track views"
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse! 
  }

  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
  }
`

module.exports = typeDefs