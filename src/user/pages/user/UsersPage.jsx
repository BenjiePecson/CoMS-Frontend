import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { showToast } from "../../../assets/global";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useSelector } from "react-redux";
import Unathorized from "../../components/Unathorized";

const UsersPage = () => {

  const userSlice = useSelector((state) => state.user.user);

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      width: "20%"
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "15%"
    },
    {
      name: "Last Login",
      selector: (row) => row.last_login,
      sortable: true,
      width: "25%"
    },
    {
      name: "Status",
      selector: (row) => {
        let status = row.status;
        let element = (
          <div
            className={`${row.status == "Active" ? "text-success" : "text-error"
              } font-bold`}
          >
            {status}
          </div>
        );
        return element;
      },
      sortable: true,
      width: "15%"
    },
    {
      name: "Role",
      selector: (row) => {
        if (row.role.length == 0) return;
        return (
          <>
            <div className="flex flex-row gap-2">
              <div className="rounded-full px-4 bg-neutral text-white p-2">
                {row.role.length > 0 && row.role[0].role_name}
              </div>
            </div>
          </>
        );
      },
      width: "15%"
    },
    {
      name: "Actions",
      selector: (row, rowIndex) => {

        if (!userSlice.permissions.includes("Edit Users")) return;

        return (
          <div className="flex flex-row justify-center item-center gap-2">
            <button
              onClick={() => {
                setFormData(row);
                if (row.role.length > 0) {
                  setDefaultOptions({
                    value: row.role[0].role_id,
                    label: row.role[0].role_name,
                  });
                }
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
          </div>
        );
      },
      width: "10%"
    },
  ];

  const user = {
    status: "",
    email: "",
    role: [],
  };

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [options, setOptions] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);

  const [pageIsLoading, setPageIsLoading] = useState(true);

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
            `/users/${formData.user_id}`,
            formData
          );

          if (response.data.success) {
            let result = {
              user_id: formData.user_id,
              status: formData.status,
              role: formData.role,
            };
            let usersTemp = users.map((user) => {
              if (user.user_id == result.user_id) {
                user.status = formData.status;
                user.role = formData.role;
              }
              return user;
            });
            setUsers(usersTemp);
            setFilteredUsers(usersTemp);
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
          setFormData(user);
        }
      }
    }
    setIsSubmitting(false);
  };

  const isFormValid = async (isEdit) => {
    let newErrors = {};

    if (formData.role.length == 0) {
      newErrors.role = "Role is required";
    }

    setErrors({ ...errors, ...newErrors });

    return Object.keys(newErrors).length == 0;
  };

  const fetchUsers = async () => {
    try {
      let response = await axios.get(`users`);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoles = async () => {
    try {
      let response = await axios.get(`roles`);
      const roles = response.data.roles.map((role) => {
        return {
          value: role.role_id,
          label: role.role_name,
        };
      });
      setOptions(roles);
    } catch (error) {
      console.log(error);
    }
  };

  const loadingComponent = (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="loading loading-spin loading-lg"></div>
    </div>
  );

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  useEffect(() => {
    let filteredUsers = users.filter((user) => {
      let name = `${user.first_name} ${user.last_name}`;
      if (search == "") {
        return user;
      } else if (
        name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        user.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      ) {
        return user;
      }
    });

    setFilteredUsers(filteredUsers);
  }, [search]);

  useEffect(() => {
    if (userSlice.user_id != "") {
      setPageIsLoading(false);
    }
  }, [userSlice]);


  if (pageIsLoading) {
    return loadingComponent;
  } else {
    if (userSlice.permissions.includes("View Users")) {
      return (
        <>
          {/* <div>
            <Breadcrumbs
              lists={[
                { goto: "/", text: "Home" },
                { goto: "/users", text: "User Management" },
                { goto: "", text: "Users" },
              ]}
            />
          </div> */}
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex flex-col sm:flex-row w-full justify-between gap-2">
              <div className="poppins-bold text-color-2 text-[24px]">Users</div>
              <div>
                <label className="input input-bordered flex items-center gap-2">
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
              </div>
            </div>

            <div className="p-2 bg-white rounded-lg">
              <DataTable
                columns={columns}
                data={filteredUsers}
                defaultSortFieldId={1}
                pagination
                persistTableHead={true}
              />
            </div>
          </div>

          <dialog id="editModal" className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between">
                <h3 className="font-bold text-lg">Edit User</h3>
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
                  className="flex flex-col gap-4"
                >
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="poppins-regular text-[12px]">
                        Name <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={`input input-bordered w-full ${errors.role_name && `input-error`
                        }`}
                      value={`${formData.first_name} ${formData.last_name}`}
                      onChange={(e) => { }}
                      disabled
                    />
                    {errors.role_name && (
                      <span className="text-[12px] text-red-500">
                        {errors.role_name}
                      </span>
                    )}
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="poppins-regular text-[12px]">
                        Email <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={`input input-bordered w-full ${errors.role_name && `input-error`
                        }`}
                      value={formData.email}
                      onChange={(e) => { }}
                      disabled
                    />
                    {errors.role_name && (
                      <span className="text-[12px] text-red-500">
                        {errors.role_name}
                      </span>
                    )}
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="poppins-regular text-[12px]">
                        Role <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <Select
                      options={options}
                      menuPortalTarget={document.getElementById("editModal")}
                      isClearable={false}
                      value={defaultOptions}
                      onChange={(selected) => {
                        setFormData({
                          ...formData,
                          role: [
                            {
                              role_id: selected.value,
                              role_name: selected.label,
                            },
                          ],
                        });

                        setDefaultOptions(selected);
                      }}
                    />
                    {errors.role && (
                      <span className="text-[12px] text-red-500">
                        {errors.role}
                      </span>
                    )}
                  </label>

                  <div className="form-control w-full">
                    <div className="label flex flex-col items-start gap-2">
                      <span className="poppins-regular text-[12px]">
                        Status <span className="text-red-500">*</span>
                      </span>
                      <div className="flex flex-row gap-5">
                        {formData.status}
                        <input
                          type="checkbox"
                          className="toggle toggle-success"
                          value={formData.status}
                          checked={formData.status == "Active"}
                          onChange={(e) => {
                            if (e.target.value == "Active") {
                              setFormData({ ...formData, status: "Inactive" });
                            } else {
                              setFormData({ ...formData, status: "Active" });
                            }
                          }}
                        />
                      </div>
                    </div>

                    {errors.status && (
                      <span className="text-[12px] text-red-500">
                        {errors.status}
                      </span>
                    )}
                  </div>

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
        </>
      );
    }
    return <Unathorized />;
  }


};

export default UsersPage;
