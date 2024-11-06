import React from 'react'

const content = (
    <div className="overflow-x-auto overflow-y-auto h-full">
            <table className="table table-xs overflow-y-hidden h-[14.5rem]">
                <thead className='bg-blue-900'>
                <tr>
                    {/* <th></th> */}
                    <th className='text-white'>Open Items</th>
                    <th className='text-white'>Assigned</th>
                    <th className='text-white'>Date</th>
                    <th className='text-white'>Status</th>
                    <th className='text-white'>Remarks</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {/* <th>1</th> */}
                    <td>GIS and MC28 Filing for Amendment</td>
                    <td>Maggie</td>
                    <td>None</td>
                    <td>In Progress</td>
                    <td>MC28 Submitted</td>
                </tr>
                <tr>
                    {/* <th>2</th> */}
                    <td>LGU Closure of HQ (Baguio)</td>
                    <td>Hannah</td>
                    <td>09/30/2024</td>
                    <td>In Progress</td>
                    <td>Waiting for open cases to be accomplished</td>
                </tr>
                <tr>
                    {/* <th>3</th> */}
                    <td>SEC MC28 Submission and Update</td>
                    <td>Hazel</td>
                    <td>09/13/2024</td>
                    <td>Pending Government Approval</td>
                    <td>Pending Amendment for Envie</td>
                </tr>
                <tr>
                    {/* <th>4</th> */}
                    <td>SEC Amendment</td>
                    <td>Hannah</td>
                    <td>None</td>
                    <td>Pending Government Approval</td>
                    <td>For Revisions</td>
                </tr>
                <tr>
                    {/* <th>5</th> */}
                    <td>BIR eFPS Registration</td>
                    <td>Christina</td>
                    <td>None</td>
                    <td>Drafted</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>6</th> */}
                    <td>SEC Registration - New GIS Filing</td>
                    <td>Christina</td>
                    <td>None</td>
                    <td>Not Started</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>7</th> */}
                    <td>SEC Change in Resident Agent</td>
                    <td>Christina</td>
                    <td>None</td>
                    <td>Not Started</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>8</th> */}
                    <td>BIR Closure (Baguio)</td>
                    <td>Christina</td>
                    <td>09/30/2024</td>
                    <td>Pending Government Approval</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>9</th> */}
                    <td>SEC Filing of Annual GIS for 2024</td>
                    <td>Hannah</td>
                    <td>None</td>
                    <td>For Payment</td>
                    <td>Hold</td>
                </tr>
                <tr>
                    {/* <th>10</th> */}
                    <td>LGU Branch Registration (Baguio)</td>
                    <td>Hannah</td>
                    <td>09/13/2024</td>
                    <td>In Progress</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>11</th> */}
                    <td>BIR REgistration (Permit and ATP)</td>
                    <td>Hannah</td>
                    <td>None</td>
                    <td>Drafted</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>12</th> */}
                    <td>LGU Registration</td>
                    <td>Hannah</td>
                    <td>None</td>
                    <td>Not Started</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>13</th> */}
                    <td>LGU Closure (Baguio)</td>
                    <td>Hazel</td>
                    <td>10/15/2024</td>
                    <td>In Progress</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>14</th> */}
                    <td>SSS Change of Address</td>
                    <td>Hazel</td>
                    <td>None</td>
                    <td>Pending Government Approval</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>15</th> */}
                    <td>SSS Change of Name</td>
                    <td>Hazel</td>
                    <td>None</td>
                    <td>Pending Government Approval</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>16</th> */}
                    <td>LGU Closure (Cebu)</td>
                    <td>Joan</td>
                    <td>None</td>
                    <td>In Progress</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>17</th> */}
                    <td>BIR eAFPS Update in Communication (Cebu)</td>
                    <td>Joan</td>
                    <td>None</td>
                    <td>In Progress</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>18</th> */}
                    <td>BIR eAFPS Update in Communication</td>
                    <td>Joan</td>
                    <td>None</td>
                    <td>In Progress</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>19</th> */}
                    <td>BIR Registration (Taguig)</td>
                    <td>Kuya Alex</td>
                    <td>None</td>
                    <td>Blocked</td>
                    <td>None</td>
                </tr>
                <tr>
                    {/* <th>20</th> */}
                    <td>BIR Closure (Baguio)</td>
                    <td>Hazel</td>
                    <td>11/30/2024</td>
                    <td>In Progress</td>
                    <td>Open Items</td>
                </tr>
                </tbody>
            </table>
        </div>
);

export const OpenItems = () => {
    const handleOpenModal = () => {
        document.getElementById('openItems').showModal();
    };

    const handleCloseModal = () => {
        document.getElementById('notifs').close();
    };

  return (
    <div className="w-full shadow-xl p-2 rounded-2xl h-[15rem]">
      <div className="cursor-pointer h-full w-full" onClick={handleOpenModal}>
        {content}
      </div>

      <dialog id="openItems" className="modal">
          {/* <button className="btn" onClick={handleCloseModal}>Close</button> */}
          <div className="modal-box w-11/12 max-w-5xl">
            <div className='flex flex-row justify-between'>
                <h3 className="font-bold text-lg">Open Items Table</h3>
            </div>
                {content}
          </div>

          <form method="openItems" className="modal-backdrop cursor-pointer bg-blue-900 opacity-40">
            <button>close</button>
          </form>
      </dialog>
    </div>
  )
}

export default OpenItems;
