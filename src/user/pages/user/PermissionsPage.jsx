import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { showToast } from "../../../assets/global";
import Swal from "sweetalert2";
import Breadcrumbs from "../../components/Breadcrumbs";

const PermissionsPage = () => {
  const columns = [
    {
      name: "Permission Name",
      selector: (row) => row.permission_name,
    },
    {
      name: "Actions",
      selector: (row, rowIndex) => {
        return (
          <div className="flex flex-row justify-center item-center gap-2">
            <button
              onClick={() => {
                setFormData({ ...row, rowIndex });
                document.getElementById("editModal").showModal();
              }}
            >
              <svg
                width="44"
                height="37"
                viewBox="0 0 44 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44" height="37" rx="10" fill="#273069" />
                <path
                  d="M15 26H30M22.6849 13.357L25.042 11L29.1667 15.1248L26.8097 17.4818M22.6849 13.357L18.0127 18.0292C17.8564 18.1855 17.7686 18.3975 17.7686 18.6185V22.398H21.5483C21.7693 22.398 21.9812 22.3103 22.1375 22.154L26.8097 17.4818M22.6849 13.357L26.8097 17.4818"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                toggleDelete(row.permission_id);
              }}
            >
              <svg
                width="44"
                height="37"
                viewBox="0 0 44 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44" height="37" rx="10" fill="#CF0404" />
                <path
                  d="M28.3333 17.667V25.5003C28.3333 25.7765 28.1095 26.0003 27.8333 26.0003H17.1667C16.8905 26.0003 16.6667 25.7765 16.6667 25.5003V17.667M20.8333 22.667V17.667M24.1667 22.667V17.667M30 14.3333H25.8333M25.8333 14.3333V11.5C25.8333 11.2239 25.6095 11 25.3333 11H19.6667C19.3905 11 19.1667 11.2239 19.1667 11.5V14.3333M25.8333 14.3333H19.1667M15 14.3333H19.1667"
                  stroke="white"
                  strokeWidth="1.95694"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        );
      },
    },
  ];

  const permission = {
    permission_name: "",
  };

  const [permissions, setPermissions] = useState([]);
  const [filteredPermissions, setFilteredPermissions] = useState([]);

  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(permission);
  const [errors, setErrors] = useState(permission);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchComponent = () => {
    return (
      <label className="input input-bordered flex items-center gap-2 flex-row justify-between">
        <input
          type="text"
          className="input-sm w-full"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    );
  };

  const labelComponent = () => {
    return (
      <div className="poppins-bold text-color-2 text-[24px]">Permissions</div>
    );
  };

  const btnAddComponent = () => {
    return (
      <button
        className="btn bg-primary text-white"
        onClick={() => {
          document.getElementById("addModal").showModal();
        }}
      >
        Add
      </button>
    );
  };

  const fetchPermissions = async () => {
    try {
      let response = await axios.get(`permissions`);
      setPermissions(response.data.permissions);
      setFilteredPermissions(response.data.permissions);
    } catch (error) {
      console.log(error);
    }
  };

  //toggle button for submit
  const handleSubmit = async (e, isEdit) => {
    e.preventDefault();

    setIsSubmitting(true);

    //checks if the form is valid
    if (await isFormValid(isEdit)) {
      if (isEdit) {
        //update function

        let status = "error";
        let message = "Error updating the record.";

        try {
          let response = await axios.patch(
            `/permissions/${formData.permission_id}`,
            formData
          );

          if (response.data.success) {
            let data = response.data.result[0];

            let result = {
              permission_id: data.permission_id,
              permission_name: data.permission_name,
            };

            let permissionsTemp = permissions.map((permission, idx) => {
              if (permission.permission_id == result.permission_id) {
                return result;
              }
              return permission;
            });
            setPermissions(permissionsTemp);
            setFilteredPermissions(permissionsTemp);

            status = "success";
            message = "Record updated successfully!";
          }
        } catch (error) {
          status = "error";
          message = "Error updating the record";
          console.error("Error updating the record: ", error);
        } finally {
          showToast(status, message);
          document.getElementById("editModal").close();
          setFormData(permission);
        }
      } else {
        let status = "error";
        let message = "Error adding the record.";

        try {
          let response = await axios.post("/permissions", formData);
          if (response.status === 200) {
            let data = response.data.result[0];

            let added = {
              permission_id: data.permission_id,
              permission_name: data.permission_name,
            };
            setPermissions([added, ...permissions]);
            setFilteredPermissions([added, ...filteredPermissions]);

            status = "success";
            message = "Record was added successfully.";
          }
        } catch (error) {
          status = "error";
          message = "Error adding the record";
          console.error("Error adding record: ", error);
        } finally {
          document.getElementById("addModal").close();
          setFormData(permission);
          showToast(status, message);
        }
      }
    }
    setIsSubmitting(false);
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name == "permission_name") {
      if (e.target.value != "") {
        setErrors({ ...errors, permission_name: "" });
      } else {
        setErrors({
          ...errors,
          permission_name: "Permission Name is Required",
        });
      }
    }
  };

  const isFormValid = async (isEdit) => {
    let newErrors = {};

    if (formData.permission_name == "") {
      newErrors.permission_name = "Permission is Required";
    }

    setErrors({ ...errors, ...newErrors });

    return Object.keys(newErrors).length == 0;
  };

  const toggleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CF0404",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#B4B4B8",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let status = "error";
        let message = "Failed to delete the record.";
        try {
          let response = await axios.delete(`permissions/${id}`);
          if (response.data.success) {
            status = "success";
            message = "Record was deleted successfully. ";

            let permissionsTemp = permissions.filter(
              (permission, index) => permission.permission_id != id
            );

            setPermissions(permissionsTemp);
            setFilteredPermissions(permissionsTemp);
          }
        } catch (error) {
          console.log(error);
        } finally {
          showToast(status, message);
        }
      }
    });
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    let filter = permissions.filter((permission) => {
      if (search == "") {
        return permission;
      } else if (
        permission.permission_name
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      ) {
        return permission;
      }
    });

    setFilteredPermissions(filter);
  }, [search]);

  return (
    <>
      <div>
        <Breadcrumbs
          lists={[
            { goto: "/", text: "Home" },
            { goto: "/users", text: "User Management" },
            { goto: "", text: "Permissions" },
          ]}
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="flex flex-row w-full justify-between items-center">
            <div>{labelComponent()}</div>
            <div className="hidden md:flex">{searchComponent()}</div>
            <div>{btnAddComponent()}</div>
          </div>
          <div className="md:hidden">{searchComponent()}</div>
        </div>

        <div className="p-2 bg-white rounded-lg">
          <DataTable
            columns={columns}
            data={filteredPermissions}
            defaultSortFieldId={1}
            pagination
            persistTableHead={true}
          />
        </div>

        <dialog id="addModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg">Add New Permission</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-2">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Permission Name<span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.permission_name && `input-error`
                    }`}
                    name="permission_name"
                    value={formData.permission_name}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                  {errors.permission_name && (
                    <span className="text-[12px] text-red-500">
                      {errors.permission_name}
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  className="btn bg-primary text-white mt-2 flex flex-row gap-2 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog id="editModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg">Edit Permission</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-2">
              <form
                onSubmit={(e) => {
                  handleSubmit(e, true);
                }}
              >
                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Permission Name<span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.permission_name && `input-error`
                    }`}
                    name="permission_name"
                    value={formData.permission_name}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                  {errors.permission_name && (
                    <span className="text-[12px] text-red-500">
                      {errors.permission_name}
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  className="btn bg-primary text-white mt-2 flex flex-row gap-2 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default PermissionsPage;
