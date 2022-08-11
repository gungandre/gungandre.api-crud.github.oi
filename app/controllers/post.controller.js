const db = require("../models/index.js");
const Post = db.posts;

exports.findAll = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500);
      send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};

exports.create = (req, res) => {
  post = new Post({
    title: req.body.title,
    body: req.body.body,
    published: req.body.published ? req.body.published : false,
  });

  post
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409);
      res.send({
        message: err.message || "Some error occurred while create posts.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409);
      res.send({
        message: err.message || "Some error occurred while show posts.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send("Post not found");
      }
      res.send("Post updated successfully");
    })
    .catch((err) => {
      res.status(409);
      res.send({
        message: err.message || "Some error occurred while update posts.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send("Post not found");
      }
      res.send("Post deleted successfully");
    })
    .catch((err) => {
      res.status(409);
      res.send({
        message: err.message || "Some error occurred while delete posts.",
      });
    });
};
