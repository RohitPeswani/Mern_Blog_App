import React, { useState, useEffect } from "react";
import Blog from "./Blog.jsx";
import axios from "axios";
import '../Styles/Blog.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const sendRequest = async() => {
    const res = await axios.get("https://mern-blog-app-backend-1.onrender.com/blog")
    .catch((err) => console.log(err))
    
    const data = await res.data;
    
    return data.blogs;
  }
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data));
  },[])
  return(
    <>
    <div className="container-fluid Blog-Container">
      {
        blogs && blogs.map((blog , index) => {
         return  (<Blog blog={blog} key={index}/>)
        })
        
      }
    </div>

    </>
 );

}

export default Blogs;