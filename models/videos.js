import mongoose from 'mongoose'
import fuzzySearching from 'mongoose-fuzzy-searching'

// Creating Video Schema
const videoSchema = mongoose.Schema(
  {
    title: {
      type: String, 
      required: true
    },
    channelId: {
      type: String,
      required: true
    },
    channelTitle: {
      type: String
    },
    videoId: {
      type: String,
      required: true
    },
    publishedAt: {
      type:Date,
      required: true
    },
    thumbnail: {
      type: String
    },
    description: {
      type: String
    },
  },
  {
    timestamps: true,
  }
)

// Adding mongoose-fuzzy-searching on title and description
videoSchema.plugin(fuzzySearching, {
    fields: ["title", "description"],
  });


// Creating Video Model
const Video = mongoose.model('Video', videoSchema)

export default Video
