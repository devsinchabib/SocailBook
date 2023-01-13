import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import CommentCard from './CommentCard';
import {Link} from 'react-router-dom'
import './Comments.css'
function Comments() {
    const location = useLocation();
    const {id,user}=location.state
    const [comments, setComments] = useState([])
    const { REACT_APP_BASE_URL, REACT_APP_POSTS_PARAM , REACT_APP_COMMENTS_PARAM} = process.env;
    useEffect(() => {
        const comments=localStorage.getItem(`commentsForPost${id}`)
        if (comments) {

            setComments(JSON.parse(comments))
        }

        else if (id>100) {
            localStorage.setItem(`commentsForPost${id}`,JSON.stringify([]))
            
        }else{
            axios.get(`${REACT_APP_BASE_URL}/${REACT_APP_POSTS_PARAM}/${id}/${REACT_APP_COMMENTS_PARAM}`)
            .then(function (response) {
            localStorage.setItem(`commentsForPost${id}`,JSON.stringify(response.data))
            setComments(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        
    }, [])

    function editComment(postId,id,name,body){
        const allComments=[...comments]

        allComments.forEach((value,index)=>{
            if(value.id==id){
                allComments[index].name=name;
                allComments[index].body=body;
            }
        });
        console.log(allComments)
        localStorage.setItem(`commentsForPost${postId}`,JSON.stringify(allComments))
        setComments(allComments)

    }
    function deleteComment(postId,id){
        const allComments=[...comments];
        const allNewComments=allComments.filter((value) => {
            return value.id!=id;
        })
        allNewComments.forEach((value,index) => {
            if(value.id>id){
                allNewComments[index].id=value.id-1;
            }

        })
        localStorage.setItem(`commentsForPost${postId}`,JSON.stringify(allNewComments))
        setComments(allNewComments)


    }

   
    return (
        <>
        <h1 className='heading'>Comments</h1>
        <div className="row row-cols-4 mt-5 mx-4 g-4">
          
          {comments.map((item, index)=>{
            return <div className="col" key={index}> <CommentCard comment={item} authenticatedUser={user} onEdit={editComment} onDelete={deleteComment}/> </div>

          })}
            
        </div>
        {user!==null && <Link className='add-comment' to="/addComment" state={{user:user,id:id}}>Add Comments</Link>}
</>
    )
}

export default Comments
