import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        posts : posts
    })
  });  


let posts = [];

app.post("/submit", (req, res) => {

    const blogTitle = req.body["blogTitle"];
    const blogContent = req.body["blogContent"];
    const authorName = req.body["authorName"];

    createNewPost(blogTitle,blogContent,authorName)

    res.redirect("/")
})


let currentId = 10;
function createNewPost(blogTitle, blogContent, authorName) {
    const newPost = {
        id : currentId++,
        blogTitle : blogTitle,
        blogPostContent: blogContent,
        dateCreated: new Date().toLocaleDateString(),
        author: authorName, 
    };
    posts.push(newPost);
    console.log(posts)
};

app.post("/delete/:postId", (req, res) => {
    const { postId } = req.params;
    posts = posts.filter(post => post.id !== parseInt(postId));
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Looks like your in luck! The server be running on port ${port}.`)
})






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







