import React,{useState,useEffect} from 'react'
import './PostCard.css'
import addPostSchema from '../../../Schemas/addPostSchema';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
function PostCard(props) {
    const [disable, setDisable] = useState(true)
    const {post,authenticatedUser,onEdit,onDelete}=props;
    const {userId,id,title,body}=post
    const navigate=useNavigate()
   function showComments() {

        navigate('/comments',{state:{id:id,user:authenticatedUser}})    
   }
   const initialValues={title: title, body: body}
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            enableReinitialize:true,
            initialValues,
            validationSchema: addPostSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values, action) => {
                const {title,body}=values;
                onEdit(id,title,body)
            setDisable(true);

                console.log(values);
            },
        });
        function editPost(){
            setDisable(false);
        }
        function deletePost(){
            onDelete(id)

        }
        
    return (
        <div className="card post-card">
            <div className="card-body">

            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                     <div className="col-12">
                        <textarea type="text" disabled={disable} rows="3" className="form-control" name="title" id="title" placeholder="Title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.title && errors.title ? (
                            <p className="form-error">{errors.title}</p>
                        ) : null}

                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-12">
                        <textarea type="text" disabled={disable} rows="8" className="form-control" name="body" id="body" placeholder="Body"
                            value={values.body}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.body && errors.body ? (
                            <p className="form-error">{errors.body}</p>
                        ) : null}
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="offset-sm-4 col-sm-8">
                        {disable==false && <button type="submit" className="btn btn-primary">Edit</button>}
                    </div>
                </div>
            </form>
               { authenticatedUser!=null && id>100  && userId==authenticatedUser.id ? <img src="https://img.icons8.com/ios-glyphs/100/null/pencil--v1.png" onClick={editPost} /> : null }
               { authenticatedUser!=null && id>100  && userId==authenticatedUser.id ? <img src="https://img.icons8.com/windows/32/null/delete-forever.png" onClick={deletePost} /> : null }
            </div>
            <div className="comment-icon">
            <img  src="https://img.icons8.com/material-outlined/96/null/comments--v2.png" onClick={showComments}/>

            </div>
        </div>
    )
}

export default PostCard
