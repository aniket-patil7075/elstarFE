

import { Checkbox, Dropdown, Input, Segment } from '@/components/ui'
import React, { ChangeEvent, useState } from 'react'

const FeesAndRates = ({ onDataChange }: { onDataChange: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    orderLevelCap: "",
    serviceValue: "",
    epa: "",
    tax: "",
    selectedDropdown: "Default",
    includeShopSuppliesOn: {
      parts: false,
      labor: false
    },
    includeEPAOn: {
      parts: false,
      labor: false
    },
    taxLaborRates: {
      parts: false,
      labor: false,
      epa: false,
      shopSupplies: false,
      subContract: false
    }
  });

  const dropdownItems = [
    { key: "a", name: "Inc ($125.00/hrs)" },
    { key: "b", name: "DEFAULT ($185.00/hrs)" },
    { key: "c", name: "Body work ($95.00/hrs)" },
    { key: "d", name: "Electrical ($285.00/hrs)" },
    { key: "e", name: "Warranty ($188.00/hrs)" },
    { key: "f", name: "Z W ($105.00/hrs)" },
    { key: "g", name: "german new rate ($275.00/hrs)" },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      onDataChange(updatedData);
      return updatedData;
    });
  };

  const onDropdownItemClick = (eventKey: string) => {
    setFormData((prev) => {
      const updatedData = { ...prev, selectedDropdown: eventKey };
      onDataChange(updatedData);
      return updatedData;
    });
  };

  const handleCheckboxChange = (category: string, key: string) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [key]: !prev[category as keyof typeof prev][key]
        }
      };
      onDataChange(updatedData);
      return updatedData;
    });
  };

  return (
    <div>
      <h4 className="text-xl border-b-2 border-gray-300 pb-2">Fees & Rates</h4>
      <div className="flex flex-col xl:flex-row w-full my-3">
        <div className="w-full md:w-1/3">
          <div>
            <p className="text-black font-semibold">Shop Supplies</p>
            <Segment className="my-2" size="md">
              <Segment.Item value="left">No Cap</Segment.Item>
              <Segment.Item value="center">Order Cap</Segment.Item>
            </Segment>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">Order Level Cap ($)</p>
            <div className="my-2 w-3/4">
              <Input name="orderLevelCap" value={formData.orderLevelCap} onChange={handleInputChange} placeholder="0.00 $" size="md" />
            </div>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">Service Value (%)</p>
            <div className="my-2 w-3/4">
              <Input name="serviceValue" value={formData.serviceValue} onChange={handleInputChange} placeholder="0.00 $" size="md" />
            </div>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">Include shop supplies on:</p>
            <div className="my-2 w-3/4">
              <div className="my-2">
                <Checkbox checked={formData.includeShopSuppliesOn.parts} onChange={() => handleCheckboxChange("includeShopSuppliesOn", "parts")}>
                  Parts
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox checked={formData.includeShopSuppliesOn.labor} onChange={() => handleCheckboxChange("includeShopSuppliesOn", "labor")}>
                  Labor
                </Checkbox>
              </div>
            </div>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">Select Rate:</p>
            <div className="my-2 w-3/4">
              <div className="w-full border bg-white">
                <Dropdown title={formData.selectedDropdown} className="bg-white">
                  {dropdownItems.map((item) => (
                    <Dropdown.Item key={item.key} eventKey={item.key} onSelect={() => onDropdownItemClick(item.name)}>
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
            <p className="text-black font-semibold">EPA (%)</p>
            <div className="my-2 w-3/4">
              <Input name="epa" value={formData.epa} onChange={handleInputChange} placeholder="0.00 %" size="md" />
            </div>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">Include EPA on:</p>
            <div className="my-2 w-3/4">
              <div className="my-2">
                <Checkbox checked={formData.includeEPAOn.parts} onChange={() => handleCheckboxChange("includeEPAOn", "parts")}>
                  Parts
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox checked={formData.includeEPAOn.labor} onChange={() => handleCheckboxChange("includeEPAOn", "labor")}>
                  Labor
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div>
            <p className="text-black font-semibold">Tax (%)</p>
            <div className="my-2 w-3/4">
              <Input name="tax" value={formData.tax} onChange={handleInputChange} placeholder="0.00 %" size="md" />
            </div>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">Labor Rates:</p>
            <div className="my-2 w-3/4">
              <div className="my-2">
                <Checkbox checked={formData.taxLaborRates.parts} onChange={() => handleCheckboxChange("taxLaborRates", "parts")}>
                  Parts
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox checked={formData.taxLaborRates.labor} onChange={() => handleCheckboxChange("taxLaborRates", "labor")}>
                  Labor
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox checked={formData.taxLaborRates.epa} onChange={() => handleCheckboxChange("taxLaborRates", "epa")}>
                  EPA
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox checked={formData.taxLaborRates.shopSupplies} onChange={() => handleCheckboxChange("taxLaborRates", "shopSupplies")}>
                  Shop Supplies
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox checked={formData.taxLaborRates.subContract} onChange={() => handleCheckboxChange("taxLaborRates", "subContract")}>
                  Sub Contract
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesAndRates;
