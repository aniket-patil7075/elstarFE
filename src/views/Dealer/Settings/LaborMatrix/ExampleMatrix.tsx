import { useEffect, useState } from "react";
import { Button, Notification, toast } from "@/components/ui";
import Table from "@/components/ui/Table";
import { HiDownload, HiTrash, HiOutlineDotsHorizontal } from "react-icons/hi";
import { apiAddLaborMatrix, apiUpdateLaborMatrix } from "../../DealerLists/Services/DealerListServices";

const { Tr, Th, Td, THead, TBody } = Table;


const ExampleMatrix = ({ initialData , titleData,idData }) => {
  const [rows, setRows] = useState(initialData);
  const [title, setTitle] = useState(titleData);
  const [openMenuIndex, setOpenMenuIndex] = useState(null); 

console.log(idData)

  useEffect(() => {
    if (Array.isArray(initialData)) {
      const formattedRows = initialData.map(row =>
        Array.isArray(row) ? row : [row.cost || "0", row.markup || "0", row.margin || "0"]
      );
      setRows(formattedRows);
    } else {
      setRows([]);
    }
  
    setTitle(titleData || "");
  }, [initialData, titleData]);
  

  const handleAddRow = () => {
    setRows([...rows, ["0", "0", "0"]]);
  };

  const handleChange = (rowIndex:any, cellIndex:any, value:any) => {
    const newRows = [...rows];
    newRows[rowIndex][cellIndex] = value;
    setRows(newRows);
  };

  const handleMenuToggle = (index:any) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index); 
  };

  const handleEdit = (index:any) => {
    // console.log(`Editing row ${index}`);
    setOpenMenuIndex(null);
  };

  const handleDelete = (index:any) => {
    setRows(rows.filter((_, i) => i !== index)); 
    setOpenMenuIndex(null);
  };

  const handleSaveMatrix = async() =>{
    try {
      const formattedRows = rows.map(row => ({
        cost: row[0], 
        markup: row[1], 
        margin: row[2]
      }));
  
      const updatedMatrixData = { 
        id: idData,  // Keep the existing ID if available
        title, 
        rows: formattedRows
      };
  
  
      if (!updatedMatrixData.id || updatedMatrixData.id.startsWith("matrix-")) {
        await apiAddLaborMatrix(updatedMatrixData); 
      } else {
        await apiUpdateLaborMatrix(updatedMatrixData);
      }
  
      toast.push(
        <Notification title="Success" type="success">
          Matrix {(!updatedMatrixData.id || updatedMatrixData.id.startsWith("matrix-")) ? "Saved" : "Updated"} Successfully
        </Notification>
      );
  
    } catch (error) {
      console.error("Error saving matrix data:", error);
    }
  }

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
          <Button block size="sm" icon={<HiDownload />} onClick={handleSaveMatrix}>
            save
          </Button>
          <Button className="flex items-center gap-1 px-5" variant="solid" size="sm">
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
            <Th className="!text-gray-700"></Th>
          </Tr>
        </THead>
        <TBody className="text-gray-500">
          {rows.map((row : any, rowIndex: any) => (
            <Tr key={rowIndex} className="relative">
              {row.map((cell: any, cellIndex: any) => (
                <Td key={cellIndex}>
                  {cellIndex < 3 ? (
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleChange(rowIndex, cellIndex, e.target.value)}
                      className="w-16 p-1 border border-gray-300 rounded focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none"
                    />
                  ) : (
                    <div className="relative">
                      <HiOutlineDotsHorizontal
                        className="text-xl text-gray-500 cursor-pointer"
                        onClick={() => handleMenuToggle(rowIndex)}
                      />
                      {openMenuIndex === rowIndex && (
                        <div className="absolute right-0 mt-1 w-24 bg-white border rounded shadow-lg z-10">
                          <p
                            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleEdit(rowIndex)}
                          >
                            Edit
                          </p>
                          <p
                            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleDelete(rowIndex)}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Td>
              ))}
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
