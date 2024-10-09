import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Drafted() {
    const handleOpenModal = () => {
        document.getElementById('drafted').showModal();
    };

    const handleCloseModal = () => {
        document.getElementById('drafted').close();
    };

    const [drafted, setDrafted] = useState([]);

    const fetchDrafted = async () => {
        let response = await axios.get("/main-dashboard/");
        setDrafted(response.data.drafted);
    }

    useEffect(() => {
        fetchDrafted();
    }, []);

    const tableComponent = (
        <>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Record Name</th>
                        <th>Last Modified</th>
                        <th className="w-[10%]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drafted.length !== 0 ? (
                        drafted.map((record) => {
                            return (
                                <tr key={record.recordId}>
                                    <td>{record.recordName}</td>
                                    <td>{record.modified_by}</td>
                                    <td>
                                        <Link to={`/company/${record.companyId}/gis-tracker/view/${record.recordId}`}>
                                            <button>
                                                <svg
                                                    width="44"
                                                    height="37"
                                                    viewBox="0 0 44 37"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect width="44" height="37" rx="10" fill="#273069" />
                                                    <path
                                                        d="M22.0003 20C23.1048 20 24.0003 19.1046 24.0003 18C24.0003 16.8954 23.1048 16 22.0003 16C20.8957 16 20.0003 16.8954 20.0003 18C20.0003 19.1046 20.8957 20 22.0003 20Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M12.458 18C13.7323 13.9429 17.5226 11 22.0002 11C26.4778 11 30.2681 13.9429 31.5424 18C30.2682 22.0571 26.4778 25 22.0002 25C17.5226 25 13.7323 22.0571 12.458 18ZM26.0003 18C26.0003 20.2091 24.2094 22 22.0003 22C19.7911 22 18.0003 20.2091 18.0003 18C18.0003 15.7909 19.7911 14 22.0003 14C24.2094 14 26.0003 15.7909 26.0003 18Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr className="text-center">
                            <td colSpan={3}>No records found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );

    return (
        <div className="card bg-base-100 w-50 shadow-xl m-2">
            <div className="card-body cursor-pointer" onClick={handleOpenModal}>
                <h2 className="card-title text-center">Drafted</h2>
                <p className="text-center text-lg">{drafted.length}</p>
            </div>

            <dialog id="drafted" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">List of 'Drafted'</h3>
                    {tableComponent}
                    <div className="modal-action">
                        <button className="btn" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Drafted;