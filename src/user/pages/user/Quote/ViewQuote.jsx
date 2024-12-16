import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const ViewQuote = () => {
    const navigate = useNavigate();

    const quote_record = useSelector((state) => state.quotes.get_record);


    let { quote_id } = useParams();

    useEffect(()=> {
        console.log(quote_record);
    },[quote_record]
) 
  return (
   <>
    <div className="flex flex-row w-full justify-between">
          <button
            onClick={() => {
              navigate(`/quote`);
            }}
            className="flex flex-row gap-3 p-2 items-center w-32"
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.14081 0.260609L0.588132 6.11787L6.44539 11.6705L7.82115 10.2193L3.41512 6.0424L7.59204 1.63637L6.14081 0.260609Z"
                fill="black"
              />
            </svg>
            <span className="poppins-regular text-[16px]">Back</span>
          </button>
        </div>

        <div className="mb-5 gap-5">
          <div className="flex flex-row w-full justify-between items-center mb-2">
            <div className="flex flex-row gap-4 justify-center items-center">
              <svg
                width="26"
                height="22"
                viewBox="0 0 26 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4.00001H13.4137L10 0.586257C9.81487 0.399844 9.59458 0.252035 9.3519 0.1514C9.10922 0.050765 8.84897 -0.000693852 8.58625 7.06503e-06H2C1.46957 7.06503e-06 0.960859 0.210721 0.585786 0.585793C0.210714 0.960866 0 1.46957 0 2.00001V20.0775C0.000992028 20.5873 0.20403 21.0759 0.564625 21.4363C0.925219 21.7966 1.41396 21.9993 1.92375 22H24.1112C24.612 21.9993 25.092 21.8001 25.4461 21.4461C25.8001 21.092 25.9993 20.612 26 20.1113V6.00001C26 5.46957 25.7893 4.96087 25.4142 4.58579C25.0391 4.21072 24.5304 4.00001 24 4.00001ZM2 2.00001H8.58625L10.5863 4.00001H2V2.00001Z"
                  fill="#343330"
                />
              </svg>
              <div className="flex flex-col">
                <div className="flex flex-row gap-5">
                  <span className="poppins-bold text-[18px]">
                    Testing {quote_record.form_data.quote_name}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-end">
              <button
                className="btn btn-outline btn-sm rounded-full"
              //  onClick={() => {
            //       document.getElementById("statusDialog").showModal();
            //     }}
               >
              </button>
            </div>
          </div>
          <hr />
          
        </div>
   </>
  )
}
