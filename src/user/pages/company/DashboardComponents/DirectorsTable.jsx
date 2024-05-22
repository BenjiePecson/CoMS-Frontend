const DirectorsTable = () => {
  return (
    <div>
      <div className="flex flex-row m-2">
        <h1 className="mt-3 font-bold text-xl">Directors/Officers</h1>{" "}
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
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
            <tr>
              <td className="">
                <p className="font-bold">ROVIMAE B. PO</p> 230 Happy Homes Campo
                Sioco, Brgy. Ferdinand, Baguio City
              </td>
              <td className="font-bold">FILIPINO</td>
              <td className="font-bold">Y</td>
              <td className="font-bold">C</td>
              <td className="font-bold">F</td>
              <td className="font-bold">Y</td>
              <td className="font-bold">PRESIDENT</td>
              <td className="font-bold">N/A</td>
              <td className="font-bold">429-981-055-000</td>
            </tr>
            <tr>
              <td className="">
                <p className="font-bold">ROVIMAE B. PO</p> 230 Happy Homes Campo
                Sioco, Brgy. Ferdinand, Baguio City
              </td>
              <td className="font-bold">FILIPINO</td>
              <td className="font-bold">Y</td>
              <td className="font-bold">C</td>
              <td className="font-bold">F</td>
              <td className="font-bold">Y</td>
              <td className="font-bold">PRESIDENT</td>
              <td className="font-bold">N/A</td>
              <td className="font-bold">429-981-055-000</td>
            </tr>
            <tr>
              <td className="">
                <p className="font-bold">ROVIMAE B. PO</p> 230 Happy Homes Campo
                Sioco, Brgy. Ferdinand, Baguio City
              </td>
              <td className="font-bold">FILIPINO</td>
              <td className="font-bold">Y</td>
              <td className="font-bold">C</td>
              <td className="font-bold">F</td>
              <td className="font-bold">Y</td>
              <td className="font-bold">PRESIDENT</td>
              <td className="font-bold">N/A</td>
              <td className="font-bold">429-981-055-000</td>
            </tr>
            <tr>
              <td className="">
                <p className="font-bold">ROVIMAE B. PO</p> 230 Happy Homes Campo
                Sioco, Brgy. Ferdinand, Baguio City
              </td>
              <td className="font-bold">FILIPINO</td>
              <td className="font-bold">Y</td>
              <td className="font-bold">C</td>
              <td className="font-bold">F</td>
              <td className="font-bold">Y</td>
              <td className="font-bold">PRESIDENT</td>
              <td className="font-bold">N/A</td>
              <td className="font-bold">429-981-055-000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DirectorsTable;
