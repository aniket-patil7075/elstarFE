import { Checkbox, Dropdown, Input, Segment } from "@/components/ui";
import React, { ChangeEvent, useState } from "react";

const VehicleSetting = ({
  onDataChange,
}: {
  onDataChange: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    selectedDropdown: "Default",
  });

  const dropdownItems = [
    { key: "vt1", name: "Sedan" },
    { key: "vt2", name: "SUV" },
    { key: "vt3", name: "Truck" },
    { key: "vt4", name: "Coupe" },
    { key: "vt5", name: "Convertible" },
    { key: "vt6", name: "Hatchback" },
    { key: "vt7", name: "Van" },
    { key: "vt8", name: "Motorcycle" },
    { key: "vt9", name: "Electric Vehicle" },
    { key: "vt10", name: "Hybrid" }
  ];
  

  const onDropdownItemClick = (eventKey: string) => {
    setFormData((prev) => {
      const updatedData = { ...prev, selectedDropdown: eventKey };
      onDataChange(updatedData);
      return updatedData;
    });
  };

  return (
    <div>
      <h4 className="text-xl border-b-2 border-gray-300 pb-2">
        Vehicle Settings
      </h4>
      <div className="flex flex-col xl:flex-row w-full ">
        <div className="w-full">
          <div className="">
            <p className="w-full md:w-3/4 my-4">
              Vehicle types define which vehicles are used in your shop. These
              types are used when creating and editing a vehicle
            </p>
            <div className="my-2 w-3/4">
              <div className="w-full border bg-white">
                <Dropdown
                  title={formData.selectedDropdown}
                  className="bg-white"
                >
                  {dropdownItems.map((item) => (
                    <Dropdown.Item
                      key={item.key}
                      eventKey={item.key}
                      onSelect={() => onDropdownItemClick(item.name)}
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSetting;
