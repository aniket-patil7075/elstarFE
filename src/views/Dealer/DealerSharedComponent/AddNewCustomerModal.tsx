import { apiNewCustomer, getAllCustomers } from "../../Dealer/DealerLists/Services/DealerListServices";
import { Button } from "@/components/ui";
import { useCallback, useEffect, useState } from "react";
import BasicInfo from "../../Dealer/DealerLists/Customers/CustomersForm/BasicInfo";
import { Formik, Form } from "formik";
import toast from "@/components/ui/toast";
import Notification from "@/components/ui/Notification";
import {
  getCustomers,
  useAppDispatch,
  useAppSelector,
} from "../DealerLists/Store";
import { validationSchema } from "../DealerLists/Customers/CustomersStatistics";
import { use } from "i18next";

const AddNewCustomerModal = ({ handleButtonClick }: any) => {
  const [showFees, setShowFees] = useState(false);

  const dispatch = useAppDispatch();
  const filterData = useAppSelector((state) => state.list.customerFilterData);
  const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    (state) => state.dealer.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getCustomers({ pageIndex, pageSize, sort, query, filterData }));
  }, [pageIndex, pageSize, sort, query, filterData, dispatch]);


  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: [{ type: "mobile", number: "" }], // number is initialized with 0
    email: [""],
    preferredContactMethod: "", // Default to 'both' or another valid option if needed
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
  };

  // console.log("Initial Values : ", initialValues)

  
  

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[550px] h-[570px] rounded-lg shadow-lg relative border border-gray-200">
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="text-lg font-semibold">New Customer</h3>
              <button
                className="text-gray-500 hover:text-gray-700 font-bold"
                onClick={handleButtonClick}
              >
                ✕
              </button>
            </div>
            <div
              className="overflow-y-auto p-4"
              style={{ height: "calc(100% - 110px)" }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                  try {
                    console.log("Saving new customer:", values);
                    const response = await apiNewCustomer(values); // Save customer to the API

                    toast.push(
                      <Notification title="Success" type="success">
                        New Customer Saved Successfully
                      </Notification>
                    );

                    // Re-fetch customers to update the list
                    await fetchData();

                    // Optionally close the modal
                    handleButtonClick();

                    // Reset form and complete submission
                    resetForm();
                    setSubmitting(false);
                  } catch (error) {
                    console.error("Error saving customer:", error);
                    toast.push(
                      <Notification title="Error" type="danger">
                        Error saving customer
                      </Notification>
                    );
                  }
                }}
              >
                {({ touched, errors, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <BasicInfo touched={touched} errors={errors} />
                  
                    <div className="absolute bottom-0 left-0 right-0 flex justify-end p-2 border-t bg-white">
                      <Button
                        variant="primary"
                        type="button"
                        className="bg-gray-300 mr-2 px-4 py-1.5"
                        onClick={handleButtonClick}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="solid"
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5"
                      >
                        Save
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCustomerModal;
