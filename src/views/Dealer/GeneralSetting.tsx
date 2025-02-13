import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Segment,
  Switcher,
} from "@/components/ui";
import React, { ChangeEvent, SyntheticEvent } from "react";
import {
  HiClock,
  HiCube,
  HiDownload,
  HiOutlineSearch,
  HiUser,
} from "react-icons/hi";

const GeneralSetting = () => {
  const dropdownItems = [
    { key: "a", name: "Inc ($125.00/hrs)" },
    { key: "b", name: "DEFAULT ($185.00/hrs)" },
    { key: "c", name: "Body work ($95.00/hrs)" },
    { key: "d", name: "Electrical ($285.00/hrs)" },
    { key: "e", name: "Warranty ($188.00/hrs)" },
    { key: "f", name: "Z W ($105.00/hrs)" },
    { key: "g", name: "german new rate ($275.00/hrs)" },
  ];

  const onDropdownItemClick = (eventKey: string, e: SyntheticEvent) => {
    console.log("Dropdown Item Clicked", eventKey, e);
  };

  const onDropdownClick = (e: SyntheticEvent) => {
    console.log("Dropdown Clicked", e);
  };
  const onCheck = (value: boolean, e: ChangeEvent<HTMLInputElement>) => {
    console.log(value, e);
  };
  const onSwitcherToggle = (val: boolean, e: ChangeEvent) => {
    console.log(val, e);
  };

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
          <h4 className=" text-xl ">Fees & Rates</h4>
          <div className="flex flex-col xl:flex-row w-full my-3">
            <div className="w-full md:w-1/3">
              <div>
                <p className=" text-black font-semibold">Shop Supplies</p>
                <Segment className="my-2" size="md">
                  <Segment.Item value="left">No Cap</Segment.Item>
                  <Segment.Item value="center">Order Cap</Segment.Item>
                </Segment>
              </div>
              <div className="my-5">
                <p className="  text-black font-semibold">
                  Order Level Cap ($)
                </p>
                <div className="my-2 w-3/4">
                  <Input placeholder="0.00 $" size="md" />
                </div>
              </div>
              <div className="my-5">
                <p className="  text-black font-semibold">Service Value (%)</p>
                <div className="my-2 w-3/4">
                  <Input placeholder="0.00 $" size="md" />
                </div>
              </div>
              <div className="my-5">
                <p className="  text-black font-semibold">
                  Include shop supplies on :{" "}
                </p>
                <div className="my-2 w-3/4">
                  <div className="my-2">
                    <Checkbox defaultChecked onChange={onCheck}>
                      Parts
                    </Checkbox>
                  </div>
                  <div className="my-2">
                    <Checkbox defaultChecked onChange={onCheck}>
                      Labor
                    </Checkbox>
                  </div>
                </div>
              </div>
              <div className="my-5">
                <p className="  text-black font-semibold">
                  Include shop supplies on :{" "}
                </p>
                <div className="my-2 w-3/4">
                  <div className="w-full border bg-white">
                    <Dropdown
                      title="Default"
                      onClick={onDropdownClick}
                      className="bg-white"
                    >
                      {dropdownItems.map((item) => (
                        <Dropdown.Item
                          key={item.key}
                          eventKey={item.key}
                          onSelect={onDropdownItemClick}
                        >
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div>
                <p className="  text-black font-semibold">EPA (%)</p>
                <div className="my-2 w-3/4">
                  <Input placeholder="0.00 %" size="md" />
                </div>
              </div>
              <div className="my-5">
                <p className="  text-black font-semibold">Include EPA on : </p>
                <div className="my-2 w-3/4">
                  <div className="my-2">
                    <Checkbox defaultChecked onChange={onCheck}>
                      Parts
                    </Checkbox>
                  </div>
                  <div className="my-2">
                    <Checkbox defaultChecked onChange={onCheck}>
                      Labor
                    </Checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div>
                <p className="  text-black font-semibold">Tax (%)</p>
                <div className="my-2 w-3/4">
                  <Input placeholder="0.00 %" size="md" />
                </div>
              </div>
              <div className="my-5">
                <p className="  text-black font-semibold">Labor Rates : </p>
                <div className="my-2 w-3/4">
                  <div className="my-2">
                    <Checkbox defaultChecked onChange={onCheck}>
                      Parts
                    </Checkbox>
                  </div>
                  <div className="my-2">
                    <Checkbox defaultChecked onChange={onCheck}>
                      Labor
                    </Checkbox>
                  </div>
                  <div className="my-2">
                    <Checkbox defaultChecked onChange={onCheck}>
                      EPA
                    </Checkbox>
                  </div>
                  <div className="my-2">
                    <Checkbox defaultChecked onChange={onCheck}>
                      Shop Supplies
                    </Checkbox>
                  </div>
                  <div className="my-2">
                    <Checkbox defaultChecked onChange={onCheck}>
                      SubContract
                    </Checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full mt-7">
        <div className="w-full lg:w-3/4 p-4 p-5 border bg-gray-100">
          <h4 className="text-xl border-b-2 border-gray-300 pb-2">
            Fees & Rates
          </h4>
          <div className="flex flex-col xl:flex-row w-full my-3">
            <div className="w-full">
              <div className="my-5">
                <p className="  text-black font-semibold">Assignment Display</p>
                <div className="my-2 w-3/4">
                  <p>
                    Choose the types of assignments to display when you choose
                    Assignments in the right panel of an order or when prompted
                    for missing assignments before invoicing (see below). If you
                    want to ensure the Service Writer and all labor items have
                    been assigned, choose both Service Writer and Labor for
                    Techs.
                  </p>
                  <div className="mt-4 inline-flex flex-wrap xl:flex gap-3">
                    <Button className="flex">
                      <HiUser className="text-xl me-2" />
                      Service Writer
                    </Button>
                    <Button className="flex">
                      {" "}
                      <HiClock className="text-xl me-2" /> Labor for Techs
                    </Button>
                    <Button className="flex">
                      {" "}
                      <HiCube className="text-xl me-2" /> Parts for Techs
                    </Button>
                  </div>
                </div>
              </div>
              <h4 className="text-xl border-b-2 border-gray-300 py-4"></h4>
              <div className="my-5">
                <p className="  text-black font-semibold">
                  Prompt for missing assignments before invoicing
                </p>
                <div className="my-2 w-100 flex justify-between">
                  <p className="w-3/4">
                    If any item is not assigned, prompt when converting an order
                    to an invoice. This will happen on an order and in Workflow.
                  </p>
                  <div>
                    <Switcher defaultChecked onChange={onSwitcherToggle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full mt-7">
        <div className="w-full lg:w-3/4 p-4 p-5 border bg-gray-100">
          <h4 className="text-xl border-b-2 border-gray-300 pb-2">
            Customer Authorization
          </h4>
          <div className="flex flex-col xl:flex-row w-full my-3">
            <div className="w-full">
              <div className="my-5">
                <p className="  text-black font-semibold">
                  show Inspection Authorization Actions
                </p>
                <div className="my-2 w-100 flex justify-between">
                  <p className="w-3/4">
                    Show authorize and decline actions per inspection item that
                    needs attention. This is visible to you and to your
                    customers.
                  </p>
                  <div>
                    <Switcher defaultChecked onChange={onSwitcherToggle} />
                  </div>
                </div>
              </div>

              <h4 className="text-xl border-b-2 border-gray-300"></h4>

              <div className="my-5">
                <div className="my-2 w-100 flex justify-between">
                  <p className="  text-black font-semibold">
                    show Inspection Authorization Actions
                  </p>

                  <div>
                    <Switcher defaultChecked onChange={onSwitcherToggle} />
                  </div>
                </div>
              </div>

              <h4 className="text-xl border-b-2 border-gray-300 "></h4>

              <div className="my-5">
                <p className="  text-black font-semibold">
                  show Inspection Authorization Actions
                </p>
                <div className="my-2 w-100 flex justify-between">
                  <p className="w-3/4">
                    Show authorize and decline actions per inspection item that
                    needs attention. This is visible to you and to your
                    customers.
                  </p>
                  <div>
                    <Switcher defaultChecked onChange={onSwitcherToggle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full mt-7">
        <div className="w-full lg:w-3/4 p-4 p-5 border bg-gray-100">
          <h4 className="text-xl border-b-2 border-gray-300 pb-2">
            E-Signature Settings
          </h4>
          <div className="flex flex-col xl:flex-row w-full my-3">
            <div className="w-full">
              <div className="my-5">
                <p className="  text-black font-semibold">
                  Request e-signature on first estimate authorization
                </p>
                <div className="my-2 w-100 flex justify-between">
                  <p className="w-3/4">
                    The first estimate authorization requested from a customer
                    will have e-signature enabled by default.
                  </p>
                  <div>
                    <Switcher defaultChecked onChange={onSwitcherToggle} />
                  </div>
                </div>
              </div>

              <h4 className="text-xl border-b-2 border-gray-300 "></h4>

              <div className="my-5">
                <p className="  text-black font-semibold">
                  Request e-signature on all estimate authorizations
                </p>
                <div className="my-2 w-100 flex justify-between">
                  <p className="w-3/4">
                    All subsequent estimate authorizations requested from a
                    customer will have e-signature enabled by default
                  </p>
                  <div>
                    <Switcher defaultChecked onChange={onSwitcherToggle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full mt-7">
        <div className="w-full lg:w-3/4 p-4 p-5 border bg-gray-100">
          <h4 className="text-xl border-b-2 border-gray-300 pb-2">
            Mileage & Engine Hour Requirements
          </h4>
          <div className="flex flex-col xl:flex-row w-full mt-3">
            <div className="w-full">
              <div className="my-2">
                <div className="my-2 w-100 flex justify-between">
                  <p className="  text-black font-semibold">
                    Require mileage or engine hours before invoicing
                  </p>

                  <div>
                    <Switcher defaultChecked onChange={onSwitcherToggle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full mt-7">
        <div className="w-full lg:w-3/4 p-4 p-5 border bg-gray-100">
          <h4 className="text-xl border-b-2 border-gray-300 pb-2">
            Estimate & Invoice Line Items
          </h4>
          <div className="flex flex-col xl:flex-row w-full my-3">
            <div className="w-full">
              <div className="my-5">
                <p className="  text-black font-semibold">
                  Require a category for each line item before invoicing
                </p>
                <div className="my-2 w-100 flex justify-between">
                  <p className="w-3/4">
                    When converting to an invoice, you will be prompted to
                    include any missing categories for line items that will be
                    included on the final invoice.
                  </p>
                  <div>
                    <Switcher defaultChecked onChange={onSwitcherToggle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-4 "></div>
      </div>
    </div>
  );
};

export default GeneralSetting;
