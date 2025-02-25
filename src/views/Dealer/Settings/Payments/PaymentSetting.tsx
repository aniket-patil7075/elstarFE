import React from "react";

const PaymentSetting = () => {
  return (
    <div>
      <div className="border w-full md:w-2/3 bg-gray-100">
        <div className="mx-5 my-3">
          <h5 className="text-gray-700">Account</h5>
        </div>
        <div>
          <div className="flex flex-col w-full text-gray-500">
            <div className="flex justify-between py-3 px-5 ">
              <span className="text-start">automotive24777@gmail.com</span>
              <span className="text-end text-blue-500">Update Account</span>
            </div>
          </div>
        </div>
      </div>


      <div className="border w-full md:w-2/3 my-4 bg-gray-100">
        <div className="mx-5 mt-3 mb-1">
          <h5 className="text-gray-700">Payouts</h5>
        </div>
        <div>
          <div className="flex flex-col w-full text-gray-500 border-b border-gray-300 ">
            <div className="flex justify-between mb-3 px-5 ">
              <span className="text-start">
                BANK OF AMERICA, N.A. Bank Account ****7534 <br />
                Scheduled to send daily on a 2-day rolling basis
              </span>
              <span className="text-end text-blue-500">Update Account</span>
            </div>
          </div>
          <div className="flex justify-between mb-3 px-5 py-3 ">
            <span className="text-start">
              Send payouts to QuickBooks as deposits - On
            </span>
            <span className="text-end text-blue-500">
              Go to QuickBooks Settings
            </span>
          </div>
        </div>
      </div>

      <div className="border w-full md:w-2/3 my-4 bg-gray-100">
        <div className="mx-5 mt-3 mb-1">
          <h5 className="text-gray-700">Statement Descriptor</h5>
        </div>
        <div>
          <div className="flex flex-col w-full text-gray-500">
            <div className="flex justify-between mb-3 px-5 ">
              <span className="text-start">
                This will appear on your customer's bank or card statements. <br />
                AUTOMOTIVE 247 LLC
              </span>
              <span className="text-end text-blue-500">Change</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentSetting;
