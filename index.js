import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5001;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // Sorts the posts depending on the id
  let sortedPosts = posts.sort((a, b) => b.id - a.id);
  res.render("index.ejs", {
    posts: sortedPosts,
  });
});

let posts = [];

app.post("/submit", (req, res) => {
  const blogTitle = req.body["blogTitle"];
  const blogContent = req.body["blogContent"];
  const authorName = req.body["authorName"];

  createNewPost(blogTitle, blogContent, authorName);

  res.redirect("/");
});

// Function for creating new posts
let currentId = 10;
function createNewPost(blogTitle, blogContent, authorName) {
  const newPost = {
    id: currentId++,
    blogTitle: blogTitle,
    blogPostContent: blogContent,
    dateCreated: new Date().toLocaleDateString(),
    authorName: authorName,
  };
  posts.push(newPost);
  console.log(posts);
}

// Method for deleting existing posts
app.post("/delete/:postId", (req, res) => {
  const { postId } = req.params;
  posts = posts.filter((post) => post.id !== parseInt(postId));
  res.redirect("/");
});

// Method for editing existing ports
app.get("/edit/:postId", (req, res) => {
  const { postId } = req.params;
  const postToEdit = posts.find((post) => post.id === parseInt(postId));
  if (postToEdit) {
    res.render("edit.ejs", { post: postToEdit });
  } else {
    res.status(404).send("Post not found here bucko!");
  }
});

// Handle edit form submission
app.post("/edit/:postId", (req, res) => {
  const { postId } = req.params;
  const { blogTitle, blogContent, authorName } = req.body;
  const postIndex = posts.findIndex((post) => post.id === parseInt(postId));
  if (postIndex !== -1) {
    posts[postIndex].blogTitle = blogTitle;
    posts[postIndex].blogPostContent = blogContent;
    posts[postIndex].authorName = authorName;
  } else {
    res.status(404).send("Post not found here bucko!");
  }
  res.redirect("/");
});

// Method for checking the port is running on port 5000
app.listen(process.env.PORT || port, () =>
  console.log(`Listening on port ${port}`)
);

// Old app.listen method
// app.listen(port, () => {
//     console.log(`Looks like your in luck! The server be running on port ${port}.`)
// })

// const posts = {
//     "post001" : {
//         blogTitle : "Test Blog Title 2",
//         blogPostContent : "Test Blog Post Content",
//         dateCreated : "Test Date Created",
//         author : "Test Author"
//     }
// }

// res.render("index.ejs", {
//     postTitle : posts["post001"].blogTitle,
//     postContent : posts["post001"].blogPostContent,
//     dateCreated2 : posts["post001"].dateCreated,
//     author2 : posts["post001"].author
//     // responseVariable : `Blog Title = ${req.body["blogTitle"]} & Blog Content = ${req.body["blogContent"]}`
// })
