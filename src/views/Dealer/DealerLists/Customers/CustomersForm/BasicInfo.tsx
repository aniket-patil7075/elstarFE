import AdaptableCard from "@/components/shared/AdaptableCard";
import Input from "@/components/ui/Input";
import { FormItem } from "@/components/ui/Form";
import {
  Field,
  FieldArray,
  FormikErrors,
  FormikTouched,
  FormikProps,
  Formik,
  useFormikContext,
} from "formik";
import { useEffect, useState } from "react";
import { HiDocumentText, HiMail, HiX } from "react-icons/hi";
import * as Yup from "yup";
import { Button, Dropdown } from "@/components/ui";
import FeesInfo from "./FeesInfo";
import { getAllCustomers } from "../../Services/DealerListServices";
import SelectAndButton from "@/components/ui/SelectAndButton";
import { useDispatch } from "react-redux";
import { setSelectedCustomer } from "@/views/Dealer/Workflow/store/customerSlice";
// import AdditionInfo from './AdditionalInfo'

export type FormFieldsName = {
  // Basic Info
  firstName: string;
  lastName: string;
  phoneNumber: Array<{
    type: string;
    number: number;
  }>;
  email: string[];
  preferredContactMethod: string;
  tags?: string;
  note?: string;
  referralSource?: string;
  company?: string;
  fleet?: string;
  paymentTerms?: string;
  customerAddress: {
    country: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required("Phone type is required"),
        number: Yup.string().required("Phone number is required"),
      })
    )
    .min(1, "At least one phone number is required"),
  email: Yup.array()
    .of(Yup.string().required("Email is required"))
    .min(1, "At least one email is required"),
  preferredContactMethod: Yup.string(),
  tags: Yup.string(),
  note: Yup.string(),
  referralSource: Yup.string(),
  company: Yup.string(),
  fleet: Yup.string(),
  paymentTerms: Yup.string(),
  address1: Yup.string(),
  address2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zipCode: Yup.string(),
});

type BasicInfo = {
  touched: FormikTouched<FormFieldsName>;
  errors: FormikErrors<FormFieldsName>;
};

