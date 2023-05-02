import React, { useEffect, useState } from "react";
import Base from "../core/base"
import { isAuthenticated } from "../auth/helper/index";
import { getProducts, deleteProduct } from "./helper/adminApiCall";



const ManageProduct = () => {

    const[ products , setProducts ] = useState([]);

    const[ error , setError ] = useState("");

    const { user , token } = isAuthenticated();

    const preload = () => {
        getProducts().then( data => {
            if(data.error){
                setError(data.error);
            }else{
                setProducts(data);
            }
        })
    };

    useEffect( () => {
        preload();
    } , [])

    const deleteThisProduct = (productId) => {
        deleteProduct( productId , user._id , token )
        .then( data => {
            if(data.error){
                setError(data.error);
            }else{
                preload();
            }
        })
    };

    return (
        <Base>
        <div className="text-white">
           <div className="row ">
             <div className="col-12">
                <h3>All Products</h3>

                {products.map(( product , index ) => {
                    return(
                        <div key={index} className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3 bg-success rounded m-3 p-3 ">
                                    Title: {product.title}
                                </div>
                                <div className="col-3 bg-success rounded m-3 p-3 ">

                                Author Name: {product.author}

                                </div>

                            </div>
                        </div>
                        <div className="col-6">
                            <button onClick={()=> {
                                deleteThisProduct(product._id)
                            }} className="btn btn-danger m-3 p-3">
                                Delete
                            </button>
                        </div>
                    </div>
                    )
                })}
             </div>
           </div>
        </div>
        </Base>
    )
};

export default ManageProduct;
