import {google} from 'googleapis'

// Created fetchingVideos function using Youtube API v3 
const fetchingVideos = async (ytAPI, ytSearch) => {
  try {
    const yt = google.youtube({
      version: "v3",
      auth: ytAPI,
    });

// Fetching items
    const {data: { items }} = await yt.search.list({
      part: ['snippet'],
      maxResults: 30,
      order: 'date',
      type: ['video'],
      publishedAfter: '2020-01-01T00:00:00Z',
      q: ytSearch
    });

// Setting videos model using items
    const videos = items.map((item) => ({
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      videoId: item.id.videoId,
      publishedAt: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails.high.url,
      description: item.snippet.description,
    }));
    return videos;
  } catch (err) {
    console.log("ERROR:", err);
  }
};

export default fetchingVideos
