const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join((__dirname, "views")));
app.use(express.static(path.join(__dirname, "public"))); // to use static file like css

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
const fileUpload = require("express-fileupload");
app.use(fileUpload());
const { uuid } = require("uuidv4");
const port = 3000;
app.listen(port, () => {
  console.log("port is listening on ", port);
});

app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

let posts = [
  {
    id: uuid(),
    username: "user1",
    img: "riyashoppingpik.jpg",
    caption: "Shpping day!",
    likes: 45,
  },
  {
    id: uuid(),
    username: "user2",
    img: "dogpik.jpg",
    caption: "Don't disturb the cuteness",
    likes: 39,
  },
  {
    id: uuid(),
    username: "user3",
    img: "teacuppik.jpg",
    caption: "Having some tea",
    likes: 366,
  },
];
app.patch("/posts/:id/like", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  post.likes++; // Increment the likes count
  res.redirect("/posts");
});

// toupdate

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  // console.log(post);
  res.render("edit", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  // console.log(req.body);
  let newCaption = req.body.caption;
  let post = posts.find((p) => id === p.id);
  post.caption = newCaption;
  if (req.body.img) {
    let newImgAdd = req.body.img;
    post.img = newImgAdd;
  }

  res.redirect("/posts");
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

// create new post

app.post("/posts", (req, res) => {
  let { username, img, caption } = req.body;
  let id = uuid();
  let likes = 0;
  posts.push({ id, username, img, caption, likes });
  res.redirect("/posts");
});

// destroy post

app.delete("/posts/:id",(req,res)=>{
  let {id}=req.params;
  posts=posts.filter(p=>id !=p.id);
  res.redirect("/posts");
})