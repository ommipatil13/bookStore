const express = require("express");
const mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
        maxlength: 32
    }
} , {timestamps: true})

module.exports = mongoose.model( "Product" , bookSchema);