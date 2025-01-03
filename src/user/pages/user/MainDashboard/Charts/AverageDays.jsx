import React from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AverageDays = ({dialogID}) => {
  const options = {
    scales: {
      x: {
        display: false, // Hides the x-axis labels
      },
      y: {
        display: true, // Shows the y-axis labels
      },
    },
    plugins: {
      legend: {
        display: true, // Ensures the legend is displayed
        position: 'bottom',
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const data = {
    labels: [
      "Drafted",
      "Pending for Approval",
      "Approved",
      "Routed for Signature",
      "For Notarization",
      "Filed with SEC",
      "Completed",
    ],
    datasets: [
      {
        label: 'Average Days it takes to File',
        data: [6, 5, 8, 8, 5, 5, 4],
        backgroundColor: '#1E3A8A',
      },
    ],
  };

  const handleOpenModal = () => {
    console.log(dialogID);
    document.getElementById(dialogID).showModal();
  };

  const handleCloseModal = () => {
    document.getElementById(dialogID).close();
  };

  return (
    <div className="bg-base-100 w-full h-full flex items-center justify-center rounded-2xl">
      <div className="cursor-pointer" onClick={handleOpenModal}>
        <Bar data={data} options={options} className='max-w-full' />
      </div>
      <dialog id={dialogID} className="modal">
        {/* <button className="btn" onClick={handleCloseModal}>Close</button> */}
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Average Days</h3>
          <Bar data={data} options={options} />
        </div>

        <form method="dialog" className="modal-backdrop cursor-pointer bg-blue-900 opacity-40">
            <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AverageDays;
