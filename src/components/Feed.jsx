import React from "react";
import { Card, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Feed = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Col key={post.id}>
          <NavLink to={`/post/${post.id}`} className="text-black">
            <Card className="mb-3 shadow h-100">
              <Card.Header className="fw-bold text-center bg-dark text-white border-bottom border-4">{post.title}</Card.Header>
              <Card.Body className="p-0">
                <div
                  xs="12"
                  style={{
                    background: `url(${post.img}) center`,
                    backgroundSize: "cover",
                    height: "20vh",
                  }}
                ></div>
                <Card.Text  className="p-3">
                  {post.body.length <= 100
                    ? post.body
                    : `${post.body.slice(0, 100)}...`}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-end">{post.datetime}</Card.Footer>
            </Card>
          </NavLink>
        </Col>
      ))}
    </>
  );
};

export default Feed;
