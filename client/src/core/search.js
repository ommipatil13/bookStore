import React, { useState } from "react";

const Search = ({data}) => {

    const[query , setQuery] = useState("");
    console.log(query)
    console.log(data)


    const search = () => (
        data.filter( (element) => { element.title.toLowerCase().includes(query) }).map(( element) => (<div key={data._id} className="search">
        <input type="text"  onChange={ (e) => { setQuery(e.target.value) }}></input>
    </div>))
    )

    return(
        <div>{search()}</div>

    )
}

export default Search;