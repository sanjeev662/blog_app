import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import BlogCard from "./BlogCard";
import { url } from "../../Constants";

const BlogList = () => {
  const [blogList, setBlogList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const getBlogList = async () => {
    try {
      const { data } = await axios.get(`${url}/blog/getAllBlogs`, {
        headers: {
          // 'token': localStorage.getItem('token')
        },
      });
      setErrorMsg("");
      setBlogList(data);
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  useEffect(() => {
    getBlogList();
  }, []);

  return (
    <Container style={{ marginBottom: "2rem", minHeight: "75vh" }}>
      <Row>
        {blogList.length > 0 ? (
          blogList.map((blog) => {
            return (
              <Col className="mt-4" key={blog._id}>
                <BlogCard blog={blog} getBlogList={getBlogList} />
              </Col>
            );
          })
        ) : (
          <h3 colSpan={3} style={{ fontWeight: "300" }}>
            No files found. Please add some.
          </h3>
        )}
      </Row>
    </Container>
  );
};

export default BlogList;
