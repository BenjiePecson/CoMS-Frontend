import React from "react";

const addTask = () => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Add Task</h3>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Task Name </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-sm w-full"
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Task Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
          ></textarea>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Workflow </span>
          </div>{" "}
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={colorOptions[0]}
            name="color"
            options={colorOptions}
          />{" "}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Checklist</span>
          </div>
          <Select
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Target Date </span>
          </div>
          <input type="date" className="input input-bordered input-sm w-full" />
        </label>

        <div className="mt-5 flex justify-end">
          <button className="btn btn-sm bg-[#273069] text-white mx-1">
            Add
          </button>

          <button className="btn btn-sm mx-1">Cancel</button>
        </div>
      </div>
    </dialog>
  );
};

export default addTask;
