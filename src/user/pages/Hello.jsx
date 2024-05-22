import React, { useState } from "react";

const initialForm = {
  id: 1,
  completeName: "",
  specificResidentialAddress: "",
  nationality: "",
  dateOfBirth: "",
  tin: "",
  percentOwnershipVotingrights: "",
  typeOfBeneficialOwner: "",
  categoryOfBeneficialOwnership: "",
};

function Hello() {
  const [collapseID, setCollapseID] = useState("");
  const [formArray, setFormArray] = useState([{ ...initialForm }]);

  const addNewForm = () => {
    const newForm = { ...initialForm };
    newForm.id = formArray[formArray.length - 1].id + 1;
    setFormArray([...formArray, newForm]);
  };

  const setFormValue = (e, index) => {
    const newFormArray = [...formArray];
    newFormArray[index][e.target.name] = e.target.value;
    setFormArray(newFormArray);
  };

  const removeForm = (id) => {
    const updatedFormArray = formArray.filter((form) => form.id !== id);
    setFormArray(updatedFormArray);
  };

  return (
    <div>
      <div className="import">
        <div className="importTable">
          <table className="table table-hover" id="tables">
            <thead className="thead-dark">
              <tr>
                <th>Beneficial Ownership Declaration</th>
                <th>
                  {" "}
                  <button id="addRow" onClick={addNewForm}>
                    + Add row input
                  </button>
                </th>
              </tr>
              <tr>
                <th>
                  COMPLETE NAME (Surname, Given Name, Middle Name, Name
                  Extension (i.e., Jr., Sr., III)
                </th>
                <th>SPECIFIC RESIDENTIAL ADDRESS</th>
                <th>NATIONALITY</th>
                <th>DATE OF BIRTH</th>
                <th>TAX IDENTIFICATION NO.</th>
                <th>% OF OWNERSHIP / % OF VOTING RIGHTS2</th>
                <th>TYPE OF BENEFICIAL OWNER Direct (D) or Indirect (I)</th>
                <th>CATEGORY OF BENEFICIAL OWNERSHIP</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {formArray.map((form, index) => (
                <tr key={form.id}>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="completeName"
                      value={form.completeName}
                      onChange={(e) => setFormValue(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="specificResidentialAddress"
                      value={form.specificResidentialAddress}
                      onChange={(e) => setFormValue(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="nationality"
                      value={form.nationality}
                      onChange={(e) => setFormValue(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={(e) => setFormValue(e, index)}
                      id="example-date-input"
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="tin"
                      value={form.tin}
                      onChange={(e) => setFormValue(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="percentOwnershipVotingrights"
                      value={form.percentOwnershipVotingrights}
                      onChange={(e) => setFormValue(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="typeOfBeneficialOwner"
                      value={form.typeOfBeneficialOwner}
                      onChange={(e) => setFormValue(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="categoryOfBeneficialOwnership"
                      value={form.categoryOfBeneficialOwnership}
                      onChange={(e) => setFormValue(e, index)}
                    />
                  </td>
                  <td></td>
                  <td>
                    <button type="button" onClick={() => removeForm(form.id)}>
                      - Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <pre>{JSON.stringify(formArray)}</pre>
    </div>
  );
}

export default Hello;