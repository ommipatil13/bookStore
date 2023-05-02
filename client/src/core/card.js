import React from "react";

const Card = ({product}) => {

    const title = product ? product.title : "Book title";

    const author = product ? product.author : "Book author";

    return(
        <div className="card m-3">
            <div className="card-header">
                {title}
            </div>
            <div className="card-body">
                {author}
            </div>

        </div>
    )
};

export default Card;