import { HashRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Blog from "./Components/Blog/Blog";
import BlogList from "./Components/Blog/BlogList";
import BlogDetail from "./Components/Blog/BlogDetail";
import UpdateBlog from "./Components/Blog/UpdateBlog"
function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/" element={<BlogList />}></Route>
          <Route exact path="/createblog" element={<Blog />}></Route>         
          <Route exact path="/blogupdate/:id" element={<UpdateBlog />}></Route>
          <Route exact path="/blogdetail/:id" element={<BlogDetail />}></Route>
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
