import { useState } from "react";
import API from "../api";
import { useEffect } from "react";

function MangerDashboard(){

    const [tasks,setTasks]=useState([]);
    const [timesheets,setTimesheets]=useState([])
    const [form,setForm]=useState({
         associateId: '', 
         description: '',
         estimatedHours: '',
        date: '' 
    })

    const fetchData=async()=>{
        const t=await API.get('/tasks/all');
        const ts=await API.get('/timesheet/all')
        setTasks(t.data.tasks);
        setTimesheets(ts.data.timesheets)

    }

    useEffect(()=>{
        fetchData();
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        try {
            await API.post('/tasks',form);
            setForm({associateId: '', description: '', estimatedHours: '', date: ''});
            fetchData();
        } catch (error) {
            console.log(error);            
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
                <h2 className="text-xl font-semibold mb-4">Manager Dashboard</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    placeholder="Associate ID"
                    value={form.associateId}
                    name="associateId"
                    onChange={handleChanges}
                    className="px-3 py-2 border rounded"
                    required
                    />

                    <input
                    placeholder="Description"
                    value={form.description}
                    name="description"
                    onChange={handleChanges}
                    className="px-3 py-2 rounded border"
                    required
                    />

                    <input
                    placeholder="Estimated Hours"
                    type="number"
                    value={form.estimatedHours}
                    name="estimatedHours"
                    onChange={handleChanges}
                    className="px-3 py-2 border rounded"
                    required
                    />

                    <input 
                    type="date" 
                    name="date"
                    value={form.date}
                    onChange={handleChanges}
                    className="px-3 py-2 border rounded"
                    required/>

                    <button 
                    type="submit"
                    className="col-span-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >Assign Task</button>

                </form>

                <h3 className="text-lg font-semibold mb-2">All Tasks</h3>
                <ul className="mb-6 space-y-1">
                    {tasks.map(t=>(
                        <li key={t._id} className="border p-2 rounded">
                            {t.description} → {t.associate.username}
                        </li>
                    ))}

                </ul>

                <h3 className="text-lg font-semibold mb-2">Submitted TimeSheets</h3>
                <ul className="space-y-1">
                    {
                        timesheets.map(ts=>(
                            <li key={ts._id} className="border p-2 rounded">
                                <span className="font-medium">{ts.associate.username}</span> — {ts.task.description}: {ts.actualHours} h
                            </li>
                        ))

                    }
                </ul>

            </div>
        </div>
    )
}

export default MangerDashboard;