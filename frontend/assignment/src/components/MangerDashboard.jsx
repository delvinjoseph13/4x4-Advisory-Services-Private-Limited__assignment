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

    const [associates,setAssociate]=useState([])
    console.log(tasks)
const fetchData = async () => {
  try {
    // const t = await API.get('/tasks/all');
    const ts = await API.get('/timesheet/all');
    console.log("timesheet",ts.data)


    setTimesheets(ts.data.timesheets || []);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Could not fetch data. Make sure there is at least one task or try again later.");
  }
};

const fetchUsers=async()=>{
    try {
        const associates = await API.get('all/associates');
        
        setAssociate(associates.data.associates || [])

    } catch (error) {
        console.log(error)
    }
}

const fetchTasks=async(req,res)=>{
    try {
        const task=await API.get('/tasks/all');
            console.log("Tasks response:", task.data);

        setTasks(task.data.allTasks || [])
    } catch (error) {
            console.error("Error fetching data:", error);

    }
}


    useEffect(()=>{
        fetchData();
        fetchUsers()
        fetchTasks()
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        try {
            await API.post('/tasks',form);
            setForm({associateId: '', description: '', estimatedHours: '', date: ''});
            fetchData();
            fetchTasks();
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

    useEffect(() => {
  console.log("User token:", localStorage.getItem("token"));
}, []);


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Manager Dashboard</h2>
                <form onSubmit={handleSubmit} >
                    {/* <input
                    placeholder="Associate ID"
                    value={form.associateId}
                    name="associateId"
                    onChange={handleChanges}
                    className="px-3 py-2 border rounded"
                    required
                    /> */}

                    <select
  name="associateId"
  value={form.associateId}
  onChange={handleChanges}
  className="px-3 py-2 border rounded"
  required
>
  <option value="" disabled>Select Associate</option>
  {associates.map(user => (
<option key={user._id} value={user._id}>
  {user.username || user.email}
</option>

  ))}
</select>


                    <input
                    placeholder="Description"
                    value={form.description}
                    name="description"
                    onChange={handleChanges}
                    className="px-3 py-2 rounded border gap-10"
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
                    className="col-span-full py-2 ml-4 px-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >Assign Task</button>

                </form>

<h3 className="text-lg font-semibold mb-2">All Tasks</h3>
{tasks.length === 0 ? (
  <p className="text-gray-500">No tasks available.</p>
) : (
  <ul className="mb-6 space-y-1">
    {tasks.map(t => (
      <li key={t._id} className="border p-2 rounded">
        {t.description} → {t.associate?.email || "Unknown"}
      </li>
    ))}
  </ul>
)}

<h3 className="text-lg font-semibold mb-2">Submitted TimeSheets</h3>
{timesheets.length === 0 ? (
  <p className="text-gray-500">No timesheets submitted yet.</p>
) : (
  <ul className="space-y-1">
    {timesheets.map(ts => (
      <li key={ts._id} className="border p-2 rounded">
        <span className="font-medium">{ts.associate?.email || "Unknown"}</span> — {ts.task?.description || "No task"}: {ts.actualHours} h
      </li>
    ))}
  </ul>
)}


            </div>
        </div>
    )
}

export default MangerDashboard;