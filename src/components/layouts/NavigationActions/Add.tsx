import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import {
  HiOutlineAdjustments,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlinePlus,
} from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiAddNewEstimate } from "@/views/Dealer/Services/WorkflowService";
import AddNewAppointmentModal from "@/views/Dealer/DealerSharedComponent/AddNewAppointmentModal";

const AddToggle = () => {
  const [loading, setLoading] = useState(false);
  const [estimateId, setEstimateId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const Toggle = <HiOutlinePlus className="text-2xl text-gray-600" />;

  const isNewAppointment= true;


  const handleEstimateClick = async () => {
    setLoading(true);
    try {
      // Await the response from the API call
      const response = await apiAddNewEstimate({});
      setEstimateId(`${response.estimateId}-${response.estimateOrderNo}`);

      navigate(
        `/dealer/workflow/order/${response.estimateId}-${response.estimateOrderNo}`
      );
    } catch (error: any) {
      console.error("Error creating new estimate:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentClick = () => {
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <div>
      <Dropdown renderTitle={Toggle}>
        <Dropdown.Item
          eventKey="a"
          onClick={() => {
            handleEstimateClick();
          }}
        >
          <HiOutlineAdjustments className="text-2xl text-gray-600" /> New
          Estimate
        </Dropdown.Item>
        <Dropdown.Item eventKey="b" onClick={handleAppointmentClick}>
          <HiOutlineCalendar className="text-2xl text-gray-600" /> New
          Appointment{" "}
        </Dropdown.Item>
      </Dropdown>

      {isModalOpen && (
        <AddNewAppointmentModal
          //   eventsData={eventsData}
          //   setEventsData={setEventsData}
            setModalOpen={setModalOpen}
            isModalOpen={isModalOpen}
          //   selectedEvent={selectedEvent}
            isNewAppointment={isNewAppointment}
          closeModal={closeModal} // Pass the closeModal function
        />
      )}
    </div>
  );
};

export default AddToggle;
