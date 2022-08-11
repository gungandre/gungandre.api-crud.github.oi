module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      body: String,
      published: Boolean,
    },
    {
      timestamps: true,
    }
  );

  //mengubah _id dari mongodb menjadi object id
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Post = mongoose.model("posts", schema);
  return Post;
};
