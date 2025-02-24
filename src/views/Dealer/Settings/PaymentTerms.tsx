import { Button, Dropdown } from '@/components/ui';
import React, { useState } from 'react'
import Table from "@/components/ui/Table";
import { HiDownload, HiPlus, HiTrash } from 'react-icons/hi';
const { Tr, Th, Td, THead, TBody } = Table;
const paymentTermOptions = [
  { label: "On Receipt A", value: "on_receipt_a" },
  { label: "On Receipt B", value: "on_receipt_b" },
  { label: "On Receipt C", value: "on_receipt_c" },
];


const PaymentTerms = () => {
  const [selectedFleets, setSelectedFleets] = useState(paymentTermOptions[0].label);
  const [selectedCustomers, setSelectedCustomers] = useState(paymentTermOptions[0].label);

  const onFleetsClick = (label: any) => {
    setSelectedFleets(label);
  };
  const onCustomersClick = (label: any) => {
    setSelectedCustomers(label);
  };
  const [rows, setRows] = useState([
    ["Net 60", "60", "-", "-"],
    ["Net 30", "30", "-", "-"],
    ["On Receipt", "0", "Payment is due immediately", "-"],
    ["Net 45", "45", "-", "-"],
    ["Net 7", "7", "-", "-"],
    ["Net 10", "10", "-", "-"],

  ]);

  const handleAddRow = () => {
    setRows([...rows, ["-", "-", "-", "-"]]);
  };

  return (
    <div>
      <div className="mb-5 ms-2">
        <h3 className="mb-4 lg:mb-0 ">Payment Terms</h3>
        <p className='text-gray-700'>Use Payment Terms so your customers can pay their invoices within a specified time frame.</p>
      </div>
      <div className=''>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full lg:w-4/6  ">
            <div className='border bg-gray-100'>
              <div className="mx-5 my-5">
                <h5 className="text-gray-700">Defaults</h5>
              </div>
              <div className="flex border-t">
                <div className="w-1/2 mx-5 my-4">
                  <h6>Fleets</h6>
                  <div className="w-full border bg-white p-1 my-2">
                    <Dropdown title={selectedFleets} className="bg-white me-5">
                      {paymentTermOptions.map((option) => (
                        <Dropdown.Item key={option.value} eventKey={option.value} onClick={() => onFleetsClick(option.label)}>
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  </div>
                </div>
                <div className="w-1/2 mx-5 my-4">
                  <h6>Customers</h6>
                  <div className="w-full border bg-white p-1 my-2">
                    <Dropdown title={selectedCustomers} className="bg-white me-5">
                      {paymentTermOptions.map((option) => (
                        <Dropdown.Item key={option.value} eventKey={option.value} onClick={() => onCustomersClick(option.label)}>
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>

            <div className="border mt-5 ">
              <div className="md:flex items-center justify-between mx-5 my-5">
                <div className="">
                  <h5 className="text-gray-700">Terms</h5>
                </div>
                <div className="flex gap-2 items-center">


                  <Button className="flex items-center gap-1 px-3" variant="solid" size="sm" onClick={handleAddRow}>
                    <HiPlus className="text-xl" />
                    New Term
                  </Button>
                </div>
              </div>
              <div>
                <Table>
                  <THead>
                    <Tr className="!text-gray-700">
                      <Th className="!text-gray-700">Name</Th>
                      <Th className="!text-gray-700">Due in</Th>
                      <Th className="!text-gray-700">Note</Th>
                      <Th className="!text-gray-700"></Th>
                    </Tr>
                  </THead>
                  <TBody className="text-gray-500">
                    {rows.map((row, index) => (
                      <Tr key={index}>
                        {row.map((cell, cellIndex) => (
                          <Td key={cellIndex}>{cell}</Td>
                        ))}
                      </Tr>
                    ))}
                  </TBody>
                </Table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentTerms