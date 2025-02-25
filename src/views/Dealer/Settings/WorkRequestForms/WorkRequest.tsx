import { FormItem, Input } from "@/components/ui";
import { Field } from "formik";
import React from "react";

const WorkRequest = () => {
  return (
    <div className="border bg-gray-100">
      <div className="mx-5 my-5">
        <h5 className="text-gray-700">WORK REQUEST</h5>
      </div>
      <div>
        <form className="mx-5">
          {/* Contact Info */}
          <div className="mb-4">
            <h6 className="text-gray-700 mb-2">Contact Info</h6>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="mb-4">
            <h6 className="mb-2 text-gray-700">Vehicle Details</h6>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Year"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Make"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Model"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Type"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="mb-4">
            <h6 className=" mb-2 text-gray-700">Contact Details</h6>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Referral Source */}
          <div className="mb-4">
            <h6 className="mb-2 text-gray-700">Referral Source (Optional)</h6>
            <select className="w-full p-2 border rounded">
              <option value="">Select an option</option>
              <option value="friend">option 1</option>
              <option value="online">option 2</option>
              <option value="advertisement">option 3</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h6 className="mb-2 text-gray-700">Description</h6>
            <textarea
              rows="4"
              placeholder="Enter details..."
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkRequest;
