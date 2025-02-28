import { useEffect, useState } from "react";
import { Button, Notification, toast } from "@/components/ui";
import Table from "@/components/ui/Table";
import { HiDownload, HiTrash, HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  apiAddLaborMatrix,
  apiDeleteLaborFlag,
  apiUpdateLaborMatrix,
} from "../../DealerLists/Services/DealerListServices";

const { Tr, Th, Td, THead, TBody } = Table;

const ExampleMatrix = ({ selectedMatrix }) => {
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState(selectedMatrix?.title || "");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  console.log("selected Matrix : ", selectedMatrix);

  useEffect(() => {
    if (Array.isArray(selectedMatrix?.rows)) {
      setRows(
        selectedMatrix.rows.map((row) => ({
          _id: row._id || crypto.randomUUID(), // Ensure new rows have unique IDs
          cost: row.cost || "0",
          markup: row.markup || "0",
          margin: row.margin || "0",
          rowDeleteFlag: row.rowDeleteFlag || 0,
        }))
      );
    } else {
      setRows([]);
    }
    setTitle(selectedMatrix?.title || "");
  }, [selectedMatrix]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      { _id: crypto.randomUUID(), cost: "0", markup: "0", margin: "0" },
    ]);
  };

  const handleChange = (rowIndex, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === rowIndex ? { ...row, [field]: value } : row
      )
    );
  };

  const handleDeleteRow = async (rowId) => {
    console.log("deleted matrix : ", rowId);
    try {
      await apiDeleteLaborFlag(rowId);
      if (rowId === selectedMatrix._id) {
        // If deleting the entire matrix, reset state
        setRows([]);
        setTitle("");
      } else {
        // If deleting a specific row, filter it out
        setRows((prevRows) => prevRows.filter((row) => row._id !== rowId));
      }
      
      toast.push(
        <Notification title="Success" type="success">
        {rowId === selectedMatrix._id ? "Matrix Deleted" : "Row Deleted"} Successfully
      </Notification>
      );
    } catch (error) {
      console.log(error);
    }
    setOpenMenuIndex(null);
  };

  const handleSaveMatrix = async () => {
    try {
      const updatedMatrixData = {
        id: selectedMatrix?._id,
        title,
        rows: rows.map(({ _id, ...rest }) => rest), // Exclude _id in the API request
      };

      if (!updatedMatrixData.id || updatedMatrixData.id.startsWith("matrix-")) {
        await apiAddLaborMatrix(updatedMatrixData);
      } else {
        await apiUpdateLaborMatrix(updatedMatrixData);
      }

      toast.push(
        <Notification title="Success" type="success">
          Matrix{" "}
          {!updatedMatrixData.id || updatedMatrixData.id.startsWith("matrix-")
            ? "Saved"
            : "Updated"}{" "}
          Successfully
        </Notification>
      );
    } catch (error) {
      console.error("Error saving matrix data:", error);
    }
  };

  return (
    <div className="border relative">
      <div className="md:flex items-center justify-between mx-5 my-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Matrix Title"
          className="text-gray-700 font-semibold bg-transparent border border-transparent focus:border-blue-700 focus:ring-1 focus:ring-blue-700 p-2 outline-none"
        />
        <div className="flex gap-2 items-center">
          <Button
            block
            size="sm"
            icon={<HiDownload />}
            onClick={handleSaveMatrix}
          >
            Save
          </Button>
          <Button
            className="flex items-center gap-1 px-5"
            variant="solid"
            size="sm"
            onClick={() => handleDeleteRow(selectedMatrix._id)}
          >
            <HiTrash className="text-xl" />
          </Button>
        </div>
      </div>

      <Table>
        <THead>
          <Tr className="!text-gray-700">
            <Th className="!text-gray-700">Cost</Th>
            <Th className="!text-gray-700">Markup</Th>
            <Th className="!text-gray-700">Margin</Th>
            <Th className="!text-gray-700">Actions</Th>
          </Tr>
        </THead>
        <TBody className="text-gray-500">
          {rows
            .filter((row: any) => row.rowDeleteFlag === 0)
            .map((row, rowIndex) => (
              <Tr key={row._id} className="relative">
                {["cost", "markup", "margin"].map((field, cellIndex) => (
                  <Td key={cellIndex}>
                    <input
                      type="text"
                      value={row[field]}
                      onChange={(e) =>
                        handleChange(rowIndex, field, e.target.value)
                      }
                      className="w-16 p-1 border border-gray-300 rounded focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none"
                    />
                  </Td>
                ))}
                <Td>
                  <div className="relative">
                    <HiOutlineDotsHorizontal
                      className="text-xl text-gray-500 cursor-pointer"
                      onClick={() =>
                        setOpenMenuIndex(
                          openMenuIndex === rowIndex ? null : rowIndex
                        )
                      }
                    />
                    {openMenuIndex === rowIndex && (
                      <div className="absolute mt-1 w-24 bg-white border rounded shadow-lg z-10">
                        <p
                          className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleDeleteRow(row._id)}
                        >
                          Delete
                        </p>
                      </div>
                    )}
                  </div>
                </Td>
              </Tr>
            ))}
        </TBody>
      </Table>

      <div className="mx-5 my-3">
        <p className="text-blue-700 cursor-pointer" onClick={handleAddRow}>
          Add Range
        </p>
      </div>
    </div>
  );
};

export default ExampleMatrix;