const BasicInfo = ({ touched, errors, handleClick }: BasicInfo) => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isReferralDialogOpen, setIsReferralDialogOpen] = useState(false);
  const [isFleetDialogOpen, setIsFleetDialogOpen] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [phoneInput, setPhoneInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const dispatch = useDispatch();

  const fetchCustomers = async () => {
    try {
      let response = await getAllCustomers(); // Assuming this API returns the object you logged
      if (
        response.status === "success" &&
        Array.isArray(response.allCustomers)
      ) {
        setCustomerOptions(response.allCustomers);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  console.log("All customers : ", customerOptions);

  useEffect(() => {
    const filtered = customerOptions.filter(
      (customer) =>
        (String(customer.phoneNumber?.[0]?.number ?? "").startsWith(
          phoneInput
        ) ||
          phoneInput === "") &&
        (String(customer.firstName ?? "")
          .toLowerCase()
          .startsWith(firstNameInput.toLowerCase()) ||
          firstNameInput === "") &&
        (String(customer.lastName ?? "")
          .toLowerCase()
          .startsWith(lastNameInput.toLowerCase()) ||
          lastNameInput === "") &&
        (String(customer.email ?? "")
          .toLowerCase()
          .startsWith(emailInput.toLowerCase()) ||
          emailInput === "")
    );
    setFilteredCustomers(filtered);
  }, [phoneInput, firstNameInput, lastNameInput, emailInput, customerOptions]);

  console.log("filterd customer : ", filteredCustomers);

  const [formValues, setFormValues] = useState<FormFieldsName>({
    firstName: "",
    lastName: "",
    phoneNumber: [{ type: "mobile", number: 7610325104 }], // `number` is initialized with 0
    email: [""],
    preferredContactMethod: "",
    tags: "",
    note: "",
    referralSource: "",
    company: "",
    fleet: "",
    paymentTerms: "",
    customerAddress: {
      country: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  // console.log("Basic Info : ", formValues)

  const handleAddPhone = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      phoneNumber: [
        ...prevValues.phoneNumber,
        { type: "", number: 7610325104 },
      ],
    }));
  };

  const handleRemovePhone = (index: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      phoneNumber: prevValues.phoneNumber.filter((_, i) => i !== index),
    }));
  };

  const handleAddEmail = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      email: [...prevValues.email, ""],
    }));
  };

  const handleRemoveEmail = (index: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      email: prevValues.email.filter((_, i) => i !== index),
    }));
  };

  const handleChooseAction = (action: any, customerId: any) => {
    console.log("Action:", action);
    console.log("Customer ID:", customerId);
    dispatch(setSelectedCustomer(customerId));

    if (handleClick) {
      handleClick();
    }
  };

  const { values, setFieldValue } = useFormikContext();
  // Update both Formik state and local state when input changes
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstNameInput(value); // Update local state for filtering
    setFieldValue("firstName", value); // Update Formik state
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastNameInput(value); // Update local state for filtering
    setFieldValue("lastName", value); // Update Formik state
  };

  // Handler for phoneNumber input changes
  const handlePhoneNumberChange = (e, index) => {
    const value = e.target.value;
    setPhoneInput(value); // Update local state for filtering
    setFieldValue(`phoneNumber.${index}.number`, value); // Update Formik state
  };

  const handleEmailChange = (e, index) => {
    const value = e.target.value;
    setEmailInput(value); // Update local state for filtering
    setFieldValue(`email.${index}`, value); // Update Formik state
  };

  return (
    <AdaptableCard divider className="p-2">
      {/* {phoneInput.trim() && (
        <div className="border rounded-none bg-gray-100 text-gray-700 pb-2 pt-1 mb-4 px-4">
          <p className="mt-2 font-bold">
            {filteredCustomers.length > 0
              ? `${filteredCustomers.length} ${filteredCustomers.length === 1 ? "customer" : "customers"} matches found.`
              : "0 customers matches found."}
          </p>
        </div>
      )} */}
      {phoneInput.trim() ||
      firstNameInput.trim() ||
      lastNameInput.trim() ||
      emailInput.trim() ? (
        <div className="w-full border bg-indigo-100 text-indigo-600 font-bold py-1 mb-4 relative">
          <Dropdown
            title={
              filteredCustomers.length > 0
                ? `${filteredCustomers.length} ${filteredCustomers.length === 1 ? "customer" : "customers"} matches found.`
                : "No customers found"
            }
            placement="bottom"
            menuStyle={{
              marginTop: "8px",
              minWidth: "480px",
              left: "0%",
              transform: "translateX(-50%)",
            }}
            // onSelect={(val) => setSelectedWorkflow(val)}
          >
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <Dropdown.Item
                  key={customer._id}
                  eventKey={customer._id}
                  className="p-2 w-full"
                >
                  <div className="flex items-center justify-between w-full">
                    <p className="font-semibold text-gray-900 flex-1 truncate">
                      {customer.firstName} {customer.lastName}
                    </p>
                    <button
                      className="bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-indigo-500 transition"
                      onClick={() => handleChooseAction("choose", customer._id)}
                    >
                      Choose
                    </button>
                  </div>
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled className="p-2 text-gray-500 text-center">
                No customers found
              </Dropdown.Item>
            )}
          </Dropdown>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4">
        <FormItem
          label="First Name"
          invalid={errors.firstName && touched.firstName}
          errorMessage={errors.firstName}
        >
          <Field
            type="text"
            autoComplete="off"
            name="firstName"
            placeholder="First Name"
            component={Input}
            className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
            value={firstNameInput}
            onChange={handleFirstNameChange}
            required
          />
        </FormItem>

        <FormItem
          label="Last Name"
          invalid={errors.lastName && touched.lastName}
          errorMessage={errors.lastName}
        >
          <Field
            type="text"
            autoComplete="off"
            name="lastName"
            placeholder="Last Name"
            component={Input}
            className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
            value={lastNameInput} // Controlled by local state
            onChange={handleLastNameChange} // Custom handler
            required
          />
        </FormItem>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Phone Numbers</label>
        {formValues.phoneNumber.map((phone, index) => (
          <div key={index} className="flex items-start gap-2 mb-2">
            <div className="flex-1 grid grid-cols-4 gap-2">
              <FormItem className="col-span-1">
                <Field
                  as="select"
                  name={`phoneNumber.${index}.type`}
                  className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50 w-full h-11"
                >
                  <option value="mobile">Mobile</option>
                  <option value="work">Work</option>
                  <option value="home">Home</option>
                  <option value="office">Office</option>
                  <option value="other">Other</option>
                </Field>
              </FormItem>

              <FormItem className="col-span-3">
                <Field
                  type="text"
                  name={`phoneNumber.${index}.number`}
                  placeholder="Phone Number"
                  component={Input}
                  className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
                  value={phoneInput} // Controlled by local state
                  onChange={(e) => handlePhoneNumberChange(e, index)} // Custom handler
                  required
                />
              </FormItem>
            </div>
          </div>
        ))}
      </div>

      {/* Email Section */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Email Addresses</label>
        {formValues.email.map((email, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <FormItem
              className="flex-1"
              invalid={touched.email && Boolean(errors.email?.[index])}
              errorMessage={errors.email?.[index]}
            >
              <Field
                type="email"
                name={`email.${index}`}
                placeholder="Enter email address"
                component={Input}
                className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
                value={emailInput} // Controlled by local state
                onChange={(e) => handleEmailChange(e, index)} // Custom handler
                required
              />
            </FormItem>

            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveEmail(index)}
                className="text-black-500 hover:text-blue-700 hover:bg-gray-100 p-2 -mt-7"
              >
                <HiX className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}

        {formValues.email.length < 3 && (
          <button
            type="button"
            onClick={handleAddEmail}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 -mt-7"
          >
            Add Email
          </button>
        )}
      </div>

      {/* Preferred Contact Method */}
      <FormItem label="Preferred Contact Method">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <button
            type="button"
            className={`flex items-center justify-center border border-gray-300 p-2 rounded-md w-full 
                                ${selectedContact === "sms" ? "bg-blue-100 text-blue-600" : "bg-gray-100"} 
                                hover:bg-blue-100 focus:ring-0 border-blue-500 hover:text-blue-600`}
            onClick={() => setSelectedContact("sms")}
          >
            <HiDocumentText className="mr-2" />
            <span>SMS</span>
          </button>

          <button
            type="button"
            className={`flex items-center justify-center border border-gray-300 p-2 rounded-md w-full 
                                ${selectedContact === "email" ? "bg-blue-100 text-blue-600" : "bg-gray-100"} 
                                hover:bg-blue-100 focus:ring-0 border-blue-500 hover:text-blue-600`}
            onClick={() => setSelectedContact("email")}
          >
            <HiMail className="mr-2" />
            <span>Email</span>
          </button>

          <button
            type="button"
            className={`flex items-center justify-center border border-gray-300 p-2 rounded-md w-full 
                                ${selectedContact === "call" ? "bg-blue-100 text-blue-600" : "bg-gray-100"} 
                                hover:bg-blue-100 focus:ring-0 border-blue-500 hover:text-blue-600`}
            onClick={() => setSelectedContact("call")}
          >
            <span>Both</span>
          </button>
        </div>
      </FormItem>
      <div className="mb-4">
        <button
          type="button"
          className="w-full flex justify-between items-center bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none"
          onClick={() => setShowAdditionalInfoForm(!showAdditionalInfoForm)}
        >
          <span>Additional Information</span>
          <span>{showAdditionalInfoForm ? "-" : "+"}</span>
        </button>

        {showAdditionalInfoForm && (
          <div className="mt-2 p-2 border border-gray-300 rounded-md">
            {/* First Name and Last Name - Same Line */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormItem label="Tag">
                <button
                  type="button"
                  onClick={() => setIsTagDialogOpen(true)}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>+</span> Add Tag
                </button>
              </FormItem>

              {/* Tag Dialog */}
              {isTagDialogOpen && (
                <div
                  className="fixed inset-0 flex items-center justify-center z-50"
                  onClick={() => setIsTagDialogOpen(false)}
                >
                  <div
                    className="bg-gray-50 p-6 rounded-md shadow-lg w-96 z-60 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-lg font-medium mb-4">Add Tag</h2>
                    <FormItem label="Tag Name">
                      <Input placeholder="" className=" bg-slate-100" />
                    </FormItem>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button onClick={() => setIsTagDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="solid"
                        onClick={() => setIsTagDialogOpen(false)}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Field */}
              <FormItem label="Notes">
                <Field
                  as="textarea"
                  name="note"
                  placeholder="Add a note..."
                  rows={3}
                  className="w-full bg-slate-50 border border-gray-300 outline-none p-1 rounded-md focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </FormItem>

              {/* Referral Source Dropdown */}
              <FormItem label="Referral Source">
                <Field
                  as="select"
                  name="referralSource"
                  className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50 h-11 w-full"
                >
                  <option value="" disabled>
                    Select Referral Source
                  </option>
                  <option value="friend">Friend</option>
                  <option value="online">Online</option>
                  <option value="other">Other</option>
                </Field>
                <div className="flex justify-start mt-2">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => setIsReferralDialogOpen(true)}
                  >
                    New Referral Source
                  </button>
                </div>
              </FormItem>

              {/* Referral Source Dialog */}
              {isReferralDialogOpen && (
                <div
                  className="fixed inset-0 flex items-center justify-center z-50"
                  onClick={() => setIsReferralDialogOpen(false)}
                >
                  <div
                    className="bg-gray-50 p-6 rounded-md shadow-lg w-96 z-60 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-lg font-medium mb-4">
                      New Referral Source
                    </h2>

                    <FormItem label="Name">
                      <Input placeholder="" className="bg-slate-100" />
                    </FormItem>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button onClick={() => setIsReferralDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="solid"
                        onClick={() => setIsReferralDialogOpen(false)}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Company Field */}
              <FormItem label="Company">
                <Field
                  type="text"
                  name="company"
                  placeholder="Enter company name"
                  component={Input}
                  className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50 w-full"
                />
              </FormItem>

              {/* Fleet Dropdown */}
              <FormItem label="Fleet">
                <Field
                  as="select"
                  name="fleet"
                  className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50 h-11 w-full"
                >
                  <option value="" disabled>
                    Select Fleet
                  </option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Field>
                <div className="flex justify-start mt-2">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => setIsFleetDialogOpen(true)}
                  >
                    New Fleet
                  </button>
                </div>
              </FormItem>
              {/* Fleet Dialog */}
              {isFleetDialogOpen && (
                <div
                  className="fixed inset-0 flex items-center justify-center z-50"
                  onClick={() => setIsFleetDialogOpen(false)}
                >
                  <div
                    className="bg-gray-50 p-6 rounded-md shadow-lg w-96 z-60 relative"
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dialog when inside
                  >
                    <h2 className="text-lg font-medium mb-4">New Fleet</h2>

                    <div className="grid grid-cols-1 gap-4">
                      <FormItem
                        label="Company Name"
                        // invalid={(errors.companyName && touched.companyName) as boolean}
                        // errorMessage={errors.companyName}
                      >
                        <Field
                          type="text"
                          autoComplete="off"
                          name="companyName"
                          placeholder="Company"
                          component={Input}
                          className="border border-gray-300 outline-none p-1 rounded-md focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                          required
                        />
                      </FormItem>
                    </div>
                    {/* Phone Numbers Section */}
                    <FieldArray name="phoneNumbers">
                      {({ push, remove }) => (
                        <div className="mb-4">
                          <label className="block mb-2 focus:ring-0 focus:ring-blue-300 bg-slate-50">
                            Phone Numbers
                          </label>

                          <Field name="phoneNumbers">
                            {({
                              form,
                            }: {
                              form: FormikProps<FormFieldsName>;
                            }) => (
                              <div className="-space-y-2">
                                {form.values.phoneNumber?.map(
                                  (phone, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <div className="flex-1 grid grid-cols-4 gap-2">
                                        <FormItem className="col-span-1">
                                          <Field
                                            as="select"
                                            name={`phoneNumbers.${index}.type`}
                                            className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50 w-full h-11"
                                          >
                                            <option value="mobile">
                                              Mobile
                                            </option>
                                            <option value="work">Work</option>
                                            <option value="home">Home</option>
                                            <option value="office">
                                              Office
                                            </option>
                                            <option value="other">Other</option>
                                          </Field>
                                        </FormItem>

                                        <FormItem className="col-span-3">
                                          <Field
                                            type="text"
                                            name={`phoneNumbers.${index}.number`}
                                            placeholder="Phone Number"
                                            component={Input}
                                            className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
                                          />
                                        </FormItem>
                                      </div>

                                      {index > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => remove(index)}
                                          className="text-black-500 hover:text-blue-700 hover:bg-gray-100 p-2 mt-1"
                                        >
                                          <HiX className="h-5 w-5" />
                                        </button>
                                      )}
                                    </div>
                                  )
                                )}

                                {/* Add Phone Button */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    push({
                                      type: "",
                                      number: "",
                                    })
                                  }
                                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                >
                                  Add Phone Number
                                </button>
                              </div>
                            )}
                          </Field>
                        </div>
                      )}
                    </FieldArray>

                    {/* Email Section */}
                    <FieldArray name="email">
                      {({ push, remove }) => (
                        <div className="mb-4">
                          <label className="block mb-2 font-medium">
                            Email Addresses
                          </label>

                          <Field name="email">
                            {({
                              form,
                            }: {
                              form: FormikProps<FormFieldsName>;
                            }) => (
                              <div className="-space-y-2">
                                {form.values.email?.map((email, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <FormItem
                                      className="flex-1"
                                      invalid={
                                        touched.email &&
                                        Boolean(errors.email?.[index])
                                      }
                                      errorMessage={errors.email}
                                    >
                                      <Field
                                        type="email"
                                        name={`email.${index}`}
                                        placeholder="Enter email address"
                                        component={Input}
                                        className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50"
                                      />
                                    </FormItem>

                                    {index > 0 && (
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="-mt-6 text-black-500 hover:text-blue-700 hover:bg-gray-100 p-2"
                                      >
                                        <HiX className="h-5 w-5" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </Field>

                          {/* Add Email Button */}
                          <button
                            type="button"
                            onClick={() => push("")}
                            className="-mt-2 text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            Add Email
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    {/* Preferred Contact Method */}
                    <FormItem label="Preferred Contact Method">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <button
                          type="button"
                          className={`flex items-center justify-center border border-gray-300 p-2 rounded-md w-full 
                                    ${selectedContact === "sms" ? "bg-blue-100 text-blue-600" : "bg-gray-100"} 
                                    hover:bg-blue-100 focus:ring-0 border-blue-500 hover:text-blue-600`}
                          onClick={() => setSelectedContact("sms")}
                        >
                          <HiDocumentText className="mr-2" />
                          <span>SMS</span>
                        </button>

                        <button
                          type="button"
                          className={`flex items-center justify-center border border-gray-300 p-2 rounded-md w-full 
                                    ${selectedContact === "email" ? "bg-blue-100 text-blue-600" : "bg-gray-100"} 
                                    hover:bg-blue-100 focus:ring-0 border-blue-500 hover:text-blue-600`}
                          onClick={() => setSelectedContact("email")}
                        >
                          <HiMail className="mr-2" />
                          <span>Email</span>
                        </button>

                        <button
                          type="button"
                          className={`flex items-center justify-center border border-gray-300 p-2 rounded-md w-full 
                                    ${selectedContact === "call" ? "bg-blue-100 text-blue-600" : "bg-gray-100"} 
                                    hover:bg-blue-100 focus:ring-0 border-blue-500 hover:text-blue-600`}
                          onClick={() => setSelectedContact("call")}
                        >
                          <span>Both</span>
                        </button>
                      </div>
                    </FormItem>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button onClick={() => setIsFleetDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="solid"
                        onClick={() => setIsFleetDialogOpen(false)}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Terms Dropdown */}
              <FormItem label="Payment Terms">
                <Field
                  as="select"
                  name="paymentTerms"
                  className="border border-gray-300 outline-none p-1 rounded-md focus:ring-0 focus:ring-blue-300 bg-slate-50 h-11 w-full"
                >
                  <option value="receipt">Receipt</option>
                  <option value="net30">Net 30</option>
                  <option value="net60">Net 60</option>
                </Field>
              </FormItem>
              <div className="flex items-center -mt-5">
                <Field
                  type="checkbox"
                  name="onShopDefault"
                  className="mr-2"
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  //     setFieldValue('onShopDefault', e.target.checked);
                  //     if (e.target.checked) {
                  //         setFieldValue('paymentTerms', 'receipt');
                  //     }
                  // }}
                />
                <label>On Shop Default</label>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mb-4">
        <button
          type="button"
          className="w-full flex justify-between items-center bg-gray-200 p-2 rounded-md border border-gray-300 hover:bg-gray-300"
          onClick={() => setShowAddress(!showAddress)}
        >
          <span>Address</span>
          <span>{showAddress ? <HiX /> : "+"}</span>
        </button>
        {showAddress && (
          <>
            {/* Country */}
            <FormItem label="Country" className="mt-4">
              <Field
                as="select"
                name="country"
                className="border border-gray-300 outline-none bg-slate-50 p-1 rounded-md focus:ring-2 focus:ring-indigo-500  w-full h-11"
              >
                <option value="" disabled>
                  Select Country
                </option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                {/* Add more countries as needed */}
              </Field>
            </FormItem>

            {/* Address 1 */}
            <FormItem
              label="Address 1"
              invalid={
                (errors.customerAddress?.address1 &&
                  touched.customerAddress?.address1) as boolean
              }
              errorMessage={errors.customerAddress?.address1}
            >
              <Field
                type="text"
                name="customerAddress.address1"
                placeholder="Address 1"
                component={Input}
                className="border border-gray-300 outline-none bg-slate-50 p-1 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"
              />
            </FormItem>

            {/* Address 2 */}
            <FormItem
              label="Address 2"
              invalid={
                (errors.customerAddress?.address2 &&
                  touched.customerAddress?.address2) as boolean
              }
              errorMessage={errors.customerAddress?.address2}
            >
              <Field
                type="text"
                name="customerAddress.address1"
                placeholder="Address 2"
                component={Input}
                className="border border-gray-300 outline-none bg-slate-50 p-1 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"
              />
            </FormItem>

            {/* City, State, and Zip - Same Line */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="col-span-2">
                <FormItem
                  label="City"
                  invalid={
                    (errors.customerAddress?.city &&
                      touched.customerAddress?.city) as boolean
                  }
                  errorMessage={errors.customerAddress?.city}
                >
                  <Field
                    type="text"
                    name="customerAddress.city"
                    placeholder="City"
                    component={Input}
                    className="border border-gray-300 outline-none bg-slate-50 p-1 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </FormItem>
              </div>
              <div className="col-span-1">
                <FormItem
                  label="State"
                  invalid={
                    (errors.customerAddress?.state &&
                      touched.customerAddress?.state) as boolean
                  }
                  errorMessage={errors.customerAddress?.state}
                >
                  <Field
                    type="text"
                    name="customerAddress.state"
                    placeholder="State"
                    component={Input}
                    className="border border-gray-300 outline-none bg-slate-50 p-1 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </FormItem>
              </div>
              <div className="col-span-1">
                <FormItem
                  label="ZipCode"
                  invalid={
                    (errors.customerAddress?.zipCode &&
                      touched.customerAddress?.zipCode) as boolean
                  }
                  errorMessage={errors.customerAddress?.zipCode}
                >
                  <Field
                    type="text"
                    name="customerAddress.zipCode"
                    placeholder="ZipCode"
                    component={Input}
                    className="border border-gray-300 outline-none bg-slate-50 p-1 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </FormItem>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mb-4">
        <button
          type="button"
          className="w-full flex justify-between items-center bg-gray-200 p-2 rounded-md border border-gray-300 hover:bg-gray-300"
          onClick={() => setShowFees(!showFees)}
        >
          <span>Fees</span>
          <span>{showFees ? <HiX /> : "+"}</span>
        </button>
        {showFees && (
          <FormItem>
            <FeesInfo />
          </FormItem>
        )}
      </div>
    </AdaptableCard>
  );
};

export default BasicInfo;
