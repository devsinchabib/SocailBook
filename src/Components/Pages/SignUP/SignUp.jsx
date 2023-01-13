import React,{useState} from 'react'
import './SignUp.css'
import { useFormik } from "formik";
import signupSchema from "../../Schemas/SignUpSchema.jsx"
import Toast from '../Generic/Toast';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    };
    const navigate=useNavigate();
    const [toast, setToast] = useState(false)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: signupSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values, action) => {
                action.resetForm();


                const {name,email, password}=values;

                let users = JSON.parse(localStorage.getItem('users'));
                if (users) {
                    const user = users.filter((value) => {
                        if (value.email === email) {
                            return value;
                        }
                    })
                    if (user.length > 0) {

                        setToast(true)

                    } else {
                        users.push({ id: users.length, email: email, name: name, password: password })
                        localStorage.setItem('users', JSON.stringify(users));
                        navigate('/Login')


                    }



                } else {
                    localStorage.setItem('users', JSON.stringify([{ id: 0, email: email, password: password, name: name }]));
                    navigate('/Login')

                }
            },
        });
    return (
        <div className="container sign-up">
            {toast && <Toast message="Already user exist with this email" set={setToast}/>}

            <h1 className="heading-text">Register Yourself at SocialBook</h1>

            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="inputName" className="col-4 col-form-label">Name</label>
                    <div className="col-8">
                        <input type="text" className="form-control" name="name" id="name" placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {touched.name && errors.name ? (
                            <p className="form-error">{errors.name}</p>
                        ) : null}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputName" className="col-4 col-form-label">Email</label>
                    <div className="col-8">
                        <input type="email" className="form-control" name="email" id="email" placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email ? (
                            <p className="form-error">{errors.email}</p>
                        ) : null}

                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputName" className="col-4 col-form-label">Password</label>
                    <div className="col-8">
                        <input type="password" className="form-control" name="password" id="password" placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.password && errors.password ? (
                            <p className="form-error">{errors.password}</p>
                        ) : null}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputName" className="col-4 col-form-label">Confirm Password</label>
                    <div className="col-8">
                        <input type="password" className="form-control" name="confirm_password" id="confirm_password" placeholder="Confirm Password"
                            value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.confirm_password && errors.confirm_password ? (
                            <p className="form-error">{errors.confirm_password}</p>
                        ) : null}
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="offset-sm-4 col-sm-8">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default SignUp
