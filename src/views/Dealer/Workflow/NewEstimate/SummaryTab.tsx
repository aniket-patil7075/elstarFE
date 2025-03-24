import React from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
  HiOutlineUserCircle,
} from "react-icons/hi";
import Chart from "react-apexcharts";
import { COLORS } from "@/constants/chart.constant";

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
                  <span className="font-bold text-xl">1</span> of 2
                </div>
                <div className="text-gray-700">Services</div>
              </div>

              <div className="text-gray-700 flex items-center justify-center">
                <Chart
                  options={{
                    colors: COLORS,
                    legend: {
                      show: false, // Hides the legend
                    },
                    dataLabels: {
                      style: {
                        colors: ["#000"], // Sets text color inside the donut to black
                      },
                    },
                    tooltip: {
                      style: {
                        color: "#000", // Ensures tooltip text is black
                      },
                    },
                    responsive: [
                      {
                        breakpoint: 880,
                        options: {
                          chart: {
                            width: 1000,
                          },
                        },
                      },
                    ],
                  }}
                  series={[20, 40 , 40]}
                  height={105}
                  type="donut"
                />
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------------------------------------------------------------------- */}

          <div className="bg-white p-2 my-4">
            <div className="grid grid-cols-2 gap-4 p-1">
              <div className="flex gap-1">
                <HiOutlineCheckCircle className="text-xl text-gray-700 font-extrabold mt-1" />
                <h6>To Do List</h6>
              </div>
            </div>
            <div className="border-b border-gray-300 mt-2"></div>
            <div className="flex justify-between py-2 px-4 text-gray-700">
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

                <div className="flex justify-between py-2 px-4 text-gray-700">
                  <span className="text-start">Created</span>
                  <span className="text-end">21/03/2025</span>
                </div>

                <div className="flex justify-between py-2 px-4 text-gray-700">
                  <span className="text-start">Invoiced</span>
                  <span className="text-end">21/03/2025</span>
                </div>

                <div className="flex justify-between py-2 px-4 text-gray-700">
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
                <HiOutlineUserCircle className="text-xl text-gray-700 font-extrabold mt-1" />
                <h6>Customer ------</h6>
              </div>
            </div>
            <div className="border-b border-gray-300 mt-2"></div>
            <div className="flex justify-between py-2 px-4 text-gray-700">
              <span className="text-start">Lorem ipsum dolor sit amet.</span>
              <span className="text-end">Lorem, ipsum.</span>
            </div>
          </div>

          {/* --------------------------------------------------------------------------------------------------------------------------------- */}

          <div className="bg-white p-2 my-4">
            <div className="grid grid-cols-2 gap-4 p-1">
              <div className="flex gap-1">
                <HiOutlineLightBulb className="text-xl text-gray-700 font-extrabold mt-1" />
                <h6>recommendation</h6>
              </div>
            </div>
            <div className="border-b border-gray-300 mt-2"></div>
            <div className="flex justify-between py-2 px-4 text-gray-700">
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
