import { Avatar, Button, Card, Menu, Notification, Select, Switcher, toast } from "@/components/ui";
import DateTimepicker from "@/components/ui/DatePicker/DateTimepicker";
import SelectAndButton from "@/components/ui/SelectAndButton";
import DatePicker from '@/components/ui/DatePicker'
import dayjs from "dayjs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaBell, FaCar, FaRegUser } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import {
  apiAddNewAppointment,
  apiUpdateAppointment,
  getAllCustomers,
  getAllVehicles,
} from "../DealerLists/Services/DealerListServices";
import { getAllEstimates } from "../Services/WorkflowService";
import * as Yup from "yup";
import AddNewCustomerModal from "./AddNewCustomerModal";
import AddNewVehicleModal from "./AddNewVehicleModal";
import {
  fetchAllCustomers,
  fetchAllVehicles,
  getCustomers,
  useAppDispatch,
} from "../DealerLists/Store";
import { useAppSelector } from "@/store";
import BasicInfo from "../DealerInventory/PartsForm/BasicInfo";

interface Vehicle {
  _id: string;
  customerName: string;
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

interface Customer {
  id: string;
  name: string;
}

const AddNewAppointmentModal = ({
  eventsData,
  setEventsData,
  setModalOpen,
  isModalOpen,
  selectedEvent,
  isNewAppointment,
}: any) => {
  const disablePastDates = (date: Date) => {
    return dayjs(date).isBefore(dayjs(), "day"); // Disables dates before today
  };

  const [selectedTimeRange, setSelectedTimeRange] = useState<[Date, Date]>([
    new Date(),
    new Date(new Date().getTime() + 60 * 60000),
  ]);
  const [customerSelected, setCustomerSelected] = useState<any>(false);
  const [allCustomers, setallCustomers] = useState([]);
  const [allVehicles, setallVehicles] = useState([]);
  const [allEstimates, setallEstimates] = useState([]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showVehicleForm, setshowVehicleForm] = useState(false);
  const [vehicleOptions, setVehicleOptions] = useState<Vehicle[]>([]);
  const [customerOptions, setCustomerOptions] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [startDateTime, setStartDateTime] = useState<Date | null>(selectedEvent?.start ? new Date(selectedEvent.start) : null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(selectedEvent?.end ? new Date(selectedEvent.end) : null);
  


  const dispatch = useAppDispatch();
  

  useEffect(() => {
    if (customerSelected && customerSelected !== false) {
    }
  }, [customerSelected]);


  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    appointmentStartDate: Yup.string().required(
      "Start Date & Time is required"
    ),
    appointmentEndtDate: Yup.string().required("End Date & Time is required"),
    customer: Yup.string().required("Customer is required"),
    vehicle: Yup.string().required("Vehicle is required"),
  });

  const handleAddAppointment = async (values: any) => {
    const startDateTime = new Date(values.appointmentStartDate);
    startDateTime.setHours(selectedTimeRange[0].getHours());
    startDateTime.setMinutes(selectedTimeRange[0].getMinutes());
    startDateTime.setSeconds(0);
    startDateTime.setMilliseconds(0);

    const endDateTime = new Date(values.appointmentEndtDate);
    endDateTime.setHours(selectedTimeRange[1].getHours());
    endDateTime.setMinutes(selectedTimeRange[1].getMinutes());
    endDateTime.setSeconds(0);
    endDateTime.setMilliseconds(0);

    const startDateTimeIso = startDateTime.toISOString();
    const endDateTimeIso = endDateTime.toISOString();

    const newEventData = {
      //   id: (eventsData.length + 1).toString(),
      title: values.title,
      start: startDateTime,
      end: endDateTime,
      customerId: values.customer,
      vehicleId: values.vehicle,
      note: values.note,
      sendConfirmation: values.sendConfirmation,
      sendReminder: values.sendReminder,
      eventColor: values.color,
      status: values.status,
    };

    setEventsData((prevEvents: any) => [...prevEvents, newEventData]);

    // console.log("Appointment Data for update : ", newEventData);
    await apiAddNewAppointment(newEventData);
    fetch();
  };

