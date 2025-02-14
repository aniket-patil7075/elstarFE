import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Segment,
  Switcher,
} from "@/components/ui";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import {
  HiClock,
  HiCube,
  HiDownload,
  HiOutlineSearch,
  HiUser,
} from "react-icons/hi";
import FeesAndRates from "./GeneralSetting/FeesAndRates";
import WorkAssignments from "./GeneralSetting/WorkAssignments";
import CustomerAuthorization from "./GeneralSetting/CustomerAuthorization";
import ESignature from "./GeneralSetting/ESignature";
import Mileage from "./GeneralSetting/Mileage";
import EstimateLineItems from "./GeneralSetting/EstimateLineItems";

const GeneralSetting = () => {
  const [data, setData] = useState("");

  const handleFeesDataChange = (childData:any) => {
    setData(childData);
  };

console.log("Data in parent : ",data)

  return (
    <div>
      <div className="mb-5 ms-2">
        <div className="lg:flex items-center justify-between mb-5">
          <h3 className="mb-4 lg:mb-0 text-xl font-semibold">General</h3>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Input
              className="w-full sm:w-52 md:w-60"
              size="sm"
              placeholder="Search product"
              prefix={<HiOutlineSearch className="text-lg" />}
            />

            <Button
              type="button"
              size="sm"
              className="font-medium flex items-center gap-1 px-3 py-1.5"
            >
              <HiDownload className="h-4 w-4" />
              Cancel
            </Button>

            <Button
              variant="solid"
              type="button"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center gap-1 px-3 py-1.5"
            >
              <HiDownload className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col  xl:flex-row w-full">
        <div className="w-full lg:w-3/4 p-4 border p-5 bg-gray-100">
          <FeesAndRates onDataChange={handleFeesDataChange} />
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full mt-7">
        <div className="w-full lg:w-3/4 p-4 p-5 border bg-gray-100">
          <WorkAssignments />
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full mt-7">
        <div className="w-full lg:w-3/4 p-4 p-5 border bg-gray-100">
          <CustomerAuthorization />
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full mt-7">
        <div className="w-full lg:w-3/4 p-4 p-5 border bg-gray-100">
          <ESignature />
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full mt-7">
        <div className="w-full lg:w-3/4 p-4 p-5 border bg-gray-100">
          <Mileage />
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full mt-7">
        <div className="w-full lg:w-3/4 p-4 p-5 border bg-gray-100">
          <EstimateLineItems />
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>
    </div>
  );
};

export default GeneralSetting;
