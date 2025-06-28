const TaskModel = require("../Models/TaskModel");

const createTask = async (req,res)=>{

    const data = req.body;
    try{
        
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({message:"Task Created",success:true});

    }catch(err){

        res.status(500).json({message:"Failed to create Task",success:false});

    }
    

};

const fetchAllTask = async (req,res)=>{

    try{

        const data = await TaskModel.find({});
        res.status(200).json({message:"Fetched All Data",success:true,data});
        
    }catch(err){

        res.status(500).json({message:"Failed to Fetch All Task",success:false});

    }
};

const updateTaskById = async (req,res)=>{

    try{

        const id = req.params.id;
        const data = req.body;

        const obj = {$set : {...data}};

        await TaskModel.findByIdAndUpdate(id,obj);
        res.status(200).json({message:"Task Updated",success:true});
        
    }catch(err){

        res.status(500).json({message:"Failed to Update Task",success:false});

    }
};

const deleteTaskById = async (req,res)=>{

    try{

        const id = req.params.id;

        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({message:"Task Deleted",success:true});
        
    }catch(err){

        res.status(500).json({message:"Failed to Delete Task",success:false});

    }
};


module.exports = {createTask,fetchAllTask,updateTaskById,deleteTaskById};