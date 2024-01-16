import Auth from './components/Auth.jsx';
import Navbar from "./components/Navbar.jsx";
import {Route, Routes} from 'react-router-dom';
import Blogs from './components/Blogs.jsx';
import MyBlogs from './components/MyBlogs.jsx';
import AddBlog from './components/AddBlog.jsx';
import BlogDetail from './components/BlogDetail.jsx';
import {useSelector, useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {authActions} from './Store/index.js';


function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem('userId')){
      dispatch(authActions.login());
    }
  }, [dispatch])
  return( 
    <>
  <header>
    <Navbar />
  </header>
  <main>
  <Routes>
   
  {!isLoggedIn ?
  <Route path="/" element={<Auth />} />
  :
  <>
   <Route path="/blogs" element={<Blogs />} />
   <Route path="/myBlogs" element={<MyBlogs />} />
   <Route path="/addBlog" element={<AddBlog />} />
   <Route path="/myBlog/:id" element={<BlogDetail />} />
  </>
  }
  </Routes>
  <div className="Footer w-100 border">
      <p>For any Queries you can reach us on 8511xxxxxx</p>
 </div>
  </main>
  </>
  );
}

export default App;
