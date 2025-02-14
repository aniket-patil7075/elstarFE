import { Checkbox, Dropdown, Input, Segment } from '@/components/ui'
import React, { ChangeEvent, SyntheticEvent } from 'react'

const FeesAndRates = () => {
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
  return (
    <div><h4 className=" text-xl ">Fees & Rates</h4>
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
    </div></div>
  )
}

export default FeesAndRates