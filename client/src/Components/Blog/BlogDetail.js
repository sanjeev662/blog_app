import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";

function BlogDetail() {
  const { state } = useLocation();
  const { blog } = state;

  const navigate = useNavigate();

  function handleClick() {
    let blogId = blog._id;
    navigate(`/blogupdate/${blogId}`, { state: { blog } });
  }

  return (
    <div
      style={{ minHeight: "80vh", paddingTop: "2rem", paddingBottom: "1rem" }}
    >
      <Container>
        <Row>
          <Col style={{ textAlign: "right", paddingRight: "2rem" }}>
            <img
              alt="blog"
              width={"40%"}
              src={
                !blog.img_path
                  ? "https://static.tvmaze.com/uploads/images/medium_portrait/425/1064746.jpg"
                  : blog.img_path
              }
            />
          </Col>
          <Col style={{ textAlign: "left", paddingLeft: "2rem" }}>
            <h3>{blog.title}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: blog.description }}
              className="mt-4"
            ></div>
            <Button
              variant="primary"
              onClick={handleClick}
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>

            <Button
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
              variant="primary"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BlogDetail;
