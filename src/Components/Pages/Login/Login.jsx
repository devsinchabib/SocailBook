import React,{useState,useEffect} from 'react'
import loginSchema from '../../Schemas/LoginSchema';
import Toast from '../Generic/Toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import './Login.css'
function Login() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users) {
            setUsers(users);
        }
    }, []);
    const initialValues = {
        email: "",
        password: "",

    };
    const navigate=useNavigate();
    const [toast, setToast] = useState(false)
    const [message,setMessage]=useState("")
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: loginSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values, action) => {
                action.resetForm();

                const {email,password}=values;
                console.log(email,password);

                if (users.length === 0) {
                    setMessage("No user exist first signup")

                    setToast(true)
        
                } else {
                    const user = users.filter((value) => {
                        if (value.email === email) {
                            return value;
                        }
                    })
                    if (user.length > 0) {
                        if (user[0].password === password) {

                            localStorage.setItem('user',JSON.stringify(user[0]));
                            navigate(`/`)
        
                        } else {
                    setToast(true)

                    setMessage('Please enter correct password')
                        }
        
                    } else {
                        setToast(true)
                        setMessage("User do not exist with this email")
        
                    }

                }
                
            },
        });

    return (
        <div className="container log-in">

            <h1 className="heading-text">Login at SocialBook</h1>
            {toast && <Toast message={message} set={setToast}/>}


            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
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
                    <div className="offset-sm-4 col-sm-8">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Login
