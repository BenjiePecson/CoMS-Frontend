import React from 'react'

const content = (
    <div className='w-full h-full overflow-y-auto'>
            <div className='h-full overflow-y-auto'>
              <span className='flex flex-row gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={2} stroke="#1E3A8A" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                </svg>
                <p className='border-b-2 border-black text-[.75rem] m-2 text-left'>In GIS, there's 2 Drafted documents coming from Hannah</p>
              </span>

              <span className='flex flex-row gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={2} stroke="#1E3A8A" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                </svg>

                <p className='border-b-2 border-black text-[.75rem] m-2 text-left'>In GIS, there's 1 Drafted document coming from Hazel</p>
              </span>
            
              <span className='flex flex-row gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={2} stroke="#1E3A8A" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
              </svg>
              <p className='border-b-2 border-black text-[.75rem] m-2 text-left'>In GIS, there's 1 Drafted document coming from Christina</p>
              </span>
            </div>
    </div>
);

export const Notifs = () => {
    const handleOpenModal = () => {
        document.getElementById('notifs').showModal();
    };

    const handleCloseModal = () => {
        document.getElementById('notifs').close();
    };

  return (
    <div className="w-full h-full shadow-xl p-2 rounded-2xl">
      <div className="cursor-pointer h-full w-full" onClick={handleOpenModal}>
        {content}
      </div>

      <dialog id="notifs" className="modal">
          {/* <button className="btn" onClick={handleCloseModal}>Close</button> */}
          <div className="modal-box w-11/12 max-w-5xl">
            <div className='flex flex-row justify-between'>
                <h3 className="font-bold text-lg">Notifications</h3>
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

export default Notifs;
