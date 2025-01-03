import { useState } from "react";
import CardDirector from "../../../components/CardDirector.jsx";

const DirectorsTable = ({ directors, isGridView, setIsGridView }) => {
  const directorsRow = directors.map((director, index) => {
    return (
      <tr key={`director-${index}`}>
        <td className="">
          <p className="font-bold">{director.name}</p>{" "}
          {director.current_residual_address}
        </td>
        <td className="font-bold">{director.nationality}</td>
        <td className="font-bold">{director.incorporator}</td>
        <td className="font-bold">{director.board}</td>
        <td className="font-bold">{director.gender}</td>
        <td className="font-bold">{director.stock_holder}</td>
        <td className="font-bold">{director.officer}</td>
        <td className="font-bold">{director.executive_committe}</td>
        <td className="font-bold">{director.tax_id_number}</td>
      </tr>
    );
  });

  const gridView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {directors.length != 0 &&
          directors.map((director, index) => {
            return (
              <div key={`director-${index}`}>
                <CardDirector director={director} index={index} />
              </div>
            );
          })}
      </div>
    );
  };

  const listView = () => {
    return (
      <div className="overflow-x-auto">
        <table className="table table-xs z-0 table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <td>NAME/CURRENT RESIDENTIAL ADDRESS</td>
              <td>NATIONALITY</td>
              <td>INC'R</td>
              <td>BOARD</td>
              <td>GENDER</td>
              <td>STOCKHOLDER</td>
              <td>OFFICER</td>
              <td>EXEC. COMM.</td>
              <td>TAX IDENTIFICATION NUMBER</td>
            </tr>
          </thead>
          <tbody>
            {directors.length > 0 ? (
              directorsRow
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-5">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row">
        {/* <h1 className="mt-3 font-bold text-xl">Directors/Officers</h1>{" "} */}
        <div className="poppins-bold text-color-2 text-[24px] flex items-center">
          Directors / Officers
        </div>
      </div>

      {isGridView ? gridView() : listView()}
    </div>
  );
};

export default DirectorsTable;
