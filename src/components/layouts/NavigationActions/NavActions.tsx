import React, { useState } from "react";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineClock,
  HiOutlineMail,
  HiCalendar,
  HiAcademicCap,
  HiAdjustments,
  HiOutlineAdjustments,
  HiOutlineCalendar,
} from "react-icons/hi";
import RecentlyViewedToggle from "./RecentlyViewed";
import AddToggle from "./Add";
import ReusableDrawer from "./ReusableDrawer";
import { apiAddNewEstimate } from "@/views/Dealer/Services/WorkflowService";
import { useNavigate } from "react-router-dom";
import AddNewAppointmentModal from "@/views/Dealer/DealerSharedComponent/AddNewAppointmentModal";

const NotificationButton = () => {
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] =
    useState(false);
  const [isMessageDrawerOpen, setIsMessageDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estimateId, setEstimateId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const isNewAppointment= true;
  const toggleNotificationDrawer = () => {
    setIsNotificationDrawerOpen(!isNotificationDrawerOpen);
  };

  const toggleMessageDrawer = () => {
    setIsMessageDrawerOpen(!isMessageDrawerOpen);
  };

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
    <div className="relative flex items-center gap-4">
      {/* Recently Viewed Button (Clock Icon) */}
      {/* <button className="p-2 bg-transparent rounded-full hover:bg-gray-100 focus:outline-none">
                <RecentlyViewedToggle />
            </button> */}

      {/* Search Button */}
      {/* <button className="p-2 bg-transparent rounded-full hover:bg-gray-100 focus:outline-none">
                <HiOutlineSearch className="text-2xl text-gray-600" />
            </button> */}

      
      <button
        onClick={() => {
          handleEstimateClick();
        }}
        className="p-2 bg-transparent rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <HiOutlineAdjustments className="text-2xl text-gray-600" />
      </button>

      <button
        onClick={handleAppointmentClick}
        className="p-2 bg-transparent rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <HiOutlineCalendar className="text-2xl text-gray-600" />
      </button>

      {/* <button
        onClick={toggleNotificationDrawer}
        className="p-2 bg-transparent rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <HiOutlineBell className="text-2xl text-gray-600" />
      </button> */}

      {/* <button
        onClick={toggleMessageDrawer}
        className="p-2 bg-transparent rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <HiOutlineMail className="text-2xl text-gray-600" />
      </button> */}

      <button className="p-2 bg-transparent rounded-full hover:bg-gray-100 focus:outline-none">
        <AddToggle />
      </button>

      {/* Notification Drawer */}
      <ReusableDrawer
        title="Notifications"
        isOpen={isNotificationDrawerOpen} // Pass state to control open/close
        onClose={() => setIsNotificationDrawerOpen(false)} // Handle closing the drawer
      >
        Notification Drawer Content
      </ReusableDrawer>

      {/* Message Drawer */}
      <ReusableDrawer
        title="Messages"
        isOpen={isMessageDrawerOpen} // Pass state to control open/close
        onClose={() => setIsMessageDrawerOpen(false)} // Handle closing the drawer
      >
        Message Drawer Content
      </ReusableDrawer>

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

export default NotificationButton;
