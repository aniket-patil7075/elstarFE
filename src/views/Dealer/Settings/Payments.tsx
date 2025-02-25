import Switcher from "@/components/ui/Switcher";
import type { ChangeEvent } from "react";
import Tabs from "@/components/ui/Tabs";
import PaymentTransaction from "./Payments/PaymentTransaction";
import PaymentPayout from "./Payments/PaymentPayout";
import PaymentReaders from "./Payments/PaymentReaders";
import PaymentSetting from "./Payments/PaymentSetting";
const { TabNav, TabList, TabContent } = Tabs;

const Payments = () => {
  const onSwitcherToggle = (val: boolean, e: ChangeEvent) => {
    console.log(val, e);
  };
  return (
    <div >
      <div className="mb-5 ms-2 ">
        <div className="flex items-center justify-between">
          <h3 className="mb-4 lg:mb-0 ">Payments</h3>
          <div className="flex items-center justify-between">
            <p className="me-2">Enable Payments </p>
            <Switcher defaultChecked onChange={onSwitcherToggle} />
          </div>
        </div>
        <div className="my-2">
          <p className="text-gray-700">
            Elstar Payments makes accepting credit cards simple for you and your
            customers , whether in-person via a card reader or online from an
            invoice.
          </p>
          <p className="text-gray-700">
            Online Payments - <span className="text-red-500">Off</span>
          </p>
          <p className="text-gray-700">
            In-Person Payments -{" "}
            <span className="text-blue-500">
              Connect a reader to get started
            </span>
          </p>
          <p className="text-gray-700">
            Payouts - <span className="text-red-500">Off</span>
          </p>
        </div>
      </div>
      {/* <div>
        <Tabs defaultValue="tab1">
          <TabList>
            <TabNav value="tab1">Transactions</TabNav>
            <TabNav value="tab2">Payouts</TabNav>
            <TabNav value="tab3">Readers</TabNav>
            <TabNav value="tab4">Settings</TabNav>
          </TabList>
          <div className="p-4">
            <TabContent value="tab1">
              <PaymentTransaction />
            </TabContent>
            <TabContent value="tab2">
              <PaymentPayout />
            </TabContent>
            <TabContent value="tab3">
              <PaymentReaders />
            </TabContent>
            <TabContent value="tab4">
              <PaymentSetting />
            </TabContent>
          </div>
        </Tabs>
      </div> */}
    </div>
  );
};

export default Payments;
