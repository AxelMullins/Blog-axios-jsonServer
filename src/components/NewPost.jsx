import { Button, Container, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import DataContext from "../context/DataContext";
import { format } from "date-fns";
import api from "../api/posts";
import { NavLink } from "react-router-dom";

const Post = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postImg, setPostImg] = useState("");
  const [postCreated, setPostCreated] = useState(false);
  const { posts, setPosts } = useContext(DataContext);

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

  return (
    <Container className="mt-5 shadow border rounded p-5">
      <h2 className="mb-4">New Post</h2>
      {!postCreated ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label>Post title</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Post Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="postImg">
            <Form.Label>Post Img</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Post Img"
              value={postImg}
              onChange={(e) => setPostImg(e.target.value)}
            />
            <Form.Text className="text-muted">
              * go to Google - search some img - right click and "copy the image
              address".
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="postBody">
            <Form.Label>Post Body</Form.Label>
            <Form.Control
              as="textarea"
              required
              rows={3}
              placeholder="Post Body"
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create new post
          </Button>
        </Form>
      ) : (
        <div className="text-center my-5">
          <p className="ttext-danger">Post created</p>
          <NavLink to="/">
            <Button
              variant="primary"
              onClick={() => {
                setPostCreated(false);
              }}
            >
              Go to Home
            </Button>
          </NavLink>
        </div>
      )}
    </Container>
  );
};

export default Post;
