import React, { useEffect, useState } from "react";
import Base from "./base";
import Card from "./card";
import { getProducts } from "./helper/coreApiCalls";
import Search from "./search";



const Home = () => {
    const[products , setProducts] = useState([]);

    const[ error , setError ] = useState(false);

    const loadAllProducts = () => {
        getProducts()
        .then( data => {
            if(data.error){
                setError(data.error);
            } else{
                setProducts(data);
            }
        })
    }

    useEffect(() => {
        loadAllProducts();
    },[])

    
    return(
        <Base>
            <div className="row">
                <Search data={products}/>
                {products.map( ( product , index) => {

                        return(
                            <div key={index} className="col-3">
                                <Card product = {product}/>
                            </div>
                              )
                    })
                }

            </div>

        </Base>
        );
}

export default Home;