  const handleUpdateAppointment = async (id: string, values: any) => {
    const startDateTime = new Date(values.appointmentStartDate);
    startDateTime.setHours(selectedTimeRange[0].getHours());
    startDateTime.setMinutes(selectedTimeRange[0].getMinutes());
    startDateTime.setSeconds(0);
    startDateTime.setMilliseconds(0);

    const endDateTime = new Date(values.appointmentEndtDate);
    endDateTime.setHours(selectedTimeRange[1].getHours());
    endDateTime.setMinutes(selectedTimeRange[1].getMinutes());
    endDateTime.setSeconds(0);
    endDateTime.setMilliseconds(0);

    const updatedEventData = {
      title: values.title,
      start: startDateTime,
      end: endDateTime,
      note: values.note,
      sendConfirmation: values.sendConfirmation,
      sendReminder: values.sendReminder,
      eventColor: values.color,
      status: values.status,
    };

    console.log("Updated Appointment Data: ", updatedEventData);

    setEventsData((prevEvents: any) =>
      prevEvents.map((event: any) =>
        event.id === id ? updatedEventData : event
      )
    );

    await apiUpdateAppointment(id, updatedEventData);
    fetch();
    setModalOpen(false);
  };

  const selectedCustomerId = customerSelected?._id || null;

  const onSwitcherToggle = (val: boolean, e: ChangeEvent) => {};
  const ConfirmationContent = ({
    icon,
    label,
  }: {
    icon: ReactNode;
    label: string;
  }) => {
    return (
      <div className="flex items-center gap-2 justify-between w-[200px]">
        <div>
          <span>{label}</span>
          <p className="text-xs text-gray-400">
            Will be sent when this appointment is saved.
          </p>
        </div>
        <Switcher defaultChecked onChange={onSwitcherToggle} />
      </div>
    );
  };

  const ReminderContent = ({
    icon,
    label,
  }: {
    icon: ReactNode;
    label: string;
  }) => {
    return (
      <div className="flex items-center gap-2 justify-between w-[200px]">
        <div>
          <span>{label}</span>
          <p className="text-xs text-gray-400">
            Will be sent 1 day before the appointment.
          </p>
        </div>
        <Switcher defaultChecked onChange={onSwitcherToggle} />
      </div>
    );
  };

  const createCustomerOptions = async () => {
    let customers = await getAllCustomers();
    if (customers.allCustomers && customers.allCustomers.length) {
      return customers.allCustomers.map((cust: any) => {
        const name = `${cust.firstName || ""} ${cust.lastName || ""}`;
        return {
          ...cust,
          value: name,
          label: (
            <div className="flex items-center justify-start w-full cursor-pointer">
              <Avatar
                shape="circle"
                size="sm"
                className="mr-4 bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
              >
                {`${cust.firstName?.[0] || ""}${cust.lastName?.[0] || ""}`}
              </Avatar>
              <div className="flex flex-col">
                <p className="text-black">{name}</p>
                {cust.phoneNumber?.[0]?.number ? (
                  <p className="text-xs">
                    Mobile: {cust.phoneNumber[0].number}
                  </p>
                ) : null}
              </div>
            </div>
          ),
        };
      });
    }
    return [];
  };

