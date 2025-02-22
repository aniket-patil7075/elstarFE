import { Button } from "@/components/ui";
import React from "react";

const Matrices = () => {
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
      <div className="mx-5 my-5 !text-gray-700">
        <h6>Default Matrix</h6>
      </div>
    </div>
  );
};

export default Matrices;
