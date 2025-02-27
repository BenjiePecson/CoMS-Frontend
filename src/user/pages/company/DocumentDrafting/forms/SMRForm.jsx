import React from "react";
import { rdoData } from "./rdoData";


export const SMRForm = ({
    formData,
    officers,
    handleOnChange,
    setFormData,
}) => {

    const handleRDOChange = (e) => {
        const selectedRDO = rdoData.find(rdo => rdo.rdo_code === e.target.value);
        // handleOnChange(e, "RDO Code");

        if (selectedRDO) {
            setFormData({
                ...formData, form_data: {
                    ...formData.form_data,
                    rdo_number: selectedRDO.rdo_code,
                    rdo_address: selectedRDO.rdo_address,
                    rdo_city: selectedRDO.rdo_city,
                }
            });

            // handleOnChange({ target: { name: "rdo_address", value: selectedRDO.rdo_address } }, "RDO Address");
            // handleOnChange({ target: { name: "rdo_city", value: selectedRDO.rdo_city } }, "RDO City");
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col w-full">
                <span className="label-text">Company Name</span>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    disabled
                    name="company_name"
                    value={formData.form_data.corporate_name}
                    onChange={(e) => {
                        handleOnChange(e, "Company Name");
                    }}
                />

                <span className="label-text">Audited Years in Question</span>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    name="audited_years_in_question"
                    value={formData.form_data.audited_years_in_question}
                    onChange={(e) => {
                        handleOnChange(e, "Audited Years in Question");
                    }}
                />

                <span className="label-text">President Name</span>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    disabled
                    name="president_name"
                    value={formData.form_data.president_name}
                    onChange={(e) => {
                        handleOnChange(e, "President Name");
                    }}
                />

                <span className="label-text">Treasurer's Name</span>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    disabled
                    name="treasurer_name"
                    value={formData.form_data.treasurer_name}
                    onChange={(e) => {
                        handleOnChange(e, "Treasurer's Name");
                    }}
                />

                <span className="label-text">RDO Number</span>
                <select
                    className="select select-bordered"
                    name="rdo_number"
                    value={formData.form_data.rdo_number}
                    onChange={handleRDOChange}
                >
                    {rdoData.map((rdo) => (
                        <option key={rdo.rdo_code} value={rdo.rdo_code}>
                            {rdo.rdo_city} / {rdo.rdo_address.split(', ')[1]}
                        </option>
                    ))}
                </select>

                <span className="label-text">RDO Address</span>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    name="rdo_address"
                    value={formData.form_data.rdo_address}
                    onChange={(e) => {
                        handleOnChange(e, "RDO Address");
                    }}
                />

                <span className="label-text">RDO City</span>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    name="rdo_city"
                    value={formData.form_data.rdo_city}
                    onChange={(e) => {
                        handleOnChange(e, "RDO City");
                    }}
                />

            </div>
        </div>
    );
};

export default SMRForm;
