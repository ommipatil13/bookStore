import React from "react";
import Menu from "./menu";
import "../style.css"

const Base = ({ 
    foot = "footer",
    className = "text-white p-3 m-3 text-center",
    children}) => (

    <div className="homePage">
        <Menu />
        <div className={className}>{children}</div>
        <footer>
        <div className="footer bg-dark text-white p-3 text-center ">{foot}</div>
        </footer>
    </div>
)
export default Base;