import { Button, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import axios from "axios";
import swal from "sweetalert";
import { url } from "../../Constants";
import { Link, useNavigate } from "react-router-dom";

const BlogCard = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const { blog, getBlogList } = props;
  const navigate = useNavigate();

  function handleClick() {
    let blogId = blog._id;
    navigate(`/blogdetail/${blogId}`, {
      state: {
        blog,
      },
    });
  }

  const deleteBlog = async () => {
    try {
      const blogId = blog._id;
      const result = await axios.delete(`${url}/blog/delete/${blogId}`, {
        headers: {
          // 'token': localStorage.getItem('token')
        },
      });

      if (result.data.success === true) {
        swal({
          title: "Success!",
          text: "Deleted successfully",
          icon: "success",
          button: "Ok!",
        }).then(() => {
          getBlogList(); // Call getBlogList after successful deletion
        });
        navigate("/");
      } else {
        swal({
          title: "Try Again!",
          text: result.data.message,
          icon: "error",
          button: "Ok!",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while deleting file. Try again later");
      }
    }
  };

  return (
    <>
      <Card style={{ width: "20rem" }} className="mx-auto">
        <Card.Img
          variant="top"
          src={
            !blog.img_path
              ? "https://static.tvmaze.com/uploads/images/medium_portrait/425/1064746.jpg"
              : blog.img_path
          }
          style={{ height: "15rem" }}
        />
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>
            Description: {blog.description}
            <br />
          </Card.Text>
          <Button variant="primary" onClick={handleClick}>
            Read More
          </Button>
          <Button
            variant="primary"
            style={{ marginLeft: "5px" }}
            onClick={deleteBlog}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default BlogCard;
