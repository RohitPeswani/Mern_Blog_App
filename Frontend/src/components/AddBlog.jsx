import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Styles/AddBlog.css'
const AddBlog = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title : '',
    description : '',
    imageUrl : '',
    user : localStorage.getItem('userId')
  })
  
  const sendRequest = async () => {
  const res = await axios.post("http://localhost:5000/blog/add",{
    title : inputs.title,
    description : inputs.description,
    imageUrl : inputs.imageUrl,
    user : inputs.user
  })
  const data = await res.data;
  }
  
  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }
  
  const handleSubmit = (e) => {
    console.log("Clicked");
    e.preventDefault();
    sendRequest().then(() => navigate("/myBlogs"));
  }
  return (
    <div className="container-fluid addBlogContainer">
     <div className="row w-100 justify-content-center">
       <div className="col-md-12">
          <div className="card p-5 addBlogCard">
            <h4 className="addBlogTitle text-center">Post Blog</h4>
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
                value={inputs.description}/>
              </div>
              <div className="form-group mt-5">
                <label htmlFor="image">ImageUrl</label>
                <input type="text" className="form-control" 
                id="image" 
                placeholder="Enter imageURL"
                name="imageUrl"
                onChange={handleChange}
                value={inputs.imageUrl}/>
              </div>
              
              <button type="submit" className="btn btn-primary w-100 mt-5 p-2" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
       </div>
    </div>
    </div>
  );
}
export default AddBlog;