import { useState } from "react";
import { Button } from "@/components/ui";
import Table from "@/components/ui/Table";
import { HiDownload, HiTrash } from "react-icons/hi";

const { Tr, Th, Td, THead, TBody } = Table;

const ExampleMatrix = () => {
  const [rows, setRows] = useState([
    ["-", "-", "-", "-"],
    ["-", "-", "-", "-"],
    ["-", "-", "-", "-"],
    ["-", "-", "-", "-"],
  ]);

  const handleAddRow = () => {
    setRows([...rows, ["-", "-", "-", "-"]]);
  };

  return (
    <div className="border">
      <div className="md:flex items-center justify-between mx-5 my-5">
        <div className="">
          <h5 className="text-gray-700">Example Matrix</h5>
        </div>
        <div className="flex gap-2 items-center">
          <Button block size="sm" icon={<HiDownload />}>
            Export
          </Button>

          <Button className="flex items-center gap-1 px-5" variant="solid" size="sm">
            <HiTrash className="text-xl" />
          </Button>
        </div>
      </div>
      <div>
        <Table>
          <THead>
            <Tr className="!text-gray-700">
              <Th className="!text-gray-700">Cost</Th>
              <Th className="!text-gray-700">Markup</Th>
              <Th className="!text-gray-700">Margin</Th>
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
      <div className="mx-5 my-3">
        <p className="text-blue-700 cursor-pointer" onClick={handleAddRow}>
          Add Range
        </p>
      </div>
    </div>
  );
};

export default ExampleMatrix;
