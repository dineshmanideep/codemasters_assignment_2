import React from 'react';

const Task = (s) => {
  return (
    <div className="bg-slate-500 flex justify-center rounded-md p-4 gap-3">
      <div
        className="bg-white text-black rounded-lg p-3 flex-auto"
        style={{
          textDecoration: s.isCompleted ? "line-through" : "none",
        }}
      >
        {s.task}
      </div>

      <div className="form-control flex-initial">
        <label className="cursor-pointer label">
          <input
            type="checkbox"
            name={s.id}
            checked={s.isCompleted} 
            onChange={s.handleCheck}
            className="checkbox checkbox-info"
          />
        </label>
      </div>
      <div className="flex-initial">
        <button
          className="btn btn-outline btn-info"
          onClick={(e) => {
            s.handleEdit(e, s.id);
          }}
        >
          Edit
        </button>

        <button
          className="btn btn-outline btn-error"
          onClick={(e) => {
            s.handleDelete(e, s.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
