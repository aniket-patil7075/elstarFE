import React from "react";
import { HiOutlineCheckCircle, HiOutlineLightBulb, HiOutlineUserCircle } from "react-icons/hi";

const SummaryTab = () => {
  return (
    <div>
      <div className="flex flex-wrap -mx-2 text-black">
        <div className="w-full sm:w-1/2 px-2">

        {/* --------------------------------------------------------------------------------------------------------------------------------- */}
          <div className="bg-white p-2 my-4">
            <div className="grid grid-cols-2 gap-4 p-1">
              <div className="grid grid-rows-2">
                <div className="">
                  <span className="font-bold text-xl text-gray-600">1</span> of
                  2
                </div>
                <div className="">Services</div>
              </div>

              <div className=" p-4 flex items-center justify-center">Chart</div>
            </div>
          </div>

          {/* --------------------------------------------------------------------------------------------------------------------------------- */}

          <div className="bg-white p-2 my-4">
            <div className="grid grid-cols-2 gap-4 p-1">
               <div className="flex gap-1">
               <HiOutlineCheckCircle className="text-xl text-gray-700 font-extrabold mt-1"/>
               <h6>To Do List</h6>
               </div>
            </div>
            <div className="border-b border-gray-300 mt-2"></div>
            <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Allignment for Full Car</span>
                  <span className="text-end">0.54 Hrs</span>
                </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 px-2">

        {/* --------------------------------------------------------------------------------------------------------------------------------- */}
        
          <div className="bg-white p-4 my-4">
            <div className="">
              <div className="flex flex-col w-full text-black">
                <div className="flex justify-between py-2 px-4 font-semibold">
                  <span className="text-start">Service Writer</span>
                  <span className="text-end">MAJID ISLAM</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Created</span>
                  <span className="text-end">21/03/2025</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Invoiced</span>
                  <span className="text-end">21/03/2025</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Workflow</span>
                  <span className="text-end">Invoiced</span>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------------------------------------------------------------------- */}

          <div className="bg-white p-2 my-4">
            <div className="grid grid-cols-2 gap-4 p-1">
               <div className="flex gap-1">
               <HiOutlineUserCircle className="text-xl text-gray-700 font-extrabold mt-1"/>
               <h6>Customer ------</h6>
               </div>
            </div>
            <div className="border-b border-gray-300 mt-2"></div>
            <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Lorem ipsum dolor sit amet.</span>
                  <span className="text-end">Lorem, ipsum.</span>
                </div>
          </div>

{/* --------------------------------------------------------------------------------------------------------------------------------- */}

          <div className="bg-white p-2 my-4">
            <div className="grid grid-cols-2 gap-4 p-1">
               <div className="flex gap-1">
               <HiOutlineLightBulb className="text-xl text-gray-700 font-extrabold mt-1"/>
               <h6>recommendation</h6>
               </div>
            </div>
            <div className="border-b border-gray-300 mt-2"></div>
            <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Lorem ipsum dolor sit amet.</span>
                  <span className="text-end">Lorem, ipsum.</span>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryTab;
