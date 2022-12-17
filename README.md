# Project Goal

To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

### Functioning of Project

- GET API: `/` renders an Bootstrapped Dashboard showing all the videos of our predefined Search (defined in .env as football by default).
- Dashboard Consist of Sorting, Pagination and Filtering of videos on the basis of Published Date and Title.
- API fetching videos asynchronously in background every 20 seconds (you can change time interval from .env file)
- GET API: `/videos` returns videos in JSON format per page.
- GET API: `/videos` also support searching of data using advanced filter of videos like `/videos?q={Search_Text}&sortBy={Sort_Filter}&page={Page_Number}`
- Optimised search api, able to search videos containing partial match for the search query in either video title or description. (used mongoose-fuzzy-searching for this case)

### How to Run Project

1. Cloning the project on your machine

   - `git clone https://github.com/hemantsaini-7/Fam_Youtube.git`

2. Create a .env file on root directory, read reference below for YT API and MONGO_URI

   - ```
     PORT = 3000
     YT_API = YOUR_YT_API
     MONGO_URI = YOUR_MONGO_URI
     YT_SEARCH = football
     NODE_ENV = development
     SEARCH_INTERVAL = 20
     ```

3. Run command for installing project dependencies mentioned in package.json

   - `npm install`

4. To run application on local use command

   - `npm run dev`
   - Redirect to http://localhost:3000/ to see application live.

5. Dockerized Project

   - Make sure to update key references of envirnoment variables as per defined in your .env to docker-compose.yml file.

   - Run the following command for:
     - starting container `docker-compose up -d`
     - stopping container `docker-compose down`

### References

- YouTube data v3 API: [https://developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started)
- Search API reference: [https://developers.google.com/youtube/v3/docs/search/list](https://developers.google.com/youtube/v3/docs/search/list)
- To fetch the latest videos you need to specify these: type=video, order=date, publishedAfter=<SOME_DATE_TIME>
- Without publishedAfter, it will give you cached results which will be too old
- Get Mongo_URI: Create a free cluster on MongoDB atlas and click connect to application option, your URI will be shown make sure to update password and collection name.
