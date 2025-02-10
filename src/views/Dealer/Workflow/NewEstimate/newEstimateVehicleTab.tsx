import {
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Notification,
  Select,
  TimeInput,
  toast,
} from "@/components/ui";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import {
  apiUpdateCompleteEstimateDate,
  apiUpdateEstimateStatus,
} from "../../Services/WorkflowService";

const NewEstimateVehicleTab = (props: any) => {
  const { selectedVehicle, estimate, setisAppointmentModelOpen } = props;

  console.log(selectedVehicle);

  if (!selectedVehicle) {
    return <p>Error: Vehicle not found!</p>;
  }

  console.log("vehicle in vehicle tab : ", selectedVehicle);

  const estimateOptions = [
    { key: "Estimates", name: "Estimates" },
    { key: "Dropped Off", name: "Dropped Off" },
    { key: "In Progress", name: "In Progress" },
    { key: "Invoices", name: "Invoices" },
  ];

  const serviceWriterOptions = [
    { value: "Syed Adnan Ali", label: "Syed Adnan Ali" },
    { value: "Saif Uddin", label: "Saif Uddin" },
    { value: "Faiz Uddin", label: "Faiz Uddin" },
  ];

  const payTermOptions = [
    { key: "On Reciept", name: "On Reciept" },
    { key: "Net 7", name: "Net 7" },
    { key: "Net 10", name: "Net 10" },
    { key: "Net 30", name: "Net 30" },
    { key: "Net 45", name: "Net 45" },
    { key: "Net 60", name: "Net 60" },
  ];

  const [selectedWorkflow, setSelectedWorkflow] = useState("Estimates");
  const [selectedServiceWriter, setSelectedServiceWriter] = useState(
    serviceWriterOptions[0]
  );
  const [showServiceWriterSelection, setShowServiceWriterSelection] =
    useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate]: any = useState("");
  const [selectedTime, setSelectedTime]: any = useState("");
  const [showDueDatePicker, setShowDueDatePicker]: any = useState("");
  const [selectedDueDate, setSelectedDueDate]: any = useState("");
  const [selectedDueTime, setSelectedDueTime]: any = useState("");
  const [selectedPayTerm, setSelectedPayTerm] = useState("On Reciept");
  const [showCustPoInput, setShowCustPoInput] = useState(false);
  const [customerPo, setCustomerPo] = useState("");

  const [createdAtDate, setCreatedAtDate]: any = useState("");
  const [createdAtTime, setCreatedAtTime]: any = useState("");

  useEffect(() => {
    setSelectedDate(estimate.completedDate);
    setSelectedTime(estimate.completedTime);
    setSelectedDueDate(estimate.dueDate);
    setSelectedDueTime(estimate.dueTime);

    const { createdAtDate, createdAtTime }: any = convertMongoTimestamp(
      estimate.createdAt
    );
    // debugger

    setCreatedAtDate(createdAtDate);
    setCreatedAtTime(createdAtTime);
  }, [estimate]);

  function convertMongoTimestamp(mongoTimestamp: any) {
    const date = new Date(mongoTimestamp);

    // Extract the date in YYYY-MM-DD format
    const createdAtDate = date.toISOString().split("T")[0];

    // Format the time to 12-hour AM/PM format
    const options: any = { hour: "numeric", minute: "numeric", hour12: true };
    const createdAtTime = date.toLocaleTimeString("en-US", options);

    return { createdAtDate, createdAtTime };
  }

  const getDateTime = (selDate: any, selTime: any) => {
    const month = String(selDate.getMonth() + 1).padStart(2, "0");
    const day = String(selDate.getDate()).padStart(2, "0");
    const year = selDate.getFullYear();

    let date = `${month}/${day}/${year}`;

    let hours = selTime.getHours();
    const minutes = String(selTime.getMinutes()).padStart(2, "0");
    const meridian = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    let time = `${hours}:${minutes} ${meridian}`;

    return `${date} at ${time}`;
  };

  const updateEstimateStatus = (status: any) => {
    apiUpdateEstimateStatus(estimate._id, status);
    window.location.reload();
  };

  const updateDates = async (type: string) => {
    if (type === "complete") {
      if (selectedDate !== "" && selectedTime !== "") {
        const formattedDate = selectedDate
          ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
          : null;

        // Extract just the time (HH:MM AM/PM) from selectedTime
        const formattedTime = selectedTime
          ? new Date(`${selectedTime}`).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : null;

        const payload = {
          completedDate: formattedDate, // "2024-11-25"
          completedTime: formattedTime, // Example: "10:10 PM"
          type: "complete",
        };
        try {
          const response: any = await apiUpdateCompleteEstimateDate(
            estimate._id,
            payload
          );

          if (response.status === "success") {
            setShowDueDatePicker(false);
            toast.push(
              <Notification
                title="Completion Date & Time"
                type="success"
                duration={2000}
              >
                {response.message}
              </Notification>
            );
          }
        } catch (error) {
          console.error("Error updating date and time:", error);
          // Handle error here if needed
        }
      } else {
        toast.push(
          <Notification
            title="Completion Date & Time"
            type="warning"
            duration={2000}
          >
            Completed Date & Time both should be selected
          </Notification>
        );
      }
    } else if (type === "due") {
      if (selectedDueDate !== "" && selectedDueTime !== "") {
        const formattedDate = selectedDueDate
          ? `${selectedDueDate.getFullYear()}-${String(selectedDueDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDueDate.getDate()).padStart(2, "0")}`
          : null;

        // Extract just the time (HH:MM AM/PM) from selectedDueTime
        const formattedTime = selectedDueTime
          ? new Date(`${selectedDueTime}`).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : null;

        const payload = {
          dueDate: formattedDate, // "2024-11-25"
          dueTime: formattedTime, // Example: "10:10 PM"
          type: "due",
        };
        try {
          const response: any = await apiUpdateCompleteEstimateDate(
            estimate._id,
            payload
          );

          if (response.status === "success") {
            setShowDateTimePicker(false);
            toast.push(
              <Notification
                title="Completion Date & Time"
                type="success"
                duration={2000}
              >
                {response.message}
              </Notification>
            );
          }
        } catch (error) {
          console.error("Error updating date and time:", error);
          // Handle error here if needed
        }
      } else {
        toast.push(
          <Notification
            title="Completion Date & Time"
            type="warning"
            duration={2000}
          >
            Completed Date & Time both should be selected
          </Notification>
        );
      }
    }

    // Extract just the date (YYYY-MM-DD) from selectedDate
  };

  const dateRegex =
    /^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\([\w\s]+\)$/;

  return (
    <div className="new-estimate-order-tab">
      <div className="order-details mt-4 text-black text-sm">
        <div className="flex justify-between mt-3 relative">
          <p> Make </p>
          <p
            className="text-indigo-600 cursor-pointer"
            // onClick={() =>
            //   setShowServiceWriterSelection(!showServiceWriterSelection)
            // }
          >
            {selectedVehicle.make}
          </p>
        </div>
        <div className="flex justify-between mt-3 relative">
          <p> Model </p>
          <p
            className="text-indigo-600 cursor-pointer"
            // onClick={() =>
            //   setShowServiceWriterSelection(!showServiceWriterSelection)
            // }
          >
            {selectedVehicle.model}
          </p>
        </div>
        <div className="flex justify-between mt-3 relative">
          <p> Subodel </p>
          <p
            className="text-indigo-600 cursor-pointer"
            // onClick={() =>
            //   setShowServiceWriterSelection(!showServiceWriterSelection)
            // }
          >
            {selectedVehicle.subModel}
          </p>
        </div>
        <div className="flex justify-between mt-3 relative">
          <p> Year </p>
          <p className="text-indigo-600 cursor-pointer">
            {selectedVehicle.year}
          </p>
        </div>

        <div className="flex justify-between mt-3 relative">
          <p> Mileage </p>
          <p className="text-indigo-600 cursor-pointer">
            {selectedVehicle.mileage}
          </p>
        </div>

        <div className="flex justify-between mt-3 relative">
          <p> Engine Size </p>
          <p className="text-indigo-600 cursor-pointer">
            {selectedVehicle.engineSize}
          </p>
        </div>

        <div className="flex justify-between mt-3 relative">
          <p> Type </p>
          <p className="text-indigo-600 cursor-pointer">
            {selectedVehicle.type}
          </p>
        </div>

        <div className="flex justify-between mt-3 relative">
          <p> Vin</p>
          <p className="text-indigo-600 cursor-pointer">
            {selectedVehicle.vin}
          </p>
        </div>

        <div className="flex justify-between mt-3 relative">
          <p> Licence Plate</p>
          <p className="text-indigo-600 cursor-pointer">
            {selectedVehicle.licencePlate &&
            selectedVehicle.licencePlate.length > 0
              ? selectedVehicle.licencePlate
                  .map(
                    (plate: any) =>
                      `${plate.regionCode.toUpperCase()} ${plate.plateNumber}`
                  )
                  .join(", ")
              : "No Licence Plate Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewEstimateVehicleTab;
