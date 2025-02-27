import React, { useState } from "react";
import Switcher from "@/components/ui/Switcher";
import type { ChangeEvent } from "react";

const CompanyForm = () => {
  const [requiredFields, setRequiredFields] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    address: true,
    referralSource: true,
    vehicleDetails: true,
    description: true,
  });

  const handleRequirementChange = (field:any) => {
    setRequiredFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const onSwitcherToggle = (val: boolean, e: ChangeEvent) => {
      console.log(val, e);
    };
  return (
    <div className="border bg-gray-100">
      <div className="mx-5 my-5">
        <h5 className="text-gray-700">WORK REQUEST FORM</h5>
      </div>
      <div>
        <form className="mx-5">
          {/* company logo */}
          <div className="mb-4 flex justify-between">
            <p className="text-gray-700 mb-2 mt-1">Show Company Logo</p>
            <div className=" gap-4">
            <Switcher defaultChecked onChange={onSwitcherToggle} />
            </div>
          </div>
          {/* Form Title */}
          <div className="mb-4">
            <h6 className="text-gray-700 mb-2">Form Title</h6>
            <div className=" gap-4">
              <input
                type="text"
                placeholder="Work Request"
                className="w-full p-2 border rounded"
              />
              
            </div>
          </div>

          {/* Toggle Required Fields */}
          <div className="mb-4 flex flex-col gap-4 border p-4">
            {Object.keys(requiredFields).map((field, index) => (
              <>
                <div key={field} className="flex items-center justify-between">
                  <label className="capitalize text-gray-700 font-medium">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <select
                    className="p-2 border rounded w-40"
                    value={requiredFields[field] ? "required" : "optional"}
                    onChange={() => handleRequirementChange(field)}
                  >
                    <option value="required">Required</option>
                    <option value="optional">Optional</option>
                  </select>
                </div>
                {(field === "address" ||
                  field === "referralSource" ||
                  field === "vehicleDetails") && (
                  <hr className="border-gray-300 my-1" />
                )}
              </>
            ))}
          </div>

          <div className="mb-4">
            <h6 className="mb-2 text-gray-700">Placeholder Text</h6>
            <textarea
              rows="4"
              placeholder="Tell us what work you might need done on your vehicle."
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
