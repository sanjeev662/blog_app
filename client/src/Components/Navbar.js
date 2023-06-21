import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import navlogo from "./navlogo.png"

function Navbars() {

  return (
    <Navbar bg="dark" variant="dark" style={{'height' : '10vh' , position:"relative" , width: "100%"}}>
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={navlogo}
            width="50"
            height="33"
            className="d-inline-block align-top"
          />{"   "} 
          Blog-app
        </Navbar.Brand>

       <Link to='/createblog'>+ Create Blog</Link>
      </Container>
    </Navbar>
  );
}

export default Navbars;
