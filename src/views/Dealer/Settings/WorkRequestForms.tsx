import React from "react";
import CompanyForm from "./WorkRequestForms/CompanyForm";
import WorkRequest from "./WorkRequestForms/WorkRequest";

const WorkRequestForms = () => {
  return (
    <div>
      <div className="mb-5 mx-2">
        <h3 className="mb-4 lg:mb-0 ">Work Request Forms</h3>
        <p className="text-gray-700">
          Use Pricing Matrix to systematize your parts markup and stramline your
          profits.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* <div className="w-full lg:w-2/6  m-2"><CompanyForm /></div>
        <div className="w-full lg:w-4/6  m-2"><WorkRequest /></div> */}
      </div>
    </div>
  );
};

export default WorkRequestForms;
