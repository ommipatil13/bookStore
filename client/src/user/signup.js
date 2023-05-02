import React , { useState } from "react";
import Base from "../core/base";
import {Link} from "react-router-dom";
import { signup } from "../auth/helper/index";



const SignUp = () => {

    const [ values , setValues] = useState({
        name: "",
        email:"",
        password:"",
        success: false,
        error:""
    });

    const { name , email , password , success , error} = values;

    const handleChange = name => event => {
        setValues( {...values , error: false , [name]: event.target.value});
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values , error: false});

        signup({ name , email , password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error , success:false});
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                })
            }
        })
        .catch(err => console.log("Sign Up Failed"))
    }


    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-start">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" onChange={handleChange("name")} type="text" value={name}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type="email" value={email}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")} type="password" value={password}></input>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success mt-2">Submit</button>

                    </form>
                </div>
    
            </div>
        )
    }

    const onSuccess = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-start">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        New account was created. Please visit <Link to="/signin">here</Link> to sign in
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-start">
                    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <Base foot = "signUp page">
            {onSuccess()}
            {errorMessage()}
            {signUpForm()}
            <p>{JSON.stringify(values)}</p>
        </Base>
    )
}

export default SignUp;