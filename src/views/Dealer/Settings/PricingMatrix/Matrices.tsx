import { Button, Dropdown } from "@/components/ui";
import SelectAndButton from "@/components/ui/SelectAndButton";
import React, { useState } from "react";

const matrixOptions = [
  { label: "Example Matrix A", value: "example_matrix_a" },
  { label: "Example Matrix B", value: "example_matrix_b" },
  { label: "Example Matrix C", value: "example_matrix_c" },
];

const Matrices = () => {
  const [selectedMatrix, setSelectedMatrix] = useState(matrixOptions[0].label);

  const onDropdownItemClick = (label: any) => {
    setSelectedMatrix(label);
  };


  return (
    <div>
      <div className="border">
        <div className="mx-5 my-5">
          <h5 className="text-gray-700">Matrices</h5>
        </div>
        <div>
          <div className="flex flex-col w-full text-gray-500">
            <div className="flex justify-between py-3 px-5 ">
              <span className="text-start">Example Matrix B</span>
              <span className="text-end">0</span>
            </div>

            <div className="flex justify-between py-3 px-5 ">
              <span className="text-start">Example Matrix A</span>
              <span className="text-end">0</span>
            </div>

            <div className="flex justify-between py-3 px-5 ">
              <span className="text-start">New Matrix</span>
              <span className="text-end">0</span>
            </div>
          </div>
        </div>
        <div className="my-5 text-center">
          <Button size="sm" variant="solid">
            New Matrix
          </Button>
        </div>
      </div>
      <div className=" my-5 !text-gray-700">
        <h6>Default Matrix (for new labor items)</h6>
        <div className="w-full border bg-white p-1 my-2">
          <Dropdown title={selectedMatrix} className="bg-white me-5">
            {matrixOptions.map((option) => (
              <Dropdown.Item key={option.value} eventKey={option.value} onClick={() => onDropdownItemClick(option.label)}>
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Matrices;
