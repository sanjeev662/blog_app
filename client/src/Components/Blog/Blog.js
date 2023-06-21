import React, { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { url } from "../../Constants";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Blog = () => {
  const [img, setImg] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const dropRef = useRef();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onDrop = (imgs) => {
    const [uploadedImg] = imgs;
    setImg(uploadedImg);

    const imgReader = new FileReader();
    imgReader.onload = () => {
      setPreviewSrc(imgReader.result);
    };
    imgReader.readAsDataURL(uploadedImg);

    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { title, description } = state;
      if (title.trim() !== "" && description.trim() !== "") {
        if (img) {
          const formData = new FormData();
          formData.append("file", img);
          formData.append("title", title);
          formData.append("description", description);

          setErrorMsg("");
          await axios.post(`${url}/blog/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          swal({
            title: "Congrats!",
            text: "Blog Posted Successfully",
            icon: "success",
            button: "Ok!",
          });
          navigate("/");
        } else {
          setErrorMsg("Please select a file to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <div className="container" style={{'minHeight' : '75vh'}}>
      <h2 className="my-4">Create Your Blog</h2>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <Form.Group as={Row} controlId="title">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="title"
              value={state.title}
              placeholder="Enter title"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="description">
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="description"
              value={state.description}
              placeholder="Enter description"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <div className="upload-section" style={{margin:"5px"}}>
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder("over")}
            onDragLeave={() => updateBorder("leave")}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({ className: "drop-zone text-center" })}
                ref={dropRef}
              >
                <input {...getInputProps()} />
                <p>Drag and drop an image or click here to select a file</p>
                {img && (
                  <div>
                    <strong>Selected image:</strong> {img.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc && (
            <div className="image-preview">
              <img className="preview-image" src={previewSrc} alt="Preview" style={{height:"20vh",marginTop:"7px"}} />
            </div>
          )}
        </div>

        <Button variant="primary" type="submit" className="my-3">
          Post
        </Button>
        <Button style={{margin:"5px"}}><Link to="/" style={{color:"white"}}>See Blogs</Link></Button>
      </Form>
    </div>
  );
};

export default Blog;


