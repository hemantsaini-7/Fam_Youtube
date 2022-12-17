import fetchingVideos  from './fetchingVideos.js'
import Video from '../models/videos.js'

// Creating a continousFetch function which get videos every n seconds in background
const continousFetch = () => {
  setInterval(getVideos, process.env.SEARCH_INTERVAL * 1000)
}

const getVideos = async () => {
          try {
            const videos = await fetchingVideos(process.env.YT_API, process.env.YT_SEARCH);
            await Video.create(videos);
            console.log('Videos fetched successfully...');
            console.log(`Fetching again in ${process.env.SEARCH_INTERVAL} seconds`);
          } catch (err) {
            console.log("Error saving videos to DB",err);
          }
  }


export {continousFetch, getVideos}