import React, { useEffect, useState } from 'react'
import '../css/Profile.css'
import EditProfile from './EditProfile';
import PostComponent from './PostComponent';

export default function Profile() {

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [userDetail, setUserDetail] = useState({});
    const [editProfile,setEditProfile] = useState(false)
    const [myPostButton,setMyPostButton] = useState(false)
    const [myPosts] = useState([])
    const [userPost, setUserPost] = useState({});
    


    useEffect(() => {
        fetch("http://localhost:3000/users")
          .then(res => res.json())
          .then(data => {setUsers(data)})
          .catch(err=>console.log(err));
        setCurrentUser(localStorage.getItem('Username'));
      }, []);

    useEffect(()=>{

        let user1 = users.find(u=>u.uname===currentUser);
        setUserDetail(user1);
        // console.log(user1);

    }, [users, currentUser]);

    useEffect(() => {
      fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => setUserPost(data))
    },[])

    const viewPost = () => { 
      setMyPostButton(true)
      setEditProfile(false)
      if(myPosts.length===0)
      {
        userPost.filter(post => post.uname === localStorage.getItem('Username') && myPosts.push(post))
      }
        
    }
  
        

  return (
    <div>
        <div className='profileBody'>
            <div className='dataBlock'>
                <h1>User Details</h1>
                <h2>Name: {userDetail && userDetail.fname} {userDetail && userDetail.lname}</h2>
                <h2>User name: {userDetail && userDetail.uname}</h2>
                <h2>Email ID: {userDetail && userDetail.email}</h2>
                <h2>Phone number: {userDetail && userDetail.pno}</h2>
                <div>
                  <button onClick={() => { 
                    setMyPostButton(false)
                    setEditProfile(true)
                }}
                >Edit Profile</button>
                
                <button onClick ={viewPost}
                > View Posts</button></div>

            </div>
        </div>
        {
          editProfile && <EditProfile userDetail={userDetail}/>
        }
<div className='myPostCard'>
        {
          myPostButton && myPosts.map((post,index) => {
            console.log(post);
          return <PostComponent key={index} title = {post.postTitle} image = {post.postImage} content = {post.postClass} uname = {post.uname} id={post.id} />
        })
      }
      </div>
      </div>
    
  )
}
