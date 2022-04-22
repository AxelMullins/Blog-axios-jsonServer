import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import { useContext } from "react";
import { format } from "date-fns";
import api from "../api/posts";
import DataContext from "../context/DataContext";

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editImg, setEditImg] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
      setEditImg(post.img);
    }
  }, [post, setEditTitle, setEditBody, setEditImg]);

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
      const response = await api.put(`/posts/${id}`, updatedPost);
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

  return (
    <Container className="mt-5 shadow border rounded p-5">
      {editTitle && (
        <>
          <h2 className="mb-4">Edit Post</h2>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3" controlId="postTitle">
              <Form.Label>Post title</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Post Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="postImg">
              <Form.Label>Post Img</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Post Img"
                value={editImg}
                onChange={(e) => setEditImg(e.target.value)}
              />
              <Form.Text className="text-muted">
                * go to Google - search some img - right click and "copy the
                image address".
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="postBody">
              <Form.Label>Post Body</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows={3}
                placeholder="Post Body"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              />
            </Form.Group>

            <NavLink to="/">
              <Button
                variant="primary"
                type="submit"
                onClick={() => handleEdit(post.id)}
              >
                Edit post
              </Button>
            </NavLink>
          </Form>
        </>
      )}
    </Container>
  );
};

export default EditPost;
