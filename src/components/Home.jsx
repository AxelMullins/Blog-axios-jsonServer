import React from "react";
import { Container, Row } from "react-bootstrap";
import Feed from "./Feed";

const Home = ({ posts }) => {
  return (
    <Container className="mt-5">
      <main>
        <Row xs={1} md={3} className="g-4">
          {posts.length ? (
            <Feed posts={posts} />
          ) : (
            <p className="text-center text-danger my-5">No posts</p>
          )}
        </Row>
      </main>
    </Container>
  );
};

export default Home;
