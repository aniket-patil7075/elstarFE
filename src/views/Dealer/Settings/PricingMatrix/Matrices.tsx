import { Button, Dropdown } from "@/components/ui";
import SelectAndButton from "@/components/ui/SelectAndButton";
import React, { useEffect, useState } from "react";
import { getAllPricingMatrix } from "../../DealerLists/Services/DealerListServices";


const Matrices = ({ onSelectMatrix }) => {
  const [selectedMatrix, setSelectedMatrix] =  useState("");
  const [pricingMatrices, setPricingMatrices] = useState([]);

  const onDropdownItemClick = (label: any) => {
    setSelectedMatrix(label);
  };


  const fetchMatrices = async () => {
    try {
      let pricingMatrix = await getAllPricingMatrix();
      // console.log("pricing matrix:", pricingMatrix);
      
      if (pricingMatrix?.allPricingMatrix) {
        setPricingMatrices(pricingMatrix.allPricingMatrix);
        setSelectedMatrix(pricingMatrix.allPricingMatrix[0].title);
      }
    } catch (error) {
      console.error("Error fetching pricing matrices:", error);
    }
  };

  useEffect(()=>{
    fetchMatrices()
  },[])

  const handleNewMatrix = () => {
    const newMatrix = {
      _id: `matrix-${pricingMatrices.length + 1}`, // Temporary unique ID
      title: `New Matrix ${pricingMatrices.length + 1}`,
      rows: [],
    };

    setPricingMatrices([...pricingMatrices, newMatrix]);
    onSelectMatrix(newMatrix); // Display the new matrix
  };

  return (
    <div>
      <div className="border">
        <div className="mx-5 my-5">
          <h5 className="text-gray-700">Matrices</h5>
        </div>
        <div>
         <div className="flex flex-col w-full text-gray-500">
            {pricingMatrices.map((matrix:any) => (
              <div key={matrix._id} className="flex justify-between py-3 px-5 cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectMatrix(matrix)} 
              >
                <span className="text-start">{matrix.title}</span>
                <span className="text-end">{matrix.rows.length}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="my-5 text-center">
          <Button size="sm" variant="solid" onClick={handleNewMatrix}>
            New Matrix
          </Button>
        </div>
      </div>
      <div className=" my-5 !text-gray-700">
        <h6>Default Matrix (for new labor items)</h6>
        <div className="w-full border bg-white p-1 my-2">
        <Dropdown title={selectedMatrix || "Select a Matrix"} className="bg-white me-5">
            {pricingMatrices.map((matrix) => (
              <Dropdown.Item key={matrix._id} onClick={() => onDropdownItemClick(matrix.title)}>
                {matrix.title}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Matrices;
