import AdaptableCard from "@/components/shared/AdaptableCard";
import RichTextEditor from "@/components/shared/RichTextEditor";
import Input from "@/components/ui/Input";
import { FormItem } from "@/components/ui/Form";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import {
  Field,
  FormikErrors,
  FormikTouched,
  FieldProps,
  FieldInputProps,
} from "formik";
import { useEffect, useState, type ComponentType } from "react";
import type { InputProps } from "@/components/ui/Input";
import { HiDocumentText, HiMail } from "react-icons/hi";
import { values } from "lodash";
import { Avatar, Button, Dropdown, Select } from "@/components/ui";
import VehiclesImage from "./VehiclesImage";
import SelectAndButton from "@/components/ui/SelectAndButton";
import {
  getAllCustomers,
  getAllVehicles,
} from "../../Services/DealerListServices";
import AddNewCustomerModal from "@/views/Dealer/DealerSharedComponent/AddNewCustomerModal";
import { useDispatch } from "react-redux";
import { setSelectedVehicle } from "@/views/Dealer/Workflow/store/vehicleSlice";

type FormFieldsName = {
  image?: string;
  year: number;
  make: string;
  customerName: string;
  model: string;
  subModel?: string;
  transmission?: string;
};

interface Customer {
  firstName: string;
  lastName: string;
  [key: string]: any;
}

interface Vehicle {
  _id: string;
  customerId: string;
  make: string;
  model: string;
  year: string;
  subModel?: string;
  licencePlate?: { plateNumber: string }[];
  value?: string;
  label?: JSX.Element;
  customers?: Customer[];
}

type BasicInfo = {
  touched: FormikTouched<FormFieldsName>;
  errors: FormikErrors<FormFieldsName>;
  setFieldValue: (field: any, value: any, shouldValidate?: boolean) => void;
  selectedVehicle: any;
};
const partInput = (props: InputProps) => {
  return <Input {...props} value={props.field.value} prefix="" />;
};

const NumberInput = (props: InputProps) => {
  return <Input {...props} value={props.field.value} />;
};

const NumericFormatInput = ({
  onValueChange,
  ...rest
}: Omit<NumericFormatProps, "form"> & {
  form: any;
  field: FieldInputProps<unknown>;
}) => {
  return (
    <NumericFormat
      customInput={Input as ComponentType}
      type="text"
      autoComplete="off"
      onValueChange={onValueChange}
      {...rest}
    />
  );
};

