const express = require("express");
const app = express();
app.use(express.json());
const posts = require("./Posts");
require("./mongo");
const cors = require('cors');
app.use(cors());

app.get("/postsdata", async (req, res) => {
  let postsdata = await posts.find({});
  res.send(postsdata);
});

app.post("/addpost", async (req, res) => {
  if (req.body) {
    if (req.body.title) {
      if (req.body.content) {
        let postData = await posts(req.body);
        let result = await postData.save();
        res.send(`Added New Post: ${result.title}`);
      } else {
        res.send("Please Add Content");
      }
    } else {
      res.send("Please Add Title");
    }
  } else {
    res.send("Enter Data To Modify");
  }
});

app.put("/post/:id", async (req, res) => {
    let reqPostData = await posts.updateOne(
        { _id: req.params.id },
        {
          $set: req.body,
        }
      );
      res.send(`Your Post Modified Successfully`);
});

app.delete('/delete/:id', async (req, res) => {
    let requestedPost = await posts.deleteOne({_id: req.params.id})
    res.send(`Deleted Successfully with id: ${req.params.id}`)
})

app.listen(3001, (req, res) => {
  console.log("server Working");
});

module.exports = app;
