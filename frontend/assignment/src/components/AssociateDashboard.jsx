import { useEffect, useState } from "react";
import { getUser } from "../auth";
import API from "../api";
import { useNavigate } from "react-router-dom";

function AssociateDashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [selectDate, setSelectedDate] = useState("");
  const [error, setError] = useState([]);
  const [form, setForm] = useState({ taskId: "", actualHours: "" });
  const user = getUser();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await API.get("/tasks/my");
      setTasks(res.data.tasks);
      setFilteredTask(res.data.tasks);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/timesheet/", form);
      const updatedTasks = tasks.filter((t) => t._id !== form.taskId);
      setTasks(updatedTasks);

      const updatedFilteredTasks = filteredTask.filter((t) => t._id !== form.taskId);
      setFilteredTask(updatedFilteredTasks);

      setForm({ taskId: "", actualHours: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    const filtered = tasks.filter((t) => {
      const taskDate = new Date(t.date).toISOString().split("T")[0];
      return taskDate === date;
    });
    setFilteredTask(filtered);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const refreshFilteredData = () => {
    setSelectedDate("");
    setFilteredTask(tasks);
    setForm((prev) => ({ ...prev, taskId: "" }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl relative">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Associate Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow-sm"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Filter by Date:</label>
            <input
              type="date"
              value={selectDate}
              onChange={handleDateChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <button
            onClick={refreshFilteredData}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow-sm mt-1"
          >
            Clear Date
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">My Tasks</h3>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          {filteredTask.length === 0 ? (
            <p className="text-gray-500">No tasks for selected date.</p>
          ) : (
            <ul className="space-y-3 mb-6">
              {filteredTask.map((t) => (
                <li key={t._id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 shadow-sm">
                  <div className="text-gray-800 font-medium">{t.description}</div>
                  <div className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6 mt-6"
        >
          <select
            name="taskId"
            value={form.taskId}
            onChange={handleChanges}
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select Task
            </option>
            {filteredTask.map((t) => (
              <option key={t._id} value={t._id}>
                {t.description}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder=" Actual Hours"
            value={form.actualHours}
            name="actualHours"
            onChange={handleChanges}
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          />

          <button
            type="submit"
            className="col-span-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold"
          >
            Submit Timesheet
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssociateDashboard;
