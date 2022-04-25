import React from "react";
import { Container, Row } from "react-bootstrap";
import Feed from "./Feed";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext);

  return (
    <Container className="mt-5">
      <main>
        <Row xs={1} md={3} className="g-4">
          {isLoading && <p>Loading..</p>}
          {!isLoading && fetchError && (
            <p style={{ color: "red" }}>{fetchError}</p>
          )}
          {!isLoading &&
            !fetchError &&
            (searchResults.length ? (
              <Feed posts={searchResults} />
            ) : (
              <p className="text-center text-danger my-5">No posts</p>
            ))}
        </Row>
      </main>
    </Container>
  );
};

export default Home;
