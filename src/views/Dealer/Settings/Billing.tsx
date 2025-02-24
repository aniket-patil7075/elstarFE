import { Button } from "@/components/ui";
import Table from "@/components/ui/Table";
import { HiDownload, HiPlus, HiTrash } from 'react-icons/hi';
const { Tr, Th, Td, THead, TBody } = Table;

const Billing = () => {
  return (
    <div>
      <div className="mb-5 ms-2">
        <h3 className="mb-4 lg:mb-0 ">Billing</h3>
        <p className='text-gray-700'>Use Pricing Matrix to systematize your parts markup and stramline your profits.</p>
      </div>
      <div className=''>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full lg:w-4/6  ">
            <div className='border bg-gray-100'>
              <div className="mx-5 my-5">
                <h5 className="text-gray-700">Payment Method</h5>
              </div>
              <div className="my-5">
                <div className="md:flex items-center justify-between mx-5">
                  <p className="text-gray-700">Visa card ending in 8448</p>
                  <p className="text-blue-500 cursor-pointer">Change Payment</p>
                </div>
                <div className="mx-5"><p>Valid through 7/29</p></div>
              </div>
            </div>

            <div className="border mt-5 ">
              <div className="md:flex items-center justify-between mx-5 my-5">
                <div className="">
                  <h5 className="text-gray-700">Invoices</h5>
                </div>
                <div className="flex gap-2 items-center">
                </div>
              </div>
              <div>
                <Table>
                  <THead>
                    <Tr className="!text-gray-700">
                      <Th className="!text-gray-700">DATE</Th>
                      <Th className="!text-gray-700">TOTAL</Th>
                      <Th className="!text-gray-700">CREDITS</Th>
                      <Th className="!text-gray-700">DUE</Th>
                      <Th className="!text-gray-700">STATUS</Th>
                      <Th className="!text-gray-700">PDF</Th>
                    </Tr>
                  </THead>
                  <TBody className="text-gray-500">
                    <Tr>
                      <Td>2024-02-24</Td>
                      <Td>$500</Td>
                      <Td>$200</Td>
                      <Td>$300</Td>
                      <Td className="text-green-500">Paid</Td>
                      <Td>
                        <button className="text-blue-500 underline">Download</button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>2024-02-23</Td>
                      <Td>$750</Td>
                      <Td>$250</Td>
                      <Td>$500</Td>
                      <Td className="text-red-500">Unpaid</Td>
                      <Td>
                        <button className="text-blue-500 underline">Download</button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>2024-02-22</Td>
                      <Td>$600</Td>
                      <Td>$400</Td>
                      <Td>$200</Td>
                      <Td className="text-yellow-500">Pending</Td>
                      <Td>
                        <button className="text-blue-500 underline">Download</button>
                      </Td>
                    </Tr>
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

export default Billing