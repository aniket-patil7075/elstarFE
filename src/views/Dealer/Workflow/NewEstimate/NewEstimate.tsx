import {
  Avatar,
  Button,
  Card,
  Drawer,
  Dropdown,
  FormItem,
  Input,
  Menu,
  Notification,
  Select,
  Spinner,
  Tabs,
  toast,
} from "@/components/ui";
import "./styles.css";
import {
  FaCar,
  FaCheck,
  FaChevronLeft,
  FaRegCheckCircle,
} from "react-icons/fa";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { AiOutlinePrinter } from "react-icons/ai";
import { FiActivity, FiSend } from "react-icons/fi";
import { FaBlog, FaRegMessage } from "react-icons/fa6";
import { HiDotsHorizontal, HiWifi } from "react-icons/hi";
import TabList from "@/components/ui/Tabs/TabList";
import TabNav from "@/components/ui/Tabs/TabNav";
import SideNav from "@/components/template/SideNav";
import TabContent from "@/components/ui/Tabs/TabContent";
import NewEstimateOrderTab from "./NewEstimateOrderTab";
import ServicesTab from "./ServicesTab";
import SelectAndButton from "@/components/ui/SelectAndButton";
import CustomersStatistics from "../../DealerLists/Customers/CustomersStatistics";
import AddNewCustomerModal from "../../DealerSharedComponent/AddNewCustomerModal";
import AddNewVehicleModal from "../../DealerSharedComponent/AddNewVehicleModal";
import {
  getAllCustomers,
  getAllVehicles,
} from "../../DealerLists/Services/DealerListServices";
import {
  apiAddNewEstimate,
  apiDeleteEstimate,
  apiUpdateEstimate,
  getEstimateById,
} from "../../Services/WorkflowService";
import { IoCloudDoneOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import SendEstimate from "./SendEstimate";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Activities from "./Activities";
import PaymentModel from "../../DealerSharedComponent/PaymentModel";
import AddNewAppointmentModal from "../../DealerSharedComponent/AddNewAppointmentModal";
import LeftSidePanel from "@/components/template/SidePanel/LeftSidePanel";
import NewEstimateCustomerTab from "./NewEstimateCustomerTab";
import NewEstimateVehicleTab from "./newEstimateVehicleTab";
import { useLocation } from "react-router-dom";
import { getAllGeneralRate } from "../../DealerLists/Services/DealerInventoryServices";
import AddNewRatesModal from "../../GeneralSetting/FeesAndRates/AddNewRatesModal";

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

interface Customer {
  id: string;
  name: string;
}

const NewEstimate = () => {
  const [orderNumber, setOrderNumber] = useState(0);
  const [estimateId, setEstimateId] = useState("");
  const [selectedTab, setSelectedTab] = useState("order");
  const [primarySelectedTab, setPrimarySelectedTab] = useState("services");
  const [addCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);
  const [sendEstimateOpen, setsendEstimateOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer]: any = useState(null);
  const [selectedVehicle, setSelectedVehicle]: any = useState(null);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState<Vehicle[]>([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderTitle, setOrderTitle] = useState("");
  const [customerComment, setCustomerComment] = useState("");
  const [customerRecommendations, setCustomerRecommendations] = useState("");
  const [servicesData, setServicesData]: any = useState({});
  const [autoSaving, setAutoSaving] = useState(false);
  const [estimateData, setEstimateData]: any = useState({});
  const [addRatesModelOpen, setAddRatesModelOpen] = useState(false);
  const [grandTotal, setGrandTotal] = useState<{
    [key: number]: string | number;
  }>({});
  const [isPaymentModelOpen, setisPaymentModelOpen]: any = useState(false);
  const [isAppointmentModelOpen, setisAppointmentModelOpen]: any =
    useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalServiceGrandTotal, setTotalServiceGrandTotal] =
    useState<number>(0);
  const timerRef = useRef(null);
  const location = useLocation();
  const { status } = location.state || {};
  const [isOpen, setIsOpen] = useState(true);
  const firstKey = Object.keys(grandTotal)[0];
  const navigate = useNavigate();

  const [allRates, setAllRates] = useState([]);

  const fetchGeneralRate = async () => {
    try {
      let response = await getAllGeneralRate();

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

  //   const totalServiceGrandTotal = Object.values(servicesData).reduce((acc, service:any) => {
  //     return acc + (service.serviceGrandTotal || 0);
  // }, 0);

  // console.log("Total Service Grand Total:", totalServiceGrandTotal);

  const estimateGrandTotal = firstKey
    ? parseFloat(grandTotal[Number(firstKey)]?.toString() || "0")
    : 0;

  const calculateMainSubtotal = (estimateData: { services?: any[] }) => {
    if (!estimateData?.services || !Array.isArray(estimateData.services)) {
      // console.error("Error: services is undefined or not an array", estimateData);
      return [];
    }

    return estimateData.services.map((service: any) => {
      const laborSubtotal =
        service.labors?.reduce(
          (acc: number, labor: any) => acc + (labor.subtotal || 0),
          0
        ) || 0;
      const partSubtotal =
        service.parts?.reduce(
          (acc: number, part: any) => acc + (part.partSubtotal || 0),
          0
        ) || 0;
      const tireSubtotal =
        service.tires?.reduce(
          (acc: number, tire: any) => acc + (tire.tireSubtotal || 0),
          0
        ) || 0;
      const feeSubtotal =
        service.serviceFee?.reduce(
          (acc: number, fee: any) => acc + (fee.feeSubtotal || 0),
          0
        ) || 0;
      const subSubtotal =
        service.subcontract?.reduce(
          (acc: number, sub: any) => acc + (sub.subTotal || 0),
          0
        ) || 0;

      const mainSubtotal =
        laborSubtotal + partSubtotal + tireSubtotal + feeSubtotal + subSubtotal;
      // console.log("mainSubtotal : ",mainSubtotal)

      return {
        ...service,
        mainSubtotal,
      };
    });
  };

  useEffect(() => {
    const updatedServices = calculateMainSubtotal(estimateData);
  }, [
    orderNumber,
    orderTitle,
    selectedCustomer,
    selectedVehicle,
    customerComment,
    customerRecommendations,
    servicesData,
    grandTotal,
  ]);

  const dropdownItems = [
    { key: "a", name: "Item A" },
    { key: "b", name: "Item B" },
    { key: "c", name: "Item C" },
    { key: "d", name: "Item D" },
  ];

  const otherItems = [{ key: "b", name: "Delete" }];

  const dropdownBtn = (
    <Button
      variant="twoTone"
      className="h-[2.4rem] print-dropdown-btn ml-[1px] font-medium"
      onClick={() => {}}
    >
      <GoChevronDown />
    </Button>
  );

  const otherOptionsBtn = (
    <Button
      variant="twoTone"
      className="h-[2.4rem] ml-3 px-[16px] font-medium"
      onClick={() => {}}
    >
      <HiDotsHorizontal />
    </Button>
  );

  const fetchCustomers = async () => {
    let customers = await getAllCustomers();
    let labelValArr = [];
    if (customers.allCustomers && customers.allCustomers.length) {
      labelValArr = customers.allCustomers.map((cust: any) => {
        let name = `${cust.firstName || ""} ${cust.lastName || ""}`;
        cust.value = name;
        cust.label = (
          <div className="flex items-center justify-start w-full cursor-pointer">
            <Avatar
              shape="circle"
              size="sm"
              className="mr-4 bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
            >
              {`${cust.firstName[0] || ""}${cust.lastName[0] || ""}`}
            </Avatar>
            <div className="flex flex-col">
              <p className="text-black">{name}</p>
              {cust.phoneNumber && cust.phoneNumber.length ? (
                <p className="text-xs">
                  Mobile: {`${cust.phoneNumber[0].number || ""}`}
                </p>
              ) : null}
            </div>
          </div>
        );
        return cust;
      });
    }

    setCustomerOptions(labelValArr);
  };

  const selectedCustomerId = selectedCustomer?._id || null;
  const fetchVehicles = async () => {
    let vehicles = await getAllVehicles(selectedCustomer?._id);

    // console.log("All Vehicles : ", vehicles);
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

  const fetchVehiclesbycus = async (id: any) => {
    let vehicles = await getAllVehicles(id);

    // console.log("All Vehicles : ", vehicles);
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

  useEffect(() => {
    const urlPath = window.location.pathname;
    const orderId = urlPath.split("/").pop();
    if (orderId) {
      const [idBeforeHyphen, idAfterHyphen]: any = orderId.split("-");
      setOrderNumber(Number(idAfterHyphen));
      setEstimateId(idBeforeHyphen);
    }
    // Call your APIs
    fetchVehicles();
    fetchCustomers();
  }, []);

  const calculateTotalServiceGrandTotal = (): number => {
    return Object.values(servicesData).reduce((acc: number, service: any) => {
      return acc + (service.serviceGrandTotal || 0);
    }, 0);
  };

  const handleEstimateSave = async (values: any) => {
    fetchEstimate();
    let saveEstimateResp = await apiUpdateEstimate(values, estimateId);
    setAutoSaving(false);
    setTotalServiceGrandTotal(calculateTotalServiceGrandTotal());
  };

  useEffect(() => {
    const handleMouseMove = () => {
      // Clear any existing timer when the mouse moves
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setAutoSaving(true);

        const updatedServices = calculateMainSubtotal({
          services: Object.values(servicesData),
        });

        // console.log("Updated Services with mainSubtotal:", updatedServices);
        setTotalServiceGrandTotal(calculateTotalServiceGrandTotal());
        // Update state with new services having mainSubtotal
        setEstimateData((prevData: any) => ({
          ...prevData,
          services: updatedServices,
        }));

        let estimateDataToSave = {
          orderNo: orderNumber,
          orderName: orderTitle,
          customer: selectedCustomer ? selectedCustomer._id : "",
          vehicle: selectedVehicle ? selectedVehicle._id : "",
          comments: customerComment,
          recommendation: customerRecommendations,
          services: updatedServices.map((service: any, idx: number) => ({
            ...service,
            serviceGrandTotal: service.mainSubtotal,
          })),
        };

        // console.log("Saving estimate data:", estimateDataToSave);

        estimateDataToSave.services = calculateMainSubtotal(estimateDataToSave);
        handleEstimateSave(estimateDataToSave);
        fetchEstimate();
        calculateMainSubtotal(estimateData);
      }, 3000);
    };

    // Attach the mousemove event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener and timer on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [
    orderNumber,
    orderTitle,
    selectedCustomer,
    selectedVehicle,
    customerComment,
    customerRecommendations,
    servicesData,
    grandTotal,
  ]);

  useEffect(() => {
    setTotalServiceGrandTotal(calculateTotalServiceGrandTotal());
  }, [
    servicesData,
    orderNumber,
    orderTitle,
    selectedCustomer,
    selectedVehicle,
    customerComment,
    customerRecommendations,
    servicesData,
    grandTotal,
  ]);
  // const customerOptions = [
  //   { value: "Faiz", label: <div className="flex align-center justify-center">
  //     <p className="mt-2 mr-8">FU</p>
  //     <div className="flex flex-col">
  //       <p className="text-black">Faiz</p>
  //       <p className="text-xs">Mobile: (91) 7974062002</p>
  //     </div>
  //   </div>, mob: 7974062002 },
  // ]

  // const vehicleOptions = [
  //   { value: "Vehicle1", label: <div className="flex align-center justify-center">
  //     <p className="mt-2 mr-8">VO</p>
  //     <div className="flex flex-col">
  //       <p className="text-black">Vehicle1</p>
  //       <p className="text-xs">Model: Swift Dezire</p>
  //     </div>
  //   </div>, mob: 7974062002 },
  // ]
  const fetchEstimate = async () => {
    try {
      const urlSegments = window.location.pathname.split("/");
      const orderId = urlSegments[urlSegments.length - 1].split("-")[0];
      const response = await getEstimateById(orderId);

      if (response.estimate) {
        let estimate = response.estimate;
        setEstimateData(estimate);

        let grandTotalMap = {};
        if (estimate.services && estimate.services.length) {
          estimate.services.forEach((service: any, idx: number) => {
            if (!service.grandTotal) service.grandTotal = 710;
            grandTotalMap[idx + 1] = Number(service.grandTotal);
          });

          setGrandTotal(grandTotalMap);
        }
        if (estimate.orderName) setOrderTitle(estimate.orderName);
        if (estimate.comments) setCustomerComment(estimate.comments);
        if (estimate.recommendation)
          setCustomerRecommendations(estimate.recommendation);
        if (estimate.customer) {
          let selCustomer: any = customerOptions.find(
            (cust: any) => cust._id === estimate.customer._id
          );
          if (selCustomer && selCustomer._id) {
            setSelectedCustomer(selCustomer);
          }
        }
        if (estimate.vehicle) {
          let selVehicle: any = vehicleOptions.find(
            (veh: any) => veh._id === estimate.vehicle._id
          );
          if (selVehicle && selVehicle._id) {
            setSelectedVehicle(selVehicle);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch estimate:", error);
    }
  };

  useEffect(() => {
    if (
      !customerOptions ||
      !customerOptions.length ||
      !vehicleOptions ||
      !vehicleOptions.length
    )
      return;

    fetchEstimate();
  }, [customerOptions, vehicleOptions]);

  const MenuContent = ({
    icon,
    label,
    service,
  }: {
    icon: ReactNode;
    label: string;
    service: any;
  }) => {
    return (
      <div className="flex items-center gap-2 w-full">
        <span className="flex items-center justify-between w-full">
          {label} <div className="text-xl">{icon}</div>
          {service.serviceTotal}
        </span>
      </div>
    );
  };

  const cardFooter = (
    <Button
      size="sm"
      variant="solid"
      className="w-full"
      onClick={() => setisPaymentModelOpen(!isPaymentModelOpen)}
    >
      New Payment
    </Button>
  );

  const PanelContent = (
    <div
      className={`flex flex-col items-start justify-start w-80 pr-10 -mr-14 `}
    >
      <Menu
        className="px-4 pb-4 border pt-7 -mt-7"
        variant={"light"}
        sideCollapsed={true}
      >
        <div className="p-1 w-full relative">
          <Tabs
            onChange={(tab) => setSelectedTab(tab)}
            value={selectedTab}
            variant="pill"
          >
            <TabList className="border rounded-md p-1">
              <TabNav className="w-full py-1" value="order">
                Order
              </TabNav>
              <TabNav className="w-full py-1" value="customer">
                Customer
              </TabNav>
              <TabNav className="w-full py-1" value="vehicle">
                Vehicle
              </TabNav>
            </TabList>

            <TabContent value="order" className="P-0">
              <NewEstimateOrderTab
                servicesData={servicesData}
                estimate={estimateData}
                setisAppointmentModelOpen={setisAppointmentModelOpen}
              />
              <br />
              <div className="w-full border-t"></div>
              <Menu className="p-0">
                <Menu.MenuCollapse
                  labelClass="w-full"
                  label={
                    <div className="flex items-center p-0">
                      <FaCheck className="mr-1" /> Authorizations
                    </div>
                  }
                >
                  {Object.values(servicesData) &&
                    Object.values(servicesData).length > 0 &&
                    Object.values(servicesData).map((service: any) => {
                      return (
                        <Menu.MenuItem
                          key={service._id}
                          className="p-0"
                          eventKey="wifi"
                        >
                          <MenuContent
                            icon={
                              service.isAuthorized === true ? (
                                <FaRegCheckCircle className="text-indigo-700" />
                              ) : (
                                <IoIosCloseCircleOutline className="text-indigo-700" />
                              )
                            }
                            label={
                              service.serviceTitle === ""
                                ? "Untitled Service"
                                : service.serviceTitle
                            }
                            service={service}
                          />
                        </Menu.MenuItem>
                      );
                    })}
                </Menu.MenuCollapse>
              </Menu>
              <br />
              <div className="w-full border-t"></div>
              <Menu className="p-0">
                <Menu.MenuCollapse
                  labelClass="w-full"
                  label={
                    <div className="flex items-center p-0">
                      <FiActivity className="mr-1 stroke-[3.5px] text-[15px]" />{" "}
                      Activity
                    </div>
                  }
                >
                  <Activities />
                </Menu.MenuCollapse>
              </Menu>
              {estimateData &&
                (estimateData.status === "In Progress" ||
                  estimateData.status === "Invoices") && (
                  <Card
                    // className="fixed bottom-0 w-3/12 right-0"
                    headerClass="font-semibold text-lg text-indigo-600"
                    bodyClass="text-center"
                    footerClass="flex justify-end"
                    footer={cardFooter}
                  >
                    <div className="flex item-center justify-between">
                      <h6>Grand Total</h6>
                      <h6>${estimateGrandTotal}</h6>
                    </div>
                  </Card>
                )}

              {estimateData && estimateData.status === " Dropped Off" && (
                <div>
                  <Button variant="solid" className="w-full mt-4">
                    Invoice
                  </Button>
                </div>
              )}
              {/* {estimateData ? (
                estimateData.status === "In Progress" ||
                estimateData.status === "Invoices" ? (
                  <Card
                    headerClass="font-semibold text-lg text-indigo-600"
                    bodyClass="text-center"
                    footerClass="flex justify-end"
                    footer={cardFooter}
                  >
                    <div className="flex items-center justify-between">
                      <h6>Grand Total</h6>
                      <h6>${estimateGrandTotal}</h6>
                    </div>
                  </Card>
                ) :  estimateData.status === "Dropped Off" ? (
                  <div>
                    <Button variant="solid" className="w-full mt-4">
                      Invoice
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button variant="solid" className="w-full mt-4">
                      Invoice
                    </Button>
                  </div>
                )
              ) : null} */}

              {isPaymentModelOpen && (
                <PaymentModel
                  handleClosePaymentModel={setisPaymentModelOpen}
                  estimateData={estimateData}
                  estimateGrandTotal={totalServiceGrandTotal}
                  setPaymentSuccess={setPaymentSuccess}
                />
              )}
            </TabContent>

            <TabContent value="customer">hi</TabContent>

            <TabContent value="vehicle">hi</TabContent>
          </Tabs>
        </div>
      </Menu>
    </div>
  );
  const closeModal = useCallback(() => setAddVehicleModalOpen(false), []);

  useEffect(() => {
    if (!addCustomerModalOpen) {
      fetchCustomers();
    }
  }, [addCustomerModalOpen]);

  useEffect(() => {
    if (!addVehicleModalOpen) {
      fetchVehicles();
    }
  }, [addVehicleModalOpen]);

  function calculateTotalPay(estimateData: {
    services?: { isAuthorized: boolean; serviceGrandTotal: number }[];
  }) {
    let totalPay = 0;

    if (estimateData.services && Array.isArray(estimateData.services)) {
      totalPay = estimateData.services.reduce((sum, service) => {
        return service.isAuthorized ? sum + service.serviceGrandTotal : sum;
      }, 0);
    }

    return totalPay;
  }

  // Example usage:
  const totalPay = calculateTotalPay(estimateData);

  // console.log("total pay : ",totalPay)

  const handleDeleteFunction = async () => {
    try {
      await apiDeleteEstimate(estimateId);

      navigate("/dealer/workflow");

      toast.push(
        <Notification title="Success" type="success">
          Estimate Deleted Successfully
        </Notification>
      );
    } catch (error) {
      console.error("Error deleting estimate:", error);
    }
  };

  return (
    <div className="new-estimate w-full h-full ">
      {estimateData && estimateData._id ? (
        <div className="new-estimate-page-container flex flex-row">
          <div className="basic-order-info-container w-full lg:w-3/4 ">
            <div className="order-init-container flex-col items-start justify-start lg:flex lg:flex-row lg:items-center lg:justify-start">
              <div className="flex w-fit">
                <Button
                  variant="plain"
                  onClick={() => window.history.back()}
                  className="back-arrow-button"
                >
                  <FaChevronLeft />
                </Button>

                <h2 className="m-0 font-header text-header-2 text-gray-900 estimate-order-title">
                  #{orderNumber}:
                </h2>
                <Input
                  value={orderTitle}
                  onChange={(e) => setOrderTitle(e.target.value)}
                  className="estimate-order-title p-1 w-[56%] h-[2.4rem] border border-transparent ml-2"
                  placeholder="Enter Order Title..."
                />
              </div>

              {/* <div className="estimate-interaction-buttons flex justify-start items-center">
              <div className="button-with-dropdown flex items-center justify-center">
                <Button variant="twoTone" className="flex justify-center items-center print-btn h-[2.4rem] font-medium" onClick={() => { }}>
                  <AiOutlinePrinter className="w-4 h-4 mr-1" />
                  Print
                </Button>
                <Dropdown placement="bottom-end" menuStyle={{ marginTop: "20px" }} renderTitle={dropdownBtn}>
                  {dropdownItems.map((item) => (
                    <Dropdown.Item key={item.key} eventKey={item.key}>
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
              <Button variant="twoTone" className="flex justify-center items-center ml-3 h-[2.4rem] font-medium" onClick={() => { setsendEstimateOpen(!sendEstimateOpen) }}>
                <FiSend className="mr-1" />
                Send
              </Button>

              <Button variant="twoTone" className="flex justify-center items-center ml-3 h-[2.4rem] font-medium" onClick={() => { }}>
                <FaRegMessage className="mr-1" />
                Message
              </Button>

              <Dropdown placement="bottom-end" menuStyle={{ marginTop: "8px" }} renderTitle={otherOptionsBtn}>
                {otherItems.map((item) => (
                  <Dropdown.Item key={item.key} eventKey={item.key}>
                    {item.name}
                  </Dropdown.Item>
                ))}
              </Dropdown>

              <p className="ml-4 w-[70px] flex justify-center items-center">{autoSaving ? <span className="flex justify-start items center">Saving <Spinner className="ml-2 mt-1" size={14} /></span> : <IoCloudDoneOutline size={20} />}</p>
              
            </div> */}
              <div className="estimate-interaction-buttons flex flex-wrap sm:flex-nowrap justify-start items-center">
                <div className="button-with-dropdown flex items-center justify-center mb-2 sm:mb-0 sm:w-auto w-full">
                  <Button
                    variant="twoTone"
                    className="flex justify-center items-center print-btn h-[2.4rem] font-medium sm:w-auto w-full"
                    onClick={() => {}}
                  >
                    <AiOutlinePrinter className="w-4 h-4 mr-1" />
                    Print
                  </Button>
                  <Dropdown
                    placement="bottom-end"
                    menuStyle={{ marginTop: "20px" }}
                    renderTitle={dropdownBtn}
                    className="sm:w-auto "
                  >
                    {dropdownItems.map((item) => (
                      <Dropdown.Item key={item.key} eventKey={item.key}>
                        {item.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </div>

                <Button
                  variant="twoTone"
                  className="flex justify-center items-center ml-0 sm:ml-3 h-[2.4rem] font-medium sm:w-auto w-full mb-2 sm:mb-0"
                  onClick={() => {
                    setsendEstimateOpen(!sendEstimateOpen);
                  }}
                >
                  <FiSend className="mr-1" />
                  Send
                </Button>

                <Button
                  variant="twoTone"
                  className="flex justify-center items-center ml-0 sm:ml-3 h-[2.4rem] font-medium sm:w-auto w-full mb-2 sm:mb-0"
                  onClick={() => {}}
                >
                  <FaRegMessage className="mr-1" />
                  Message
                </Button>

                <div className="flex sm:justify-around w-full">
                  <Dropdown
                    placement="bottom-end"
                    menuStyle={{ marginTop: "8px" }}
                    renderTitle={otherOptionsBtn}
                  >
                    {otherItems.map((item) => (
                      <Dropdown.Item
                        key={item.key}
                        eventKey={item.key}
                        onClick={handleDeleteFunction}
                      >
                        {item.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>

                  <p className="ml-0 sm:ml-4 w-full sm:w-[70px] flex justify-center items-center text-center">
                    {autoSaving ? (
                      <span className="flex justify-start items-center">
                        Saving <Spinner className="ml-2 mt-1" size={14} />
                      </span>
                    ) : (
                      <IoCloudDoneOutline size={20} />
                    )}
                  </p>
                  <div className="lg:hidden px-4 py-2">
                    <LeftSidePanel content={PanelContent} />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="block lg:hidden px-4 py-2">
                <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 border rounded-md"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
              </div> */}

            <div className="cust-and-veh-inputs flex mt-8">
              <SelectAndButton
                options={customerOptions}
                addNewButtonLabel="Add New Customer"
                value={selectedCustomer}
                onChange={async (value: any) => {
                  await setSelectedCustomer(value);

                  fetchVehiclesbycus(value._id);
                }}
                placeholder="Add Customer..."
                addNewClick={() =>
                  setAddCustomerModalOpen(!addCustomerModalOpen)
                }
                className="mb-4 mr-12 w-[256px]"
                // styles={{
                //   menu: (base) => ({
                //     ...base,
                //     maxHeight: "200px", // Limit the height of the dropdown
                //     overflowY: "auto", // Add vertical scrolling
                //   }),
                // }}
              />
              {addCustomerModalOpen ? (
                <AddNewCustomerModal
                  handleButtonClick={() =>
                    setAddCustomerModalOpen(!addCustomerModalOpen)
                  }
                />
              ) : null}

              <SelectAndButton
                options={vehicleOptions}
                addNewButtonLabel="Add New Vehicle"
                value={selectedVehicle}
                onChange={(value: any) => setSelectedVehicle(value)}
                placeholder="Add Vehicle..."
                addNewClick={() => setAddVehicleModalOpen(!addVehicleModalOpen)}
                className="mb-4 w-[256px]"
                styles={{
                  menu: (base) => ({
                    ...base,
                    maxHeight: "150px", // Limit the height of the dropdown
                    overflowY: "auto", // Add vertical scrolling
                  }),
                }}
              />
              {addVehicleModalOpen ? (
                <AddNewVehicleModal
                  customerid={selectedCustomerId}
                  handleButtonClick={() =>
                    setAddVehicleModalOpen(!addVehicleModalOpen)
                  }
                />
              ) : null}
            </div>

            <Tabs
              className="mt-5"
              onChange={(tab) => setPrimarySelectedTab(tab)}
              value={primarySelectedTab}
            >
              <TabList>
                <TabNav className="py-2 " value="services">
                  Services
                </TabNav>
                <TabNav className="py-2 " value="summary">
                  Summary
                </TabNav>
                <TabNav className="py-2 " value="inspections">
                  Inspections
                </TabNav>
                <TabNav className="py-2 " value="timeClocks">
                  Time Clocks
                </TabNav>
                <TabNav className="py-2 " value="partsAndTires">
                  Parts & Tires
                </TabNav>
              </TabList>

              <div className="bg-[#f0f1fa] pl-7 pr-4 lg:px-10 -mr-4 -ml-8 py-5 h-full">
                <TabContent value="services">
                  <ServicesTab
                    savedTotal={grandTotal || {}}
                    setGrandTotal={setGrandTotal}
                    grandTotal={grandTotal || {}}
                    prefillServicesData={estimateData.services || []}
                    storeDataInParent={(data: any) => setServicesData(data)}
                    estimateData={estimateData}
                    comment={customerComment}
                    recommendation={customerRecommendations}
                    onCommentChange={(value: any) => setCustomerComment(value)}
                    onRecommendatioChange={(value: any) =>
                      setCustomerRecommendations(value)
                    }
                  />
                </TabContent>

                <TabContent value="summary">hi</TabContent>
                <TabContent value="inspections">hi</TabContent>
                <TabContent value="timeClocks">hi</TabContent>
                <TabContent value="partsAndTires">hi</TabContent>
              </div>
            </Tabs>
          </div>
          <div className="relative hidden lg:block">
            <div
              className={`flex flex-col items-start justify-start w-80 -mr-14 `}
            >
              <Menu
                className="px-4 pb-4 border pt-7 -mt-7"
                variant={"light"}
                sideCollapsed={true}
              >
                <div className="p-1 w-full relative">
                  <Tabs
                    onChange={(tab) => setSelectedTab(tab)}
                    value={selectedTab}
                    variant="pill"
                  >
                    <TabList className="border rounded-md p-1">
                      <TabNav className="w-full py-1" value="order">
                        Order
                      </TabNav>
                      <TabNav className="w-full py-1" value="customer">
                        Customer
                      </TabNav>
                      <TabNav className="w-full py-1" value="vehicle">
                        Vehicle
                      </TabNav>
                    </TabList>

                    <TabContent value="order" className="P-0">
                      <NewEstimateOrderTab
                        servicesData={servicesData}
                        estimate={estimateData}
                        setisAppointmentModelOpen={setisAppointmentModelOpen}
                      />
                      <br />
                      <div className="w-full border-t"></div>
                      <Menu className="p-0">
                        <Menu.MenuCollapse
                          labelClass="w-full"
                          label={
                            <div className="flex items-center p-0">
                              <FaCheck className="mr-1" /> Authorizations
                            </div>
                          }
                        >
                          {Object.values(servicesData) &&
                            Object.values(servicesData).length > 0 &&
                            Object.values(servicesData).map((service: any) => {
                              return (
                                <Menu.MenuItem
                                  key={service._id}
                                  className="p-0"
                                  eventKey="wifi"
                                >
                                  <MenuContent
                                    icon={
                                      service.isAuthorized === true ? (
                                        <FaRegCheckCircle className="text-indigo-700" />
                                      ) : (
                                        <IoIosCloseCircleOutline className="text-indigo-700" />
                                      )
                                    }
                                    label={
                                      service.serviceTitle === ""
                                        ? "Untitled Service"
                                        : service.serviceTitle
                                    }
                                    service={service}
                                  />
                                </Menu.MenuItem>
                              );
                            })}
                        </Menu.MenuCollapse>
                      </Menu>
                      <br />
                      <div className="w-full border-t mb-5"></div>
                      {/* <Menu className="p-0">
                        <Menu.MenuCollapse
                          labelClass="w-full"
                          label={
                            <div className="flex items-center p-0">
                              <FiActivity className="mr-1 stroke-[3.5px] text-[15px]" />{" "}
                              Activity
                            </div>
                          }
                        >
                          <Activities />
                        </Menu.MenuCollapse>
                      </Menu> */}
                      {/* {estimateData &&
                        (estimateData.status === "Estimates" || estimateData.status === "In Progress" ||
                          estimateData.status === "Invoices") && ( */}
                      <Card
                        // className="fixed bottom-0 w-3/12 right-0"
                        headerClass="font-semibold text-lg text-indigo-600"
                        bodyClass="text-center "
                        footerClass="flex justify-end"
                        footer={cardFooter}
                      >
                        <div className="flex item-center justify-between">
                          <h6> Total Pay</h6>
                          <h6>${totalServiceGrandTotal}</h6>
                        </div>
                      </Card>
                      {/* )} */}
                      {/* {paymentSuccess ||
                        (status === "paid" && (
                          <div>
                            <Button variant="solid" className="w-full mt-4">
                              Invoice
                            </Button>
                          </div>
                        ))} */}
                      {estimateData &&
                        estimateData.status === "Dropped Off" && (
                          <div>
                            <Button variant="solid" className="w-full mt-4">
                              Invoice
                            </Button>
                          </div>
                        )}
                      {isPaymentModelOpen && (
                        <PaymentModel
                          handleClosePaymentModel={setisPaymentModelOpen}
                          estimateData={estimateData}
                          estimateGrandTotal={totalServiceGrandTotal}
                          setPaymentSuccess={setPaymentSuccess}
                        />
                      )}

                      <div className="mt-5">
                        <p className="text-black font-semibold">Select Rate:</p>
                        <div className="my-2 ">
                          <FormItem>
                            <SelectAndButton
                              name="rate"
                              options={allRates} // Ensure this contains valid options
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
                              // onRateAdded={handleNewRateAdded}
                            />
                          )}
                        </div>
                      </div>
                    </TabContent>

                    <TabContent value="customer">
                      <NewEstimateCustomerTab
                        selectedCustomer={selectedCustomer}
                        estimate={estimateData}
                        setisAppointmentModelOpen={setisAppointmentModelOpen}
                      />
                    </TabContent>

                    <TabContent value="vehicle">
                      <NewEstimateVehicleTab
                        selectedVehicle={selectedVehicle}
                        estimate={estimateData}
                        setisAppointmentModelOpen={setisAppointmentModelOpen}
                      />
                    </TabContent>
                  </Tabs>
                </div>
              </Menu>
            </div>
          </div>
        </div>
      ) : null}
      {isAppointmentModelOpen ? (
        <AddNewAppointmentModal
          isModalOpen={isAppointmentModelOpen}
          setModalOpen={setisAppointmentModelOpen}
        />
      ) : null}
      {sendEstimateOpen ? (
        <SendEstimate
          selectedCustomer={selectedCustomer}
          estimateId={estimateId}
          orderNumber={orderNumber}
          selectedVehicle={selectedVehicle}
          handleButtonClick={() => setsendEstimateOpen(!sendEstimateOpen)}
        />
      ) : null}
      {status === "paid" ? (
        // || paymentSuccess === true
        isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pointer-events-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 relative w-96">
              <button
                className="absolute top-2 right-2 text-gray-600 text-xl"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-[#4f46e5] text-2xl font-bold flex items-center justify-center mt-4">
                <svg
                  className="w-8 h-8 text-[#4f46e5] mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Payment Successful!
              </h2>
              <p className="text-gray-600 text-center mt-2">
                Thank you for your payment.
              </p>
            </div>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default NewEstimate;
