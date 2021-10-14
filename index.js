// const express = require("express");
import express from 'express';
import  Mongoose  from "mongoose";
import TodoModel from './schemas/todo_schema.js';
const app = express();
//
app.use(express.json());
const port = 3000;

Mongoose.connect('mongodb+srv://sammy0288:sammy0288@cluster0.68gyj.mongodb.net/todo_db?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Connected to MonogoDB');
}).catch((err)=>{
    console.log(err);
});


// app.get("/", (req, res) =>
//   res.json({
//     message: "welcome to the todo API",
//   }).status(200)
// );
//chag

app.get("/", (req, res) => {
    return res.status(200).json({
        message: 'Welcome to the todo API.'
    })
})

// getting all todo
app.get("/todo", async(req, res) => {
    const todoModel = await TodoModel.find({});
    if(todoModel){
        return res.status(200).json({
            status:true,
            message: 'Todos fetched successfully',
            data: todoModel
        })
    }else{
        return res.status(400).json({
            status:false,
            message: 'Todos not found'
        })
    }
    })
// get specific todo by id
app.get("/todo/:id",async (req, res) => {
    const {id} = req.params;

    const todoModel = await TodoModel.findById(id);
    if(todoModel){
        return res.status(200).json({
            status:true,
            message: 'Todos fetched successfully',
            data: todoModel
        })
    }else{
        return res.status(400).json({
            status:false,
            message: 'Todos not found'
        })
    }
})
// creating todo
app.post("/todo", async(req, res) => {
    const {title,description,date_time, status} = req.body;

    const todoModel = await TodoModel.create({
        title,
        description,
        date_time,
        status
    })
        if(todoModel){
            return res.status(201).json({
                status:true,
                message: 'Todos created',
                data: todoModel
            })
        }else{
            return res.status(400).json({
                status:false,
                message: 'Todos failed to create'
            })
        }
    })
//updating
app.patch("/todo/:id", async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;

    const todoModel = await TodoModel.updateOne({status: status}).where({_id: id});
    if(todoModel){
        return res.status(200).json({
            status:true,
            message: 'Todos marked as completed!',
            data: todoModel
        })
    }else{
        return res.status(400).json({
            status:false,
            message: 'Todos failed to update'
        })
    }
})
app.listen(port, () => console.log(`Example app listening on port ${port}`));
