import React from "react";
import { Route , BrowserRouter as Router } from "react-router-dom";
import Home from "./core/home"
import SignIn from "./user/signin";
import SignUp from "./user/signup";
import AdminDashboard from "./user/admindashboard";
import AdminRoute from "./auth/helper/adminRoute";
import AddProduct from "./admin/addProduct";
import ManageProduct from "./admin/manageProduct";

const AllRoutes = () => {
    return(
    <Router>

            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <AdminRoute  exact path="/admin/dashboard" component={AdminDashboard}></AdminRoute>
            <AdminRoute  exact path="/admin/create/product" component={AddProduct}></AdminRoute>
            <AdminRoute  exact path="/admin/manage" component={ManageProduct}></AdminRoute>





    </Router>
    );
}


export default AllRoutes;