import { toast } from "react-toastify";

export const API_URL = 'https://mern-task-manager-app-api-swart.vercel.app'

export const notify = (message,type) =>{

    toast[type](message);

};