const BasicInfo = (props: BasicInfo) => {
  const { touched, errors, selectedVehicle, setFieldValue } = props;
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [addCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [vehicleOptions, setVehicleOptions] = useState<Vehicle[]>([]);
  const [yearInput, setYearInput] = useState("");
  const [makeInput, setMakeInput] = useState("");
  const [modelInput, setModelInput] = useState("");
  const [subModelInput, setSubModelInput] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const dispatch = useDispatch();

  // console.log("selected customer : ", selectedCustomer)

  const customerName = selectedCustomer
    ? `${selectedCustomer.firstName || ""} ${selectedCustomer.lastName || ""}`
    : "";

  const customerId =
    selectedCustomer && selectedCustomer._id ? selectedCustomer._id : "";

  useEffect(() => {
    if (selectedVehicle) {
      const mappedData = mapVehicleToForm(selectedVehicle);
      Object.entries(mappedData).forEach(([key, value]) =>
        setFieldValue(key, value)
      );
    }
  }, [selectedVehicle, setFieldValue]);

  const mapVehicleToForm = (vehicle: any) => ({
    image: "",
    year: vehicle.year,
    make: vehicle.make,
    customerName: vehicle.customerName,
    model: vehicle.model,
    subModel: vehicle.subModel,
    transmission: vehicle.transmission,
    engineSize: vehicle.engineSize,
    drivetrain: vehicle.drivetrain,
    type: vehicle.type,
    mileage: vehicle.mileage,
    licenceType: vehicle.licenceType,
    licenceNumber: vehicle.licenceNumber,
    licencePlate: vehicle.licenceType,
    unit: vehicle.unit,
    vin: vehicle.vin,
    color: vehicle.color,
    productiondate: vehicle.productiondate,
    note: vehicle.note,
    // Map other fields appropriately
  });

  const fetchVehicles = async () => {
    let response = await getAllVehicles();
    if (response?.status === "success") {
      setVehicleOptions(response.allVehicles);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  console.log("fetch vehicle : ", vehicleOptions);

  useEffect(() => {
    const filtered = vehicleOptions.filter(
      (vehicle) =>
        (String(vehicle.year ?? "").startsWith(yearInput) ||
          yearInput === "") &&
        (String(vehicle.make ?? "")
          .toLowerCase()
          .startsWith(makeInput.toLowerCase()) ||
          makeInput === "") &&
        (String(vehicle.model ?? "")
          .toLowerCase()
          .startsWith(modelInput.toLowerCase()) ||
          modelInput === "") &&
        (String(vehicle.subModel ?? "")
          .toLowerCase()
          .startsWith(subModelInput.toLowerCase()) ||
          subModelInput === "")
    );
    setFilteredVehicles(filtered);
  }, [yearInput, makeInput, modelInput, subModelInput, vehicleOptions]);

  console.log("Filtered Vehicles:", filteredVehicles);

  const handleChooseAction = (action: any, vehicleId: any) => {
    console.log("Action:", action);
    console.log("vehicle ID:", vehicleId);
    dispatch(setSelectedVehicle(vehicleId));
  };

  return (
    <AdaptableCard divider className="mb-2 p-4">
      {yearInput.trim() ||
      makeInput.trim() ||
      modelInput.trim() ||
      subModelInput.trim() ? (
        <div className="w-full border bg-indigo-100 text-indigo-600 font-bold py-1 mb-4 relative">
          <Dropdown
            title={
              filteredVehicles.length > 0
                ? `${filteredVehicles.length} ${filteredVehicles.length === 1 ? "vehicle" : "vehicles"} matches found `
                : "No vehicles found"
            }
            placement="bottom"
            menuStyle={{
              marginTop: "8px",
              minWidth: "480px",
              left: "0%",
              transform: "translateX(-50%)",
            }}
            onSelect={(val) => setSelectedVehicle(val)}
          >
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <Dropdown.Item
                  key={vehicle._id}
                  eventKey={vehicle._id}
                  className="p-2 w-full"
                >
                  <div className="flex items-center justify-between w-full">
                    <p className="font-semibold text-gray-900 flex-1 truncate">
                      {vehicle.year} {vehicle.make} {vehicle.model}{" "}
                      {vehicle.subModel}
                    </p>
                    <button
                      className="bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-indigo-500 transition"
                      onClick={() => handleChooseAction("choose", vehicle._id)}
                    >
                      Choose
                    </button>
                  </div>
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled className="p-2 text-gray-500 text-center">
                No vehicles found
              </Dropdown.Item>
            )}
          </Dropdown>
        </div>
      ) : null}
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
        {/* Image Section with Year and Make */}
        <div className="lg:w-1/2 w-full">
          <VehiclesImage setFieldValue={setFieldValue} />
        </div>

        {/* Year and Make Fields */}
        <div className="lg:w-1/2 w-full flex flex-col -space-y-2">
          <FormItem label="Year">
            <Field
              type="text"
              name="year"
              placeholder="2024"
              component={Input}
              className="border border-gray-300 p-1 rounded-md bg-slate-50"
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
            />
          </FormItem>

          <FormItem label="Make">
            <Field
              type="text"
              name="make"
              placeholder="Honda"
              component={Input}
              className="border border-gray-300 p-1 rounded-md bg-slate-50"
              value={makeInput}
              onChange={(e) => setMakeInput(e.target.value)}
            />
          </FormItem>
        </div>
      </div>

      {/* Model and Sub Model Fields - Full Width */}
      <div className="flex space-x-4 mt-2">
        <FormItem label="Model" className="w-1/2">
          <Field
            type="text"
            name="model"
            placeholder="Accord"
            component={Input}
            className="border border-gray-300 p-1 rounded-md bg-slate-50"
            value={modelInput}
            onChange={(e) => setModelInput(e.target.value)}
          />
        </FormItem>

        <FormItem label="Sub Model" className="w-1/2">
          <Field
            type="text"
            name="subModel"
            placeholder="Base"
            component={Input}
            className="border border-gray-300 p-1 rounded-md bg-slate-50"
            value={subModelInput}
            onChange={(e) => setSubModelInput(e.target.value)}
          />
        </FormItem>
      </div>

      {/* Transmission and Engine Size Fields - Full Width */}
      <div className="flex space-x-4 mt-2">
        <FormItem
          label="Transmission"
          labelClass="block text-gray-800 dark:text-white font-semibold mb-1"
          className="w-1/2"
        >
          <Field
            type="text"
            name="transmission"
            placeholder="Transmission"
            component={Input}
            className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
          />
        </FormItem>

        <FormItem
          label="Engine Size"
          labelClass="block text-gray-800 dark:text-white font-semibold mb-1"
          className="w-1/2"
        >
          <Field
            type="text"
            name="engineSize"
            placeholder="Engine Size"
            component={Input}
            className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
          />
        </FormItem>
      </div>

      {/* Drivetrain Field - Full Width */}
      <FormItem
        label="Drivetrain"
        labelClass="block text-gray-800 dark:text-white font-semibold mb-1"
        className="mt-0"
      >
        <Field
          type="text"
          name="type"
          placeholder="Vehicle Type"
          component={Input}
          className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
        />
      </FormItem>

      {/* {type & mileage} */}
      <div className="flex space-x-4 mt-2">
        <FormItem
          label="Type"
          labelClass="block text-gray-800 dark:text-white font-semibold mb-1"
          className="mt-0"
        >
          <Field
            type="text"
            name="drivetrain"
            placeholder="Select Drivetrain"
            component={Input}
            className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
          />
        </FormItem>

        <FormItem
          label="Mileage"
          labelClass="block text-gray-800 dark:text-white font-semibold mb-1"
          className="w-1/2"
        >
          <Field
            type="text"
            name="mileage"
            placeholder="1000 / km"
            component={Input}
            className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
          />
        </FormItem>
      </div>

      {/* {Licence Plate & Unit} */}
      <div className="flex space-x-4 mt-2">
        {/* Licence Plate Section */}
        <div className="w-1/2">
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Licence Plate:
          </label>
          <div className="flex space-x-2">
            {/* Licence Type Selector */}
            <FormItem className="w-1/3">
              <Field
                as="select"
                name="licenceType"
                className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50 h-11 w-full"
              >
                <option value="" disabled>
                  VA
                </option>
                <option value="mp">MP</option>
                <option value="up">UP</option>
                <option value="maharashtra">Maharashtra</option>
              </Field>
            </FormItem>

            {/* Licence Number Input */}
            <FormItem className="w-2/3">
              <Field
                type="text"
                name="licenceNumber"
                placeholder="BA1234"
                component={Input}
                className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50 h-11 w-full"
              />
            </FormItem>
          </div>
        </div>

        {/* Unit # Section */}
        <div className="w-1/2">
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Unit #:
          </label>
          <FormItem>
            <Field
              type="text"
              name="unit"
              placeholder="BA1234"
              component={Input}
              className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50 h-11 w-full"
            />
          </FormItem>
        </div>
      </div>

      {/* VIN */}
      <FormItem
        label="VIN"
        labelClass="block text-gray-800 dark:text-white font-semibold mb-1"
        className="mt-0"
      >
        <Field
          type="text"
          name="vin"
          placeholder="19UYA8946598"
          component={Input}
          className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
        />
      </FormItem>

      {/* Color & Production Date */}

      <div className="flex space-x-4 mt-2">
        <FormItem
          label="Color"
          labelClass="block text-gray-800 dark:text-white font-semibold mb-1"
          className="w-1/2"
        >
          <Field
            type="text"
            name="color"
            placeholder="Red"
            component={Input}
            className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
          />
        </FormItem>

        <FormItem
          label="Production Date"
          labelClass="block text-gray-800 dark:text-white font-semibold mb-1"
          className="w-1/2"
        >
          <Field
            type="text"
            name="productiondate"
            placeholder="01/12/2024"
            component={Input}
            className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
          />
        </FormItem>
      </div>

      {/* Notes */}
      <FormItem
        label="Notes"
        labelClass="block text-gray-800 dark:text-white font-semibold mb-1"
      >
        <Field
          as="textarea"
          name="note"
          placeholder="Add a note..."
          rows={3}
          className="w-full bg-slate-50 border border-gray-300 outline-none p-1 rounded-md focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </FormItem>

      {/* Tag FormItem */}
      <FormItem
        label="Tag"
        labelClass="block text-gray-800 dark:text-white font-semibold mb-1"
      >
        <button
          type="button"
          onClick={() => setIsTagDialogOpen(true)}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>+</span> Add Tag
        </button>
      </FormItem>

      <div>
        {/* <SelectAndButton
          options={customerOptions}
          addNewButtonLabel="Add New Customer"
          value={selectedCustomer}
          onChange={(value: any) => setSelectedCustomer(value)}
          placeholder="Add Customer..."
          addNewClick={() => setAddCustomerModalOpen(!addCustomerModalOpen)}
          className="mb-4 mr-12 w-[256px]"
        /> */}
      </div>

      {/* Tag Dialog */}
      {isTagDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setIsTagDialogOpen(false)}
        >
          <div
            className="bg-gray-50 p-6 rounded-md shadow-lg w-96 z-60 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
          >
            <h2 className="text-lg font-medium mb-4">Add Tag</h2>
            <FormItem label="Tag Name">
              <Input placeholder="" className=" bg-slate-100" />
            </FormItem>
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setIsTagDialogOpen(false)}>Cancel</Button>
              <Button variant="solid" onClick={() => setIsTagDialogOpen(false)}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdaptableCard>
  );
};

export default BasicInfo;
