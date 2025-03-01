import { Dropdown, Input } from "@/components/ui";
import React, {ChangeEvent, useState } from "react";
import Upload from "@/components/ui/Upload";
import Button from "@/components/ui/Button";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { FcImageFile } from "react-icons/fc";

const GeneralData = ({
  onDataChange,
}: {
  onDataChange: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    url: "",
    email: "",
    phone: "",
    selectedDropdown: "Default",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const dropdownItems = [
    { key: "tz1", name: "America/New_York" },
    { key: "tz2", name: "America/Chicago" },
    { key: "tz3", name: "America/Denver" },
    { key: "tz4", name: "America/Los_Angeles" },
    { key: "tz9", name: "America/Mexico_City" },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      onDataChange(updatedData);
      return updatedData;
    });
  };

  const onDropdownItemClick = (eventKey:any) => {
    setFormData((prev) => {
      const updatedData = { ...prev, selectedDropdown: eventKey };
      onDataChange(updatedData);
      return updatedData;
    });
  };


  return (
    <div>
      <h4 className="text-xl border-b-2 border-gray-300 pb-2">General Data</h4>
      <div className="flex flex-col xl:flex-row w-full my-3 border-b-2 border-gray-300">
        <div className="w-full md:w-1/2">
          <div className="my-2">
            <p className="text-black font-semibold">Full Name</p>
            <div className="my-2 w-3/4">
              <Input
                name="fullName"
                placeholder="Full Name"
                size="md"
                onChange={handleChange}
                value={formData.fullName}
              />
            </div>
          </div>
          <div className="my-2">
            <p className="text-black font-semibold">URL</p>
            <div className="my-2 w-3/4">
              <Input
                name="url"
                placeholder="https://example.com"
                size="md"
                onChange={handleChange}
                value={formData.url}
              />
            </div>
          </div>
          <div className="my-2">
            <p className="text-black font-semibold">Email</p>
            <div className="my-2 w-3/4">
              <Input
                name="email"
                placeholder="abc@test.com"
                size="md"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>
          <div className="my-2">
            <p className="text-black font-semibold">Phone</p>
            <div className="my-2 w-3/4">
              <Input
                name="phone"
                placeholder="9999888822"
                size="md"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>
          </div>
          <div className="my-2">
            <p className="text-black font-semibold">Time Zone</p>
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
          <div className="my-5">
            <p className="text-blue-600 underline">Add Certification</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-4">
          <div className="my-5">
            <Upload draggable>
              <div className="my-16 text-center">
                <div className="text-6xl mb-4 flex justify-center">
                  <FcImageFile />
                </div>
                <p className="font-semibold">
                  <span className="text-gray-800 dark:text-white">
                    Drop your image here, or{" "}
                  </span>
                  <span className="text-blue-500">browse</span>
                </p>
                <p className="mt-1 opacity-60 dark:text-white">
                  Support: jpeg, png, gif
                </p>
              </div>
            </Upload>
          </div>
          <div>
            <Upload>
              <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                Upload your file
              </Button>
            </Upload>
          </div>
        </div>
      </div>

      <h4 className="text-xl pb-2">Address</h4>
      <div className="flex flex-col xl:flex-row w-full my-3">
        <div className="w-full md:w-1/2">
          <div className="my-2">
            <p className="text-black font-semibold">Address 1</p>
            <div className="my-2 w-3/4">
              <Input
                name="address1"
                placeholder="7600 CENTREVILLE ROAD"
                size="md"
                onChange={handleChange}
                value={formData.address1}
              />
            </div>
          </div>
          <div className="my-2">
            <p className="text-black font-semibold">City</p>
            <div className="my-2 w-3/4">
              <Input
                name="city"
                placeholder="Manassas"
                size="md"
                onChange={handleChange}
                value={formData.city}
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="my-2">
            <p className="text-black font-semibold">Address 2</p>
            <div className="my-2 w-3/4">
              <Input
                name="address2"
                placeholder=""
                size="md"
                onChange={handleChange}
                value={formData.address2}
              />
            </div>
          </div>
          <div className="my-2 flex flex-col xl:flex-row">
            <div className="w-full md:w-1/2">
              <p className="text-black font-semibold">State</p>
              <div className="my-2 w-1/2">
                <Input
                  name="serviceValue"
                  placeholder="VA"
                  size="md"
                  onChange={handleChange}
                  value={formData.state}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-black font-semibold">Zip Code</p>
              <div className="my-2 w-1/2">
                <Input
                  name="serviceValue"
                  placeholder="20111"
                  size="md"
                  onChange={handleChange}
                  value={formData.zipCode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralData;
