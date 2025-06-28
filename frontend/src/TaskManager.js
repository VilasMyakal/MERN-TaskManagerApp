import React, { useEffect, useState } from "react";
import {FaCheck, FaPen, FaPlus, FaSearch, FaTrash} from "react-icons/fa"
import {ToastContainer} from 'react-toastify';
import {CreateTask, DeleteTaskById, FetchAllTasks, UpdateTaskById} from './api'
import { notify } from "./utils";

function TaskManager(){

    const [inputValue, setInputValue] = useState('');
    const [Tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask,setUpdateTask] = useState(null);

    const handleAddTask = async ()=>{
        const obj = {   
            taskName:inputValue,
            isDone : false
        }

        try{

            const {success,message} = await CreateTask(obj);
            if(success){
                notify(message,'success');
            }
            else{
                notify(message,'error');
            }

            fetchAllTasks();
            setInputValue('')

        }catch(err){
            console.error(err);
            notify('Failed to create task','error');
        }
    }

    const fetchAllTasks = async ()=>{

        try{

            const {data} = await FetchAllTasks();

            setTasks(data);
            setCopyTasks(data);

        }catch(err){
            console.error(err);
            notify('Failed to Fetch All Tasks','error');
        }

    }
    

    useEffect(() => {
      fetchAllTasks();
    }, [])
    

    const handleCheckUnCheck = async (item) =>{

        const {_id,taskName,isDone} = item;

        const obj = {
            taskName,
            isDone: !isDone
        }

        try{

            const data = await UpdateTaskById(_id,obj);

            console.log(data);
            fetchAllTasks();

        }catch(err){
            console.error(err);
        }

    }


    const handleDeleteTask = async (id) =>{

        try{

            const {success,message} = await DeleteTaskById(id);

            if(success){
                notify(message,'success');
            }
            else{
                notify(message,'error');
            }

            fetchAllTasks();

        }catch(err){
            console.error(err);
            notify('Failed to Fetch All Tasks','error');
        }


    }


    useEffect(() => {
      
        if(updateTask){
            setInputValue(updateTask.taskName);
        }

    }, [updateTask])
    

    const handleTask = ()=>{

        if(updateTask && inputValue){

            const obj = {
                taskName : inputValue,
                isDone : updateTask.isDone
            }

            updateTaskComplete(updateTask._id,obj);
            
        }else if(updateTask === null && inputValue){
            handleAddTask();
        }


    }

    const updateTaskComplete = async (id,updateTaskObj)=>{

        try{

            const {success,message} = await UpdateTaskById(id,updateTaskObj);

            if(success){
                notify(message,'success');
            }
            else{
                notify(message,'error');
            }

            fetchAllTasks();
            setInputValue('');
            setUpdateTask(null);

        }catch(err){
            console.error(err);
        }
    }

    const handleSearch = (e) =>{
        const term = e.target.value.toLowerCase();

        const oldTasks = [...copyTasks];

        const result = oldTasks.filter((item)=> item.taskName.toLowerCase().includes(term))
        setTasks(result);
    }


    return (
        <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
            <h1 className="mb-4">Task Manager App</h1>
            {/* Input and Search Box */}
            <div className="d-flex justify-content-between w-100 m-4 align-items-center">
                <div className="input-group flex-grow-1 me-2">
                    <input type="text" placeholder="New Task" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} className="form-control me-2"/>
                    <button className="btn btn-success me-1 btn-sm" onClick={handleTask} ><FaPlus className="m-2"/></button>
                </div>
                <div className="input-group flex-grow-1">
                    <span className="input-group-text"><FaSearch/></span>
                    <input type="text" onChange={(e)=>{handleSearch(e)}}
                        className="form-control"
                        placeholder="Search Task"
                    />
                </div>
            </div>

            {/* List of Tasks */}
            <div className="d-felx felx-column w-100">
                
                {
                    Tasks.map((item)=>(
                        <div className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center">

                            <span className={item.isDone ? "text-decoration-line-through" : ''}>{item.taskName}</span>
                            <div className="">

                                <button className="btn btn-sm btn-success me-1" onClick={()=>{handleCheckUnCheck(item)}} type="button"><FaCheck/></button>
                                <button className="btn btn-sm btn-primary me-1" onClick={()=>{setUpdateTask(item)}} type="button"><FaPen/></button>
                                <button className="btn btn-sm btn-danger" onClick={()=>{handleDeleteTask(item._id)}} type="button"><FaTrash/></button>

                            </div>

                        </div>  
                    ))
                }

            </div>

            {/* Toastify Content */}

            <ToastContainer
                position="top-right"
                hideProgressBar={false}
                autoClose={2000}
            />

        </div>
    );

}

export default TaskManager;