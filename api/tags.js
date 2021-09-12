const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName, getAllTags } = require('../db');


tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
    next();
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    const tageName = req.params.tagName;
    try {
      // use our method to get posts by tag name from the db
      console.log(tageName);
      const posts = await getPostsByTagName(tageName);
      res.send({posts});
      // send out an object to the client { posts: // the posts }
    } catch ({ name, message }) {
      // forward the name and message to the error handler
    }
  });

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags(); // go back to to db/tags.js and add getAllTags function

    res.send({
        tags
    });
});

module.exports = tagsRouter;