import React, { useState } from "react";
import Matrices from "./LaborMatrix/Matrices";
import ExampleMatrix from "./LaborMatrix/ExampleMatrix";

const LaborMatrix = () => {
  const [selectedMatrix, setSelectedMatrix] = useState(null);
  return (
    <div>
      <div className="mb-5 ms-2">
        <h3 className="mb-4 lg:mb-0 ">Labor Matrix</h3>
        <p className="text-gray-700">
          Use Pricing Matrix to systematize your parts markup and stramline your
          profits.
        </p>
      </div>
      <div className=" mx-auto py-4 px-2">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/6 ">
            <Matrices onSelectMatrix={setSelectedMatrix} />
          </div>
          <div className="w-full md:w-4/6 ">
            <ExampleMatrix 
             initialData={selectedMatrix?.rows || [["0", "0", "0"]]} 
             titleData={selectedMatrix?.title || ""}
             idData = {selectedMatrix?._id || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaborMatrix;