  const createVehicleOptions = async () => {
    try {
      const vehicles = await getAllVehicles(selectedCustomerId);
      let labelValArr = [];
      if (vehicles.allVehicles && vehicles.allVehicles.length) {
        labelValArr = vehicles.allVehicles.map((vehicle: any) => {
          vehicle.value = vehicle._id;
          vehicle.label = (
            <div className="flex items-center justify-start w-full cursor-pointer">
              <Avatar
                shape="circle"
                size="sm"
                className="mr-4 bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
              >
                <FaCar />
              </Avatar>
              <div className="flex flex-col">
                <p className="text-black">{`${vehicle.year || ""} ${vehicle.make || ""} ${vehicle.model || ""}`}</p>
                {vehicle.subModel && vehicle.licencePlate.length ? (
                  <p className="text-xs">{`${vehicle.subModel || ""} ${vehicle.licencePlate[0].plateNumber || ""}`}</p>
                ) : null}
              </div>
            </div>
          );
          return vehicle;
        });
      }
      setVehicleOptions(labelValArr);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      return []; // Return an empty array in case of error
    }
  };

  const fetchVehiclesbycus = async (id: any) => {
    let vehicles = await getAllVehicles(id);

    let labelValArr = [];
    if (vehicles.allVehicles && vehicles.allVehicles.length) {
      labelValArr = vehicles.allVehicles.map((vehicle: any) => {
        vehicle.value = vehicle._id;
        vehicle.label = (
          <div className="flex items-center justify-start w-full cursor-pointer">
            <Avatar
              shape="circle"
              size="sm"
              className="mr-4 bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
            >
              <FaCar />
            </Avatar>
            <div className="flex flex-col">
              <p className="text-black">{`${vehicle.year || ""} ${vehicle.make || ""} ${vehicle.model || ""}`}</p>
              {vehicle.subModel && vehicle.licencePlate.length ? (
                <p className="text-xs">{`${vehicle.subModel || ""} ${vehicle.licencePlate[0].plateNumber || ""}`}</p>
              ) : null}
            </div>
          </div>
        );
        return vehicle;
      });
    }

    setVehicleOptions(labelValArr);
  };

  const fetch = async () => {
    try {
      const allCustomers = await createCustomerOptions();
      setallCustomers(allCustomers);

      const allVehicles = await createVehicleOptions();

      setallEstimates(allEstimates);
    } catch (error) {
      console.error("Error in fetch:", error);
    }
  };

  const handleButtonClick = () => {
    setShowCustomerForm(!showCustomerForm); 
  };

  const handleVehicleFormClose = () => {
    setshowVehicleForm(!showVehicleForm); 
  };

  useEffect(() => {
    const fetchVehicleOptions = async () => {
      const options = await createVehicleOptions();
      
    };

    const fetchCustomerOptions = async () => {
      const customerOptions = await createCustomerOptions();
      setCustomerOptions(customerOptions);
    };

    fetchVehicleOptions();
    fetchCustomerOptions();
    fetch();
  }, []);

  const vehId = selectedEvent ? selectedEvent.vehicle : null;
  let vehicleDetails: string | null = null;
  if (vehicleOptions.length > 0) {
    const matchedVehicle = vehicleOptions.find(
      (vehicle) => vehicle._id === vehId
    );
    if (matchedVehicle) {
      vehicleDetails = `${matchedVehicle.year} ${matchedVehicle.make} ${matchedVehicle.model}`;
    }
  }

  const customId = selectedEvent ? selectedEvent.customer : null;
  let customerDetails: string | null = null;
  if (customerOptions.length > 0) {
    const metchedCustomer = customerOptions.find(
      (customer) => customer._id === customId
    );
    if (metchedCustomer) {
      customerDetails = `${metchedCustomer.firstName} ${metchedCustomer.lastName}`;
    }
  }
  

  const handleStartDateTimeChange = (val: Date | null) => {
    console.log('Selected date time: ', val)
    setStartDateTime(val)
}
const handleEndDateTimeChange = (val: Date | null) => {
  console.log('Selected end date time: ', val)
  setEndDateTime(val)
}


  useEffect(() => {
    if (!showCustomerForm) {
      createCustomerOptions();
      fetch();
    }
  }, [showCustomerForm]);

  useEffect(() => {
    if (!showVehicleForm) {
      createVehicleOptions();
      fetch();
    }
  }, [showVehicleForm]);

