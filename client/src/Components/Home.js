import React from 'react';
// import Movie from './MainContent/Movie';
import BlogList from "./Blog/BlogList";

function Home() {
  return (
    <div style={{'minHeight' : '80vh'}}>

      {/* yaha pe wo side to side scroll hota hai image use lagao */}
      <BlogList/>
    </div>
  );
}

export default Home;
