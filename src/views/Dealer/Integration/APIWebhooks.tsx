import Switcher from "@/components/ui/Switcher";
import type { ChangeEvent } from "react";
import { HiBookOpen, HiPlus } from "react-icons/hi";

const APIWebhooks = () => {
  const onSwitcherToggle = (val: boolean, e: ChangeEvent) => {
    console.log(val, e);
  };
  return (
    <div>
      <div className="">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="mb-4 lg:mb-0 ">API</h3>
          </div>
          <div className="my-2 flex text-blue-600">
            <HiBookOpen className="text-xl me-1" />
            <p>Learn how to setup and use the API.</p>
          </div>
        </div>
        <div className="flex flex-wrap lg:w-2/3 border bg-gray-100 my-3">
          <div className="flex justify-between w-full">
            <h5 className="text-gray-700 mx-5 my-2">Enable API </h5>
            <div className="mx-5 my-2 flex justify-between ">
              <Switcher defaultChecked onChange={onSwitcherToggle} />
            </div>
          </div>
          <div>
            <p className="mx-5 mt-1 mb-2">
              Allow 3rd party intergrations to read and write data to your shop.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="mb-4 lg:mb-0 ">Webhooks</h3>
          </div>
          <div className="my-2 flex text-blue-600">
            <HiBookOpen className="text-xl me-1" />
            <p>Learn how to setup and manage WebhooksI.</p>
          </div>
        </div>
        <div className="border w-full lg:w-2/3 bg-gray-100">
          <div>
            <div className="flex flex-col w-full text-gray-500">
              <div className="flex justify-between py-3 px-5 ">
                <span className="text-start">Use webhooks to send real-time updates</span>
                <span className="text-end text-blue-500 cursor-pointer flex">
                  <HiPlus className="text-xl me-1" /> New Webhook
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIWebhooks;
