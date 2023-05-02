import React, { useState } from "react";
import Base from "../core/base"
import { isAuthenticated } from "../auth/helper";
import { createProduct } from "./helper/adminApiCall";



const AddProduct = () => {

    const { user , token} = isAuthenticated();

    const[ values , setValues ] = useState({
        title: "",
        author: "",
        loading: false,
        error: "",
        createdProduct: "",
        getARedirect:""
    }
    );

    const { title , author , loading, error, createdProduct, getARedirect} = values;


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {

    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    createProduct( user._id , token , {title ,author})
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
            setValues({
                ...values , 
                title: "",
                author:"",
                loading: false,
                error: "",
                createdProduct: data.title,
                getARedirect:""

            })
        }
      })
      .catch(err => console.log("failed"));
    };

    const successMessage = () => {
        return (
            <div className="alert alert-info" style={ { display: createdProduct ? "" : "none"}}>
              <h2>{createdProduct} created successfully</h2>
            </div>
          
        );
      };
    
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-start">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };


    const createProductForm = () => {
        return (
            <div className="row">
              <div className="col-md-6 offset-sm-3 text-start">
                <form>
                  <div className="form-group">
                    <label className="text-light">Title</label>
                    <input
                      onChange={handleChange("title")}
                      value={title}
                      className="form-control"
                      placeholder="Ex. Your Lie in April"
                      type="text"
                    />
                  </div>
      
                  <div className="form-group">
                    <label className="text-light">Author</label>
                    <input
                      onChange={handleChange("author")}
                      value={author}
                      className="form-control"
                      placeholder="Ex.Naoshi Arakawa"
                      type="text"
                    />
                  </div>
                  <button onClick={onSubmit} className="btn btn-info btn-block mt-2">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          );
    }

    return (
        <Base className="container bg-success p-4 rounded">
            <div className="row">
                <div className="col-8 offset-2 bg-success">
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                </div>
                
            </div>
        </Base>
    )
};

export default AddProduct;
