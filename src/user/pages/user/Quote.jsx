import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { fetchRecord, fetchRecords } from "../../store/quotes/QuotesSlice";
import Unathorized from "../../components/Unathorized";

const Quote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  // Data table here - Anthony
  const columns = [
    {
      name: "Quote Number",
      selector: (row) => {
        return row.quote_number;
      },
    },
    {
      name: "Company Name",
      selector: (row) => {
        return row.form_data.recipient_company;
      },
    },
    {
      name: "Quote Name",
      selector: (row) => {
        return row.quote_name;
      },
    },
    {
      name: "Status",
      selector: (row) => {
        return row.timestamps[0].status;
      },
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <div className="flex p-4 w-full h-[5rem]">
            <button
              onClick={() => {
                navigate(`/quote/view-quote/${row.quote_id}`);
              }}
            >
              <svg
                className="w-full h-full justify-start"
                viewBox="0 0 44 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                l
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
          </div>
        );
      },
    },
  ];
  //styles for the datatable - Anthony
  createTheme("customized", {
    text: {
      primary: "#000000",
    },
    background: {
      default: "transparent",
    },
  });

  const customStyles = {
    headCells: {
      style: {
        font: "bold",
      },
    },
  };

  const useTable = () => {
    const dispatch = useDispatch();
    const all_quotes = useSelector((state) => state.quotes.get_all_quotes);
    const loading = useSelector((state) => state.quotes.status);

    useEffect(() => {
      if (!all_quotes && !loading) {
        dispatch(fetchRecords());
      }
    }, [dispatch, all_quotes, loading]);

    // If data is not yet fetched, throw a promise for Suspense to catch
    if (loading) {
      throw new Promise((resolve) => setTimeout(resolve, 2000)); // Suspense will wait
    }

    return all_quotes;
  };

  const DataTableComponent = () => {
    const quotes = useTable(); // This will trigger the data fetching logic

    if (!user.permissions.includes("View Quotes")) {
      return <Unathorized />;
    }

    return (
      <DataTable
        columns={columns}
        data={quotes}
        persistTableHead={true}
        customStyles={customStyles}
        theme="customized"
      />
    );
  };

  const TableSkeleton = () => {
    return (
      <div className="space-y-4 w-full">
        {/* Table header skeleton */}
        <div className="flex space-x-4 animate-pulse w-full">
          <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-48 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-64 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-64 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-64 h-6 bg-gray-300 rounded-md"></div>
        </div>

        {/* Table rows skeleton */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex space-x-4 animate-pulse">
            <div className="w-40 h-6 bg-gray-300 rounded-md"></div>
            <div className="w-40 h-6 bg-gray-300 rounded-md"></div>
            <div className="w-56 h-6 bg-gray-300 rounded-md"></div>
            <div className="w-56 h-6 bg-gray-300 rounded-md"></div>
            <div className="w-56 h-6 bg-gray-300 rounded-md"></div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchRecords());
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (user.permissions.length == 0) {
    return (
      <div className="flex w-full justify-center">
        <span className="loading-spinner loading text-center"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col w-full ">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="poppins-bold text-color-2 text-[24px] flex items-center">
            Quote
          </div>

          <div>
            {user.permissions.length != 0 &&
              user.permissions.includes("Add Quotes") && (
                <button
                  className="btn btn-md bg-primary border-none text-white flex flex-row justify-center items-center rounded-[15px]"
                  onClick={() => {
                    navigate(`/quote/new-quote`);
                  }}
                >
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 2.7C10.5523 2.7 11 3.10294 11 3.6V8.1H16C16.5523 8.1 17 8.50294 17 9C17 9.49705 16.5523 9.9 16 9.9H11V14.4C11 14.8971 10.5523 15.3 10 15.3C9.44772 15.3 9 14.8971 9 14.4V9.9H4C3.44772 9.9 3 9.49705 3 9C3 8.50294 3.44772 8.1 4 8.1L9 8.1V3.6C9 3.10294 9.44772 2.7 10 2.7Z"
                      fill="#FCFCFC"
                    />
                  </svg>
                  FILE NEW QUOTE
                </button>
              )}
          </div>
        </div>
      </div>

      <div className="py-5">
        <Suspense fallback={<TableSkeleton />}>
          <DataTableComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default Quote;
