import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RoutedforSignature() {
    const handleOpenModal = () => {
        document.getElementById('routed').showModal();
    };

    const handleCloseModal = () => {
        document.getElementById('routed').close();
    };

    const [routed, setRouted] = useState([]);

    const fetchRouted = async () => {
        let response = await axios.get("/main-dashboard/");
        setRouted(response.data.routed);
    }

    useEffect(() => {
        fetchRouted();
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
                    {routed.length !== 0 ? (
                        routed.map((record) => {
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
        <div className="bg-blue-900 w-50 h-5/6 shadow-xl m-2 border border-white rounded-2xl">
            <div className="cursor-pointer h-full p-4" onClick={handleOpenModal}>
                <h2 className="text-center text-white font-semibold">Routed for Signature</h2>
                <p className="text-center text-white text-sm">{routed.length}</p>
            </div>

            <dialog id="routed" className="modal">
                {/* <button className="btn" onClick={handleCloseModal}>Close</button> */}
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">List of 'Routed for Signature'</h3>
                    {tableComponent}
                </div>

                <form method="dialog" className="modal-backdrop cursor-pointer bg-blue-900 opacity-40">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default RoutedforSignature;
