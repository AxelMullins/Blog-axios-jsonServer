import { Button, Container, Form } from "react-bootstrap";

const Post = ({
  setPostTitle,
  postTitle,
  setPostBody,
  postBody,
  setPostImg,
  postImg,
  handleSubmit,
}) => {
  return (
    <Container className="mt-5 shadow border rounded p-5">
      <h2 className="mb-4">New Post</h2>
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
    </Container>
  );
};

export default Post;
