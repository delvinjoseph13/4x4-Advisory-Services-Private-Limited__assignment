import { useEffect, useState } from "react";
import { getUser } from "../auth";
import API from "../api";

function AssociateDashboard(){
    
    const [tasks,setTasks]=useState([]);
    const [error,setError]=useState([])
    const [form,setForm]=useState({
        taskId:'',actualHours:''
    })
    const user=getUser();

    const fetchData=async()=>{
        try {
         const res=await API.get('/tasks/my'); 
         
         setTasks(res.data.tasks) 
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
        }


    }

    useEffect(()=>{
        fetchData();

    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await API.post('/timesheet/',form);
        setTasks(prev=>prev.filter(t=>t._id !==form.taskId))
        setForm({
            taskId:'',
            actualHours:''
        })
        } catch (error) {
            console.log("Error")
            alert(error.response.data.message)
            
        }
        
    }

    const handleChanges=(e)=>{
        const {name,value}=e.target;
        setForm(prev=>({
            ...prev,
            [name]:value
        }))
    }
    
    return (    
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Associate Dashboard</h2>
                <h3 className="text-lg font-medium mb-2">My Tasks</h3>
                {error && <p className="text-red-500 mb-2 font-sm">{error}</p>}
                <ul className="mb-6 space-y-1">
                    {
                        tasks.map(t=>(
                            <li key={t._id} className="border p-2 rounded">
                                {t.description} ({new Date(t.date).toLocaleDateString()})
                            </li>
                        ))
                    }

                </ul>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <select 
                 name="taskId"
                 value={form.taskId} 
                 onChange={handleChanges}
                 className="px-3 py-2 border rounded"
                 required
                 >
                    <option value="" disabled>Select Task</option>
                    {
                        tasks.map(t=>(
                            <option key={t._id} value={t._id}>{t.description}</option>
                        ))
                    }

                 </select>

                 <input 
                 type="number"
                 placeholder="Actual Hours"
                 value={form.actualHours} 
                 name="actualHours"
                 onChange={handleChanges}
                 className="px-3 py-2 border rounded"
                 required/>

                 <button type="submit"
                 className="col-span-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Submit Timesheet
                 </button>
                </form>
            </div>
        </div>
    )
}

export default AssociateDashboard;