  useEffect(() => {
    createVehicleOptions();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[650px] h-[680px] rounded-lg shadow-lg relative border border-gray-200">
        <div className="flex justify-between items-center p-3 border-b">
          {!isNewAppointment ? (
            <h3 className="text-base font-semibold">Edit Appointment</h3>
          ) : (
            <h3 className="text-base font-semibold">Add Appointment</h3>
          )}
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setModalOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className=" p-4 flex h-6/6">
          <div className="w-full">
            <Formik
              initialValues={{
                title: selectedEvent?.title || "",
                appointmentStartDate: selectedEvent?.start || "",
                appointmentEndDate: selectedEvent?.end || "",
                customer: selectedEvent?.customer || "",
                vehicle: selectedEvent?.vehicle || "",
                note: selectedEvent?.note || "",
                sendConfirmation: selectedEvent?.sendConfirmation || false,
                sendReminder: selectedEvent?.sendReminder || false,
                status: selectedEvent?.status || "shifted",
                color: selectedEvent?.color || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                if (selectedEvent) {
                  console.log(selectedEvent)
                  handleUpdateAppointment(selectedEvent.id, values);
                } else {
                  handleAddAppointment(values);
                }
                // fetchData();
                toast.push(
                  <Notification
                      title="Success"
                      type="success"
                  >
                      New Appointment Saved Successfully
                  </Notification>,
              )
                fetch();
                setSubmitting(false);
                dispatch(fetchAllCustomers());
                dispatch(fetchAllVehicles());
                setModalOpen(false)
              }}
              
            >
              {({ touched, errors, handleSubmit, setFieldValue }) => (
                <Form>
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="title"
                      className="border border-gray-300 rounded w-full p-2 mb-2"
                      placeholder="Title"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <DatePicker.DateTimepicker
                      disableDate={disablePastDates}
                      name="appointmentStartDate"
                      placeholder="Pick start date & time"
                      value={startDateTime}
                      onChange={(value) =>{
                        setFieldValue("appointmentStartDate", value)
                        handleStartDateTimeChange(value);
                      }}
                      
                    />
                    <ErrorMessage
                      name="appointmentStartDate"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <DateTimepicker
                      disableDate={disablePastDates}
                      name="appointmentEndtDate"
                      placeholder="Pick end date & time"
                      value={endDateTime}
                      onChange={
                        (value) => {setFieldValue("appointmentEndtDate", value) 
                          handleEndDateTimeChange(value)
                      }}
                    />
                    <ErrorMessage
                      name="appointmentEndtDate"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="h-0.5 bg-gray-200 my-4"></div>

                  {!isNewAppointment ? (
                    <div className="mb-4">
                      <Field
                        type="text"
                        name="customer"
                        className="border border-gray-300 rounded w-full p-2 mb-2"
                        placeholder="Customer"
                        value={customerDetails || ""}
                      />
                      <ErrorMessage
                        name="customer"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ) : (
                    <SelectAndButton
                      options={allCustomers}
                      addNewButtonLabel="Add New Customer"
                      onChange={(value: any) => {
                        setFieldValue("customer", value._id);
                        setCustomerSelected(value);
                        fetchVehiclesbycus(value._id);
                      }}
                      placeholder="Select or Add Customer"
                      addNewClick={() => setShowCustomerForm(true)}
                      className="mb-4"
                      styles={{
                        menu: (base) => ({
                          ...base,
                          maxHeight: "150px", 
                          overflowY: "auto", 
                        }),
                      }}
                    />
                  )}
                  <ErrorMessage
                    name="customer"
                    component="div"
                    className="text-red-500 text-sm mb-2"
                  />

                  {!isNewAppointment ? (
                    <div className="mb-4">
                      <Field
                        type="text"
                        name="vehicle"
                        className="border border-gray-300 rounded w-full p-2 mb-2"
                        placeholder="Vehicle"
                        value={vehicleDetails || ""}
                      />
                      <ErrorMessage
                        name="vehicle"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ) : (
                    <SelectAndButton
                      options={vehicleOptions}
                      addNewButtonLabel="Add New Vehicle"
                      onChange={(value: any) => {
                        setFieldValue("vehicle", value._id);
                      }}
                      addNewClick={() => setshowVehicleForm(true)}
                      placeholder="Select or Add Vehicle"
                      className="mb-4"
                      styles={{
                        menu: (base) => ({
                          ...base,
                          maxHeight: "150px", 
                          overflowY: "auto", 
                        }),
                      }}
                    />
                  )}
                  <ErrorMessage
                    name="vehicle"
                    component="div"
                    className="text-red-500 text-sm mb-2"
                  />

                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-2">
                      Select Color
                    </label>
                    <div className="flex gap-2">
                      {[
                        "blue",
                        "green",
                        "red",
                        "yellow",
                        "purple",
                        "orange",
                      ].map((color) => (
                        <label
                          key={color}
                          className={`w-10 h-10 rounded cursor-pointer border-2 flex items-center justify-center transition-all ${
                            selectedColor === color
                              ? "border-black scale-110"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setFieldValue("color", color);
                            setSelectedColor(color);
                          }}
                        >
                          <Field
                            type="radio"
                            name="color"
                            value={color}
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                    <ErrorMessage
                      name="color"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <Field
                      as="textarea"
                      name="note"
                      className="border border-gray-300 rounded w-full p-2 "
                      placeholder="Notes"
                    />
                    <ErrorMessage
                      name="note"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-2">
                    <Field
                      as="select"
                      name="status"
                      className="border border-gray-300 rounded w-full p-2 mb-2"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFieldValue("status", e.target.value)
                      }
                    >
                      <option value="shifted">Shifted</option>
                      <option value="confirmed">Confirmed</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex justify-end p-2 border-t bg-white">
                    <Button
                      variant="primary"
                      type="button"
                      className="bg-gray-300 mr-2 px-4 py-1.5"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </Button>

                    {!isNewAppointment ? (
                      <Button
                        variant="solid"
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5"
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        variant="solid"
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5"
                       
                      >
                        Save
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="w-1/3 h-full ml-4 flex flex-col items-start justify-between border-l border-gray-200 p-2 w-full">
            <div className="flex items-center space-x-2 mb-2"></div>
            <Card
              className="w-full h-full"
              headerClass="p-2"
              header={
                <>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaBell
                      color="#5046E5"
                      className="h-5 w-5 text-gray-400 "
                    />
                    <h2 className="text-lg font-semibold text-indigo-600">
                      Reminders
                    </h2>
                  </div>
                </>
              }
            >
              {!customerSelected ? (
                <div className="w-full h-[300px] flex flex-col items-center justify-center">
                  <FaRegUser size={"30"} />
                  <p className="text-center mt-2">
                    Add a customer to turn on confirmation and reminders.
                  </p>
                </div>
              ) : (
                <div className="w-full h-[300px] flex flex-col">
                  <Menu>
                    <Menu.MenuCollapseArrowStart
                      eventKey="others"
                      className="h-3/4 p-4"
                      label={
                        <ConfirmationContent
                          icon={<HiOutlineGlobeAlt />}
                          label="Send Confirmation"
                        />
                      }
                    ></Menu.MenuCollapseArrowStart>
                    <Menu.MenuCollapseArrowStart
                      eventKey="others"
                      className="h-3/4 p-4"
                      label={
                        <ReminderContent
                          icon={<HiOutlineGlobeAlt />}
                          label="Send Reminder"
                        />
                      }
                    ></Menu.MenuCollapseArrowStart>
                  </Menu>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {showCustomerForm && (
        <AddNewCustomerModal handleButtonClick={handleButtonClick} />
      )}
      {showVehicleForm && (
        <AddNewVehicleModal
          customerid={selectedCustomerId}
          handleButtonClick={handleVehicleFormClose}
        />
      )}
    </div>
  );
};

export default AddNewAppointmentModal;
