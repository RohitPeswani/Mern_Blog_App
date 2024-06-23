import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Styles/AddBlog.css';

const BlogDetail = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [inputs, setInputs] = useState({});
  const sendRequest = async () => {
    const res = await axios.get(`https://mern-blog-app-backend-1.onrender.com/blog/${id}`).catch((err) => console.log(err))
    const data = await res.data;
    
    return data
  }
  
  
  useEffect(() => {
    sendRequest().then((data) => setInputs(() => {
      return {
        title : data.blog.title,
        description : data.blog.description,
        imageUrl : data.blog.imageUrl
      }
    }))
  }, [id])

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }
const updateRequest = async () => {
    const res = await axios.put(`https://mern-blog-app-backend-1.onrender.com/blog/update/${id}`, {
      title : inputs.title,
      description : inputs.description,
      imageUrl : inputs.imageUrl
    })
    
    const data = await res.data;
    
    console.log(data);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateRequest().then(() => navigate("/blogs"));
  }
  
  return(
    <div className="container-fluid addBlogContainer">
     <div className="row w-100 border justify-content-center">
       <div className="col-md-12">
          <div className="card p-5 addBlogCard">
            <h4 className="card-title text-center">Edit Blog</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" 
                id="title" 
                placeholder="Enter title"
                name="title"
                onChange={handleChange}
                value={inputs.title}/>
              </div>
              <div className="form-group mt-5">
                <label htmlFor="desc">Description</label>
                <input type="text" className="form-control" 
                id="desc" 
                placeholder="Enter description"
                name="description"
                onChange={handleChange}
                value={inputs.description} />
              </div>
              <div className="form-group mt-5">
                <label htmlFor="image">ImageUrl</label>
                <input type="text" className="form-control" 
                id="image" 
                placeholder="Enter imageURL"
                name="imageUrl"
               onChange={handleChange}
                value={inputs.imageUrl} />
              </div>
              
              <button type="submit" className="btn btn-primary w-100 mt-5 p-2" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
       </div>
    </div>
    </div>
  )
}

export default BlogDetail;