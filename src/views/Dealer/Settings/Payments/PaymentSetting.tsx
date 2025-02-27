import Switcher from "@/components/ui/Switcher";
import type { ChangeEvent } from "react";
import { HiCreditCard, HiOutlineCreditCard } from "react-icons/hi";

const PaymentSetting = () => {
  const onSwitcherToggle = (val: boolean, e: ChangeEvent) => {
    console.log(val, e);
  };
  return (
    <div>
      <div className="border w-full lg:w-2/3 bg-gray-100">
        <div className="mx-5 my-3">
          <h5 className="text-gray-700">Account</h5>
        </div>
        <div>
          <div className="flex flex-col w-full text-gray-500">
            <div className="flex justify-between py-3 px-5 ">
              <span className="text-start">automotive24777@gmail.com</span>
              <span className="text-end text-blue-500 border-b border-dashed border-blue-400">
                Update Account
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex flex-wrap lg:w-2/3 border bg-gray-100 my-4">
          <div className="flex justify-between w-full">
            <h5 className="text-gray-700 mx-5 my-2">Rates</h5>
            <div className="mx-5 my-2 flex justify-between ">
              <p className="me-2">Accept Amex </p>
              <Switcher defaultChecked onChange={onSwitcherToggle} />
            </div>
          </div>
          <div className="w-full  lg:w-1/3  p-4 ">
            <p>
              {" "}
              <span className="text-gray-700 font-bold">All cards</span>{" "}
              excluding amex
            </p>
            <div className="flex">
              <span>
                <HiCreditCard className="text-xl mx-1" />
              </span>
              <span>
                <HiOutlineCreditCard className="text-xl mx-1" />
              </span>{" "}
              <span>+more </span>
            </div>
          </div>
          <div className="w-full  lg:w-1/3 p-4 ">
            <p className="text-green-600">2.9% +30</p>
            <p>per online transaction</p>
          </div>
          <div className="w-full  lg:w-1/3 p-4 ">
            <p className="text-green-600">2.9% +30</p>
            <p>per in-person transaction (clever)</p>
          </div>{" "}
          <div className="w-full  lg:w-1/3  p-4 ">
            <p className="text-gray-700 font-bold">Amex Cards</p>
            <HiCreditCard className="text-xl" />
          </div>
          <div className="w-full  lg:w-1/3 p-4 ">
            <p className="text-green-600">2.9% +30</p>
            <p>per online transaction</p>
          </div>
          <div className="w-full  lg:w-1/3 p-4 ">
            <p className="text-green-600">2.9% +30</p>
            <p>per in-person transaction</p>
          </div>
        </div>
      </div>

      <div className="border w-full lg:w-2/3 my-4 bg-gray-100">
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
            <span className="text-end text-blue-500 border-b border-dashed border-blue-400">
              Go to QuickBooks Settings
            </span>
          </div>
        </div>
      </div>

      

      <div className="border w-full lg:w-2/3 my-4 bg-gray-100">
        <div className="mx-5 mt-3 mb-1">
          <h5 className="text-gray-700">Statement Descriptor</h5>
        </div>
        <div>
          <div className="flex flex-col w-full text-gray-500">
            <div className="flex justify-between mb-3 px-5 ">
              <span className="text-start">
                This will appear on your customer's bank or card statements.{" "}
                <br />
                AUTOMOTIVE 247 LLC
              </span>
              <span className="text-end text-blue-500 ">Change</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSetting;
