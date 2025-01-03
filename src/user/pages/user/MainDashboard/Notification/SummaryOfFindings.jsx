import React from 'react'

const content = (
    <div className='w-full h-full overflow-y-auto'>
            <div className='h-full overflow-y-auto'>
              <span className='flex flex-row gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={2} stroke="#1E3A8A" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
                <p className='border-b-2 border-black text-[.75rem] m-2 text-left'>There's an average of 5 days before a file gets to Approved status.</p>
              </span>

              <span className='flex flex-row gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={2} stroke="#1E3A8A" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <p className='border-b-2 border-black text-[.75rem] m-2 text-left'>It takes an average of 4 days for a file to be Drafted</p>
              </span>
            
              <span className='flex flex-row gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={2} stroke="#1E3A8A" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>

              <p className='border-b-2 border-black text-[.75rem] m-2 text-left'>Filed with SEC status takes an average of 10 days</p>
              </span>
            </div>
    </div>
);

const SummaryOfFindings = ({dialogID}) => {

  const handleOpenModal = () => {
    document.getElementById(dialogID).showModal();
};


  return (
    <div className="w-full h-full shadow-xl p-2 rounded-2xl">
      <div className="cursor-pointer h-full w-full" onClick={handleOpenModal}>
        {content}
      </div>

      <dialog id={dialogID} className="modal">
          {/* <button className="btn" onClick={handleCloseModal}>Close</button> */}
          <div className="modal-box w-11/12 max-w-5xl">
            <div className='flex flex-row justify-between'>
                <h3 className="font-bold text-lg">Summary of Findings</h3>

                <select className="rounded-lg h-1/4 border border-blue-700">
                    <option disabled>Choose a module:</option>
                    <option>Month</option>
                    <option>Quarter</option>
                    <option>Year</option>
                </select>
            </div>
                {content}
          </div>

          <form method="dialog" className="modal-backdrop cursor-pointer bg-blue-900 opacity-40">
            <button>close</button>
          </form>
      </dialog>
    </div>
  )
}

export default SummaryOfFindings;
