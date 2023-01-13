import React,{useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import addPostSchema from '../../../../Schemas/addPostSchema.jsx';
import { useFormik } from "formik";
import './AddPost.css'
const initialValues = {
    title: "",
    body: "",

};
function AddPost() {
    const location = useLocation();
    const navigate=useNavigate();
    const {id}=location.state;
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: addPostSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values, action) => {
                const {title,body}=values;
                action.resetForm();
                const posts=JSON.parse(localStorage.getItem("posts"))
                posts.unshift({ "userId":id , "id": posts.length + 1, "title": title, "body": body })
                localStorage.setItem("posts", JSON.stringify(posts))
                navigate("/")


            },
        });
        const [toast, setToast] = useState(false)

    return (
        <div className="container .add-post-container">

            <h1 className="heading-text">Login at SocialBook</h1>


            <h1 className='add-post-container-title'>Add Post</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="inputName" className="col-4 col-form-label">Title</label>
                    <div className="col-8">
                        <input type="text" className="form-control" name="title" id="title" placeholder="Title"
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

export default AddPost
