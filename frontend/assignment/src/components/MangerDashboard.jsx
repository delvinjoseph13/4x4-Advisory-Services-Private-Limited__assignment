import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function ManagerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [timesheets, setTimesheets] = useState([]);
  const [associates, setAssociate] = useState([]);
  const [form, setForm] = useState({
    associateId: '',
    description: '',
    estimatedHours: '',
    date: ''
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const ts = await API.get('/timesheet/all');
      setTimesheets(ts.data.timesheets || []);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
      alert("Could not fetch timesheets.");
    }
  };

  const fetchUsers = async () => {
    try {
      const associates = await API.get('all/associates');
      setAssociate(associates.data.associates || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const task = await API.get('/tasks/all');
      setTasks(task.data.allTasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsers();
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', form);
      setForm({ associateId: '', description: '', estimatedHours: '', date: '' });
      fetchData();
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Manager Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow"
          >
            Logout
          </button>
        </div>

        {/* Task Assignment Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <select
            name="associateId"
            value={form.associateId}
            onChange={handleChanges}
            className="px-3 py-2 border border-gray-300 rounded-md"
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
            placeholder="Task Description"
            value={form.description}
            name="description"
            onChange={handleChanges}
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          />

          <input
            placeholder="Estimated Hours"
            type="number"
            value={form.estimatedHours}
            name="estimatedHours"
            onChange={handleChanges}
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChanges}
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          />

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            Assign Task
          </button>
        </form>

        {/* All Tasks */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">All Tasks</h3>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks available.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map(t => (
                <li key={t._id} className="border p-3 rounded bg-gray-50 shadow-sm">
                  <div className="text-gray-800 font-medium">{t.description}</div>
                  <div className="text-sm text-gray-600">👤 {t.associate?.email || "Unknown"} | ⏱ {t.estimatedHours}h</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* All Submitted Timesheets */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Submitted Timesheets</h3>
          {timesheets.length === 0 ? (
            <p className="text-gray-500">No timesheets submitted yet.</p>
          ) : (
            <ul className="space-y-2">
              {timesheets.map(ts => (
                <li key={ts._id} className="border p-3 rounded bg-white shadow-sm">
                  <span className="font-medium text-gray-800">
                    {ts.associate?.email || "Unknown"}
                  </span>{" "}
                  — <span className="text-gray-700">{ts.task?.description || "No task"}</span>:{" "}
                  <span className="text-blue-600 font-semibold">{ts.actualHours}h</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default ManagerDashboard;
