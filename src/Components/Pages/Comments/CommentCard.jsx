import React,{useState} from 'react'
import './CommentCard.css'
import addCommentSchema from '../../Schemas/addCommentSchema.jsx';
import { useFormik } from "formik";
import './AddComment.css'
function CommentCard(props) {
    const [disable, setDisable] = useState(true)

    const {comment,authenticatedUser,onEdit,onDelete}=props;
    const {postId,id,name,email,body}=comment;
    const initialValues = {
        name: name,
        body: body,
    
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            enableReinitialize:true,
            initialValues,
            validationSchema: addCommentSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values, action) => {
                const {name,body}=values;
                action.resetForm();
                console.log(name,body);
            setDisable(true);

                onEdit(postId,id,name,body)

            },
        });
    function deleteComment(){

        onDelete(postId,id)

    }
    function editComment(){
        setDisable(false);

    }
    return (
        <div className="card comment-card">
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <div className="col-12">
                        <textarea type="text" rows="3" disabled={disable} className="form-control" name="name" id="name" placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.name && errors.name ? (
                            <p className="form-error">{errors.name}</p>
                        ) : null}

                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-12">
                        <textarea type="text" rows="4" disabled={disable} className="form-control" name="body" id="body" placeholder="Body"
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
                        {disable==false && <button type="submit" className="btn btn-primary">Edit Comment</button>}
                    </div>
                </div>
            </form>

      <p>by</p>
      <p>{email}</p>
      { authenticatedUser!=null  && authenticatedUser.email==email ? <img src="https://img.icons8.com/ios-glyphs/100/null/pencil--v1.png" onClick={editComment} /> : null }
    { authenticatedUser!=null && authenticatedUser.email==email ? <img src="https://img.icons8.com/windows/32/null/delete-forever.png" onClick={deleteComment} /> : null }
  
            </div>
            </div>
    )
}

export default CommentCard
