import Video from '../models/videos.js'; 
import mongoose from 'mongoose'
import express from 'express'
const router = express.Router();

// GET API: `/` renders an Bootstrapped Dashboard showing all the videos of our predefined Search

router.get('/', async (req, res) => {
    res.render("index");
});

// GET API: `/videos` returns videos in JSON format per page.
// GET API: `/videos` also support searching of data using advanced filter of videos like `/videos?q={Search_Text}&sortBy={Sort_Filter}&page={Page_Number}`

router.get("/videos", async (req, res) => {

  //Getting all the params passed in URL
    const sortBy = req.query.sortBy || "publishedAt";
    const page = req.query.page || 0;
    const { q } = req.query;
  
    let videos;
    let totalVideos;
  
    try {
      //IF a search params is defined then find data using fuzzy searching
      if (q) {
        // Searching videos with the search query params and sort query params
        videos = await Video.fuzzySearch({query: q}).sort({ [sortBy]: 1 });
        totalVideos = videos.length;

        //Splicing out first 10 videos
        videos = videos.splice(page * 10, 10);

      // ELSE search data normally from database
      } else {
        totalVideos = await Video.estimatedDocumentCount();
        // Paginated 10 videos per page
        videos = await Video.find({},{},
          {
            skip: page * 10,
            limit: 10,
          }
        ).sort({ [sortBy]: 1 });
      }
  
      // Showing 10 videos per page
      const pagesCount = Math.ceil(totalVideos / 10);

      //Creating bool variables for isNext and isPrev page exist or not
      const isPrevExist = page > 0;
      const isNextExist = page < pagesCount;
  
      // Adding isPrevExist,isNextExist,totalVideos,pagesCount with videos to response
      res.status(200).json({videos,isPrevExist,isNextExist,totalVideos,pagesCount});
    } catch (err) {
      res.send(err);
  }});

  export default router