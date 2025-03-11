import {
  Button,
  Checkbox,
  Dropdown,
  FormItem,
  Input,
  Segment,
} from "@/components/ui";
import React, { ChangeEvent, useEffect, useState } from "react";
import AddNewBrandModal from "../DealerSharedComponent/AddNewBrandModal";
import AddNewRatesModal from "./FeesAndRates/AddNewRatesModal";
import SelectAndButton from "@/components/ui/SelectAndButton";
import { ErrorMessage, FormikErrors, FormikTouched } from "formik";
import { useAppSelector } from "@/store";
import { getAllGeneralRate } from "../DealerLists/Services/DealerInventoryServices";

const FeesAndRates = ({
  onDataChange,
}: {
  onDataChange: (data: any) => void;
}) => {
  const [addRatesModelOpen, setAddRatesModelOpen] = useState(false);
  const [formData, setFormData] = useState({
    orderLevelCap: "",
    serviceValue: "",
    epa: "",
    tax: "",
    selectedDropdown: "Default",
    includeShopSuppliesOn: {
      parts: false,
      labor: false,
    },
    includeEPAOn: {
      parts: false,
      labor: false,
    },
    taxLaborRates: {
      parts: false,
      labor: false,
      epa: false,
      shopSupplies: false,
      subContract: false,
    },
  });
  const [allRates, setAllRates] = useState([]);

  const fetchGeneralRate = async () => {
    try {
      let response = await getAllGeneralRate();
      console.log("General Rate:", response);

      const formattedRates = response.allGeneralRate.map((rate) => ({
        label: `${rate.rateName} ($${rate.rate.toFixed(2)}/hr)`,
        value: rate._id,
      }));

      setAllRates(formattedRates);
    } catch (error) {
      console.error("Error fetching general rate:", error);
    }
  };

  useEffect(() => {
    fetchGeneralRate();
  }, []);

  const handleNewRateAdded = () => {
    fetchGeneralRate(); // Re-fetch rates when a new one is added
  };

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
          [key]: !prev[category as keyof typeof prev][key],
        },
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
              <Input
                name="orderLevelCap"
                value={formData.orderLevelCap}
                onChange={handleInputChange}
                placeholder="0.00 $"
                size="md"
              />
            </div>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">Service Value (%)</p>
            <div className="my-2 w-3/4">
              <Input
                name="serviceValue"
                value={formData.serviceValue}
                onChange={handleInputChange}
                placeholder="0.00 $"
                size="md"
              />
            </div>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">
              Include shop supplies on:
            </p>
            <div className="my-2 w-3/4">
              <div className="my-2">
                <Checkbox
                  checked={formData.includeShopSuppliesOn.parts}
                  onChange={() =>
                    handleCheckboxChange("includeShopSuppliesOn", "parts")
                  }
                >
                  Parts
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox
                  checked={formData.includeShopSuppliesOn.labor}
                  onChange={() =>
                    handleCheckboxChange("includeShopSuppliesOn", "labor")
                  }
                >
                  Labor
                </Checkbox>
              </div>
            </div>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">Select Rate:</p>
            <div className="my-2 w-3/4">
              <FormItem>
                <SelectAndButton
                  name="rate"
                  options={allRates} 
                  addNewButtonLabel="Add New Rate"
                  addNewClick={() => setAddRatesModelOpen(true)}
                  placeholder="Select or Add Rate"
                  className="mb-4"                  
                />
              </FormItem>

              {addRatesModelOpen && (
                <AddNewRatesModal
                  isOpen={addRatesModelOpen}
                  onClose={() => setAddRatesModelOpen(false)}
                  onRateAdded={handleNewRateAdded}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div>
            <p className="text-black font-semibold">EPA (%)</p>
            <div className="my-2 w-3/4">
              <Input
                name="epa"
                value={formData.epa}
                onChange={handleInputChange}
                placeholder="0.00 %"
                size="md"
              />
            </div>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">Include EPA on:</p>
            <div className="my-2 w-3/4">
              <div className="my-2">
                <Checkbox
                  checked={formData.includeEPAOn.parts}
                  onChange={() => handleCheckboxChange("includeEPAOn", "parts")}
                >
                  Parts
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox
                  checked={formData.includeEPAOn.labor}
                  onChange={() => handleCheckboxChange("includeEPAOn", "labor")}
                >
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
              <Input
                name="tax"
                value={formData.tax}
                onChange={handleInputChange}
                placeholder="0.00 %"
                size="md"
              />
            </div>
          </div>
          <div className="my-5">
            <p className="text-black font-semibold">Labor Rates:</p>
            <div className="my-2 w-3/4">
              <div className="my-2">
                <Checkbox
                  checked={formData.taxLaborRates.parts}
                  onChange={() =>
                    handleCheckboxChange("taxLaborRates", "parts")
                  }
                >
                  Parts
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox
                  checked={formData.taxLaborRates.labor}
                  onChange={() =>
                    handleCheckboxChange("taxLaborRates", "labor")
                  }
                >
                  Labor
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox
                  checked={formData.taxLaborRates.epa}
                  onChange={() => handleCheckboxChange("taxLaborRates", "epa")}
                >
                  EPA
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox
                  checked={formData.taxLaborRates.shopSupplies}
                  onChange={() =>
                    handleCheckboxChange("taxLaborRates", "shopSupplies")
                  }
                >
                  Shop Supplies
                </Checkbox>
              </div>
              <div className="my-2">
                <Checkbox
                  checked={formData.taxLaborRates.subContract}
                  onChange={() =>
                    handleCheckboxChange("taxLaborRates", "subContract")
                  }
                >
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
