import React, {useRef, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Styles/Blog.css';


const Blog = (props) => {
  
  console.log(props.blog)
  const inputElem = useRef();
  const [likeCount, setLikeCount] = useState(props.blog.likedBy.length);
  const navigate = useNavigate();
  const {title, description, imageUrl, user, _id } = props.blog;
  const User = props.user;
  const userId = localStorage.getItem('userId');
  const handleEdit = () =>{
    navigate(`/myBlog/${_id}`)
  }
  const handleLikeRequest = async (id) =>{
    
    if(inputElem.current.checked){
      const res = await axios.put(`http://localhost:5000/blog/unlike/${id}`,{
        userId : localStorage.getItem('userId')
      })
      const data = await res.data;
      return data;
    }else{
      const res = await axios.put(`http://localhost:5000/blog/like/${id}`,{
        userId : localStorage.getItem('userId')
      })
      const data = await res.data;
      return data;
      
    }
  }
  
  const handleLike = (id) => {
    handleLikeRequest(id).then(() => navigate("/myBlogs"))
    .then(() => {
      setTimeout(() => {
        navigate("/blogs")
      }, 50)
    })
  
  }
  
 /* useEffect(() => {
    handleLikeRequest();
  }, [inputElem.current.checked])*/
  
  const deleteRequest = async(id) => {
    const res = await axios.delete(`http://localhost:5000/blog/delete/${id}`).catch((err) => console.log(err))
    const data = await res.data;
    return data;
  }
  
  const handleDelete = (id) => {
    deleteRequest(id).then(() => navigate("/")).then(() => navigate("/blogs"))
  }
  
  
  return (
    <div className="row w-100 justify-content-center mt-5">
     <div className="col-md-10 col-12 blogCol">
     <div className="card p-4">
     <div className="card-header d-flex align-items-center mb-3">
       <div className="avtar mr-5">
        {User ? User?.name.charAt(0) : user?.name.charAt(0)}
       </div>
       
       <div className="title"
       style={
         {
           'fontSize' : '35px',
           'fontWeight' : '600',
         }
         
       }>{title}</div>
     </div>
        <img className="card-img-top img-fluid mt-3" src={imageUrl} alt="Card image cap"
        style={{
          'width' : '100%',
          'height' : '300px'
        }}/>
        <div className="card-body mt-3 blog-body">
          <p className="card-text mb-4 blog-text"
          style={
            {
              'fontSize' : '32px'
            }
          }>{description}</p>
          {props.isUser || userId === user?._id ?
          <div className="buttons-container w-100 d-flex justify-content-between">
          <button className="col-md-5 col-4 btn btn-primary" onClick={handleEdit}>Edit</button>
          <button className="col-md-5 col-4 btn btn-primary" onClick={() => handleDelete(_id)}>Delete</button>
          </div>: ''}
        </div>
      <div className="w-100">
     { /*{
        console.log()
      }*/}
      <input type="checkbox" className="likebox" ref={inputElem} id={`like_${props.blog._id}`} checked={props.blog.likedBy.includes(userId)}/>
        <label className="likeLabel p-4" htmlFor={`like_${props.blog._id}`} onClick={(e) => handleLike(_id)}>
          <i className="fa fa-heart"></i> <span>{likeCount}</span>
        </label>
   
            
                               
        
        
      </div>
      </div>
     </div>
    
    </div>
  )
}

export default Blog;