import React,{useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import addCommentSchema from '../../Schemas/addCommentSchema.jsx';
import Toast from "../Generic/Toast"
import { useFormik } from "formik";
import './AddComment.css'
const initialValues = {
    name: "",
    body: "",

};
function AddComment() {
    const location = useLocation();
    const navigate=useNavigate();
    const {id,user}=location.state;
    const {email}=user
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: addCommentSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values, action) => {
                const {name,body}=values;
                action.resetForm();
                console.log(name,body);

                const comments=JSON.parse(localStorage.getItem(`commentsForPost${id}`))
                comments.unshift({ "postId":id , "id": comments.length + 1, "name": name,"email":email ,"body": body })
                localStorage.setItem(`commentsForPost${id}`, JSON.stringify(comments))
                navigate(-1)


            },
        });
        const [toast, setToast] = useState(false)

    return (
        <div className="container .add-comment-container">

            <h1 className="heading-text">SocialBook</h1>
            {toast && <Toast message="Post added Sucessfully!" set={setToast}/>}

            <h1 className='add-comment-container-title'>Add Comment on Post</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="inputName" className="col-4 col-form-label">Name</label>
                    <div className="col-8">
                        <input type="text" className="form-control" name="name" id="name" placeholder="Name"
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
                    <label htmlFor="inputName" className="col-4 col-form-label">Body</label>
                    <div className="col-8">
                        <input type="text" className="form-control" name="body" id="body" placeholder="Body"
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
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default AddComment
