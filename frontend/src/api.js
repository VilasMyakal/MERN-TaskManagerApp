const { API_URL } = require("./utils");

export const CreateTask = async (taskObj)=>{

    const URL = `${API_URL}/createTask`;
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(taskObj)
    };

    try{
        
        const result = await fetch(URL,options);
        const data = await result.json();

        return data;

    }catch(err){
        return err;
    }


}

export const FetchAllTasks = async ()=>{

    try{

        const URL = `${API_URL}/createTask`;
        const options = {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        };

        const result = await fetch(URL,options);
        const data = await result.json();

        return data;

    }catch(err){
        return err;
    }

}


export const DeleteTaskById = async (id)=>{

    try{

        const URL = `${API_URL}/createTask/${id}`;
        const options = {
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        };

        const result = await fetch(URL,options);
        const data = await result.json();

        return data;

    }catch(err){
        return err;
    }

}

export const UpdateTaskById = async (id,taskObj)=>{

    try{

        const URL = `${API_URL}/createTask/${id}`;
        const options = {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
        };

        const result = await fetch(URL,options);
        const data = await result.json();

        return data;

    }catch(err){
        return err;
    }

}