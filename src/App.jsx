import './App.css';
import Task from './Task';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleEdit = (e, id) => {
    let t = list.filter((item) => item.id === id);
    setTask(t[0].task);
    let newlist = list.filter((item) => item.id !== id);
    setList(newlist);
  };

  const handleAdd = () => {
    // Prevent adding empty tasks
    if (task.trim() !== "") {
      setList([...list, { id: uuidv4(), task, isCompleted: false }]);
      setTask(""); // Clear input field after adding the task
    }
  };

  const handleDelete = (e, id) => {
    let newlist = list.filter((item) => item.id !== id);
    setList(newlist);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCheck = (e) => {
    const id = e.target.name;
    const isChecked = e.target.checked;
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: isChecked };
      }
      return item;
    });
    setList(updatedList);
  };

  const filteredList = list.filter((item) => {
    const matchesSearch = item.task.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && item.isCompleted) ||
      (filter === "Pending" && !item.isCompleted);

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="flex flex-col gap-5 p-9 m-7">
        <div className="flex justify-center text-white text-3xl">
          <h1>Task Manager</h1>
        </div>
        <div className="flex justify-center gap-3">
          <input
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Add Task"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-outline btn-accent" onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className="flex justify-center gap-1 join">
          <div>
            <div>
              <input
                className="input input-bordered join-item"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search"
              />
            </div>
          </div>
          <select
            className="select select-bordered join-item"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        {filteredList.length === 0 ? (
          <h1 className="text-center m-7">No Task Found</h1>
        ) : (
          filteredList.map((item) => (
            <Task
              task={item.task}
              handleCheck={handleCheck}
              id={item.id}
              isCompleted={item.isCompleted}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              key={item.id} 
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
