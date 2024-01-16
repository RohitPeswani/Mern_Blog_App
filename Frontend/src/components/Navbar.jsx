import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../Store/index.js";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import '../Styles/Navbar.css';


const Navbar = (props) => {
  const inputElem = useRef();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('All Blogs');
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [darkMode, setDarkMode] = useState(false);
  
 const handleDarkMode = (e) => {
   console.log(inputElem);
    inputElem.checked = !inputElem.checked;
    if(inputElem.checked){
      document.body.classList.add("dark-mode");
    }else{
      document.body.classList.remove("dark-mode");
    }
  }

return(
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">BeSocial</a>
  
  {isLoggedIn && <div className="d-flex ml-auto mr-auto Tab-container">
     <Link className={`Tab ${activeTab === 'All Blogs' ? 'active' : ''}`}
     to="/blogs" onClick={ () => {setActiveTab('All Blogs')}}> All Posts 
     </Link>
     <Link className={`Tab ${activeTab === 'My Blogs' ? 'active' : ''}`}
     to="/myBlogs" onClick= { () => { setActiveTab('My Blogs')}}>My Posts</Link>
     <Link className={`Tab ${activeTab === 'Add Blogs' ? 'active' : ''}`}
     to="/addBlog" onClick= { () => { setActiveTab('Add Blogs')}}>Add Posts</Link>
     
  </div>}
    <ul className="navbar-nav">
      {!isLoggedIn && 
      <>
    { /* <li className="nav-item">
        <Link to="/auth" className="nav-link" href="#">SignUp</Link>
      </li>*/}
      <li className="nav-item">
        <Link to="/" className="nav-link" href="#">Login</Link>
      </li>
      </>
      }
      {isLoggedIn && <li className="nav-item">
        <Link className="nav-link" href="#"
        to="/"
        onClick={() => dispatch(authActions.logout())}>LogOut</Link>
      </li>}
      
  <div className = 'toggle-switch' >
                <input type = 'checkbox' className="darkModeInput" id="darkModeInput" ref={inputElem}/>
                <label className="darkModeLabel" htmlFor="darkModeInput" onClick={(e) => handleDarkMode(e)}></label>
          
  </div>
</ul>
</nav>
  );
}

export default Navbar;