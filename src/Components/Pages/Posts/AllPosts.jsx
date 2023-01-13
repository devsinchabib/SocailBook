import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PostCard from './Post/PostCard';
import './AllPosts.css'
import {Link } from 'react-router-dom';



console.log(process.env)
function AllPosts() {
    const [posts, setPosts] = useState([]);
    const { REACT_APP_BASE_URL, REACT_APP_POSTS_PARAM } = process.env;
    const [user,setUser]=useState(null);

    function editPost(id,title,body){
        const allPosts = [...posts];
        allPosts.forEach((value, index) => {
            if(value.id==id){
                allPosts[index].body = body;
                allPosts[index].title = title;
            }

        })
        localStorage.setItem("posts", JSON.stringify(allPosts))

        setPosts(allPosts)

    }
    function deletePost(id){
        const allPosts=[...posts];
        const allNewPosts=allPosts.filter((value) => {
            return value.id!=id;
        })
        allNewPosts.forEach((value,index) => {
            if(value.id>id){
                allNewPosts[index].id=value.id-1;
            }

        })
        localStorage.setItem("posts", JSON.stringify(allNewPosts))
        console.log(allNewPosts)

        setPosts(allNewPosts)


    }

   
    useEffect(() => {

        const posts = (localStorage.getItem("posts"))
        if (posts) {

            setPosts(JSON.parse(posts))
        } else {
            axios.get(`${REACT_APP_BASE_URL}/${REACT_APP_POSTS_PARAM}`)
                .then(function (response) {
                    setPosts(response.data)
                    localStorage.setItem("posts", JSON.stringify(response.data))
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        const user=localStorage.getItem("user")
        if(user){
            setUser(JSON.parse(user))
        }

    }, []);

    return (
        <>

        <h1 className='heading'>POSTS</h1>

        <div className="row row-cols-4 mt-5 mx-4 g-4">


            {
                posts.map(function (post, index) {
                    return <div className="col" key={index}> <PostCard post={post} authenticatedUser={user} onEdit={editPost} onDelete={deletePost}/>   </div>
                })
            }



        </div>
        {user!==null && <Link className='add-post' to="/addPost" state={user}>Add Post</Link>}
        
        </>
    )
}

export default AllPosts
