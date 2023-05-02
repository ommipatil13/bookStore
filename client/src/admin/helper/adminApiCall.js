import {API} from "../../backend"

export const createProduct = ( userId , token , product) => {

    return fetch( `${API}product/create/${userId}` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
};

export const getProducts = async () => {
    try {
        const response = await fetch(`${API}products`, {
            method: "GET"
        }).then( response => response.json())
        return response;
    } catch (err) {
        return console.log(err);
    }
}

export const updateProduct = ( productId, userId , token , product) => {

    return fetch( `${API}product/${productId}/${userId}` , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
};

export const deleteProduct =  ( productId, userId , token ) => {

        return fetch(`${API}product/${productId}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then( response => response.json())
        .catch( err => console.log("Unable to delete"))

        
};