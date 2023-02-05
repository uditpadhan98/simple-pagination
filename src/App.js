import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { Post } from './components/Post';
import { Pagination } from './components/Pagination';

const App=()=> {
const [posts,setPost]=useState([]);
const [loading,setLoading]=useState(false);
const [currentPage,setCurrentPage]=useState(1);
const [postPerPage]=useState(10);

useEffect(()=>{
  const fetchPosts= async()=> {
    setLoading(true);
    const res=await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPost(res.data);
    setLoading(false);
  }

  fetchPosts();
},[]);

const indexOfLastPost=postPerPage*currentPage;
const indexOfFirstPost=indexOfLastPost-postPerPage;
const currentPost=posts.slice(indexOfFirstPost,indexOfLastPost);

//console.log(posts);

const paginate=pageNumber=>setCurrentPage(pageNumber);

  return (
    <div className="container mt-3">
      <h1 className='text-primary mb-3'>My Blogs</h1>
      <Post posts={currentPost} loading={loading}/>
      <Pagination postPerPage={postPerPage} totalPost={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App;

