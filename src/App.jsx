import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import About from "./components/About";
import Header from "./components/Header";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostDetail from "./components/PostDetail";
import NotFound from "./components/NotFound";
import EditPost from "./components/EditPost";
import api from "./api/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postImg, setPostImg] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editImg, setEditImg] = useState("");
  const [postCreated, setPostCreated] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/items", {
          'mode': 'no-cors',
        });
        setPosts(response.data);
        // console.log(response.data)
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLocaleLowerCase()) ||
        post.title.toLowerCase().includes(search.toLocaleLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMM dd, yyyy pp");
    const newPost = {
      id,
      title: postTitle,
      datetime,
      body: postBody,
      img: postImg,
    };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      setPostImg("");
      setPostCreated(true);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMM dd, yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime,
      body: editBody,
      img: editImg,
    };
    try {
      const response = await api.put(`/items/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      setEditImg("");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <BrowserRouter>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route
          path="/newpost"
          element={
            <NewPost
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              postImg={postImg}
              setPostImg={setPostImg}
              handleSubmit={handleSubmit}
              postCreated={postCreated}
              setPostCreated={setPostCreated}
            />
          }
        />
        <Route
          path="/editpost:id"
          element={
            <EditPost
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              editImg={editImg}
              setEditImg={setEditImg}
              handleEdit={handleEdit}
              posts={posts}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostDetail posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
