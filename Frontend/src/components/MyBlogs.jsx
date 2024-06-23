import React, { useState, useEffect } from "react";
import Blog from "./Blog.jsx";
import axios from "axios";

const MyBlogs = () => {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const id = localStorage.getItem('userId');
  
  const sendRequest = async () => {
    const res = await axios.get(`https://mern-blog-app-backend-1.onrender.com/user/blogs/${id}`).catch((err) => console.log(err))
    const data = await res.data;
    return data;
  }
  
  useEffect(() => {
    sendRequest().then((user) => {
      setUser(user.user);
      setUserBlogs(user.user.blogs)
      });
  }, [id])
  
  
  return (
    <>
    <div className="container-fluid Blog-Container">
   {userBlogs && userBlogs.map((blog, index) => {
     return (
       <Blog blog={blog} key={index} user={user} isUser={true}/>)
   })
   }
   </div>

  </>
  );
}

export default MyBlogs;