import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormContainer,
  FormItem,
  Input,
  Notification,
  toast,
} from "@/components/ui";
import { HiOutlineSave } from "react-icons/hi";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { apiAddNewGeneralSetting } from "../../DealerLists/Services/DealerListServices";
import { apiAddNewRate, getAllGeneralRate } from "../../DealerLists/Services/DealerInventoryServices";

const validationSchema = Yup.object().shape({
  rateName: Yup.string().required("Rate Name is required"),
  rate: Yup.number()
    .typeError("Rate must be a number")
    .required("Rate is required"),
});

const AddNewRatesModal = ({ isOpen, onClose, onRateAdded  }: any) => {
  const [showForm, setshowForm] = useState(true);
  const initialValues = { rateName: "", rate: 0 };
  const handleCancel = () => onClose();

  return (
    <>
      {showForm && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="bg-white rounded shadow-md z-60 w-full max-w-3xl relative overflow-y-auto"
            style={{ height: "42vh" }}
          >
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="text-base font-semibold">New Rate</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCancel}
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto p-4 pb-12">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                  const formData = cloneDeep(values);
                  try {
                    await apiAddNewRate(formData);
                    toast.push(
                      <Notification title="Success" type="success">
                        New Rate Saved Successfully
                      </Notification>
                    );
                    resetForm();
                    setSubmitting(false);
                    setshowForm(false);
                    onRateAdded();
                  } catch (error: any) {
                    toast.push(
                      <Notification title="Error" type="danger">
                        {error.message || "Server Error"}
                      </Notification>
                    );
                  }
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <FormContainer>
                      <FormItem
                        label="Rate Name"
                        invalid={!!(errors.rateName && touched.rateName)}
                      >
                        <Field
                          name="rateName"
                          type="text"
                          autoComplete="off"
                          component={Input}
                          placeholder="Rate Name"
                          className="border border-gray-300 outline-none p-1 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                      </FormItem>
                      <FormItem
                        label="Rate per Hour"
                        invalid={!!(errors.rate && touched.rate)}
                      >
                        <Field
                          name="rate"
                          type="number"
                          autoComplete="off"
                          component={Input}
                          placeholder="Rate per Hour"
                          className="border border-gray-300 outline-none p-1 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                      </FormItem>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-end p-2 border-t bg-white">
                        <Button
                          variant="primary"
                          className="bg-gray-300 mr-2 px-4 py-1.5"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="solid"
                          loading={isSubmitting}
                          icon={<HiOutlineSave />}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5"
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </FormContainer>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewRatesModal;
