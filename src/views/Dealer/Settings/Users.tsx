import { DataTable } from "@/components/shared";
import { Button } from "@/components/ui";
import { getAllDealers } from "@/views/SuperAdmin/dealers/DealerServices";
import React, { useEffect, useMemo, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import AddNewUserModal from "./Users/AddNewUserModal";

type userData = {
  fullName: string;
  userName: string;
  email: string;
  role: string;
  phoneNumber: number;
};
type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
  cell?: (info: any) => JSX.Element;
};

const Users = () => {
  const [data, setData] = useState<userData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);

  const userData = async () => {
    try {
      const response = await getAllDealers();
      if (
        response?.status === "success" &&
        Array.isArray(response.allDealers)
      ) {
        setData(response.allDealers);
        setCheckedCount(response.allDealers.filter(user => user.isActive).length);
      }
    } catch (error) {
      console.error("Error fetching dealers:", error);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  const handleCheckboxChange = (index: number) => {
    setData((prevData) => {
      if (!prevData[index]) return prevData; 
      const newData = [...prevData];
      newData[index] = { ...newData[index], isActive: !newData[index].isActive };
      setCheckedCount(newData.filter(user => user.isActive).length);
      return newData;
    });
  };
  

  const columns: ColumnDef<userData>[] = useMemo(
    () => [
      {
        header: "Active",
        accessorKey: "isActive",
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.original?.isActive || false} // Ensure it doesn't break
            onChange={() => handleCheckboxChange(row.index)}
            className="w-4 h-4 cursor-pointer"
          />
        ),
      },
      { header: "Full Name", accessorKey: "fullname" },
      { header: "Phone", accessorKey: "phoneNumber" },
      { header: "Email", accessorKey: "email" },
      { header: "Type", accessorKey: "role" },
      { header: "Rate", accessorKey: "" },
      {
        header: "Registration Date",
        accessorKey: "createdAt",
        cell: ({ row }) =>
          new Date(row.original.createdAt).toISOString().split("T")[0],
      },
    ],
    []
  );

  const handleButtonClick = () => {
    setShowForm(!showForm) 
}

  return (
    <div>
      <div className="md:flex items-center justify-between">
        <div className="mb-5 ms-2">
          <h3 className="mb-4 lg:mb-0 ">Users</h3>
          <p className="text-gray-700">0 of {checkedCount} Licences Available <span className="text-blue-500 cursor-pointer">Add More</span></p>
        </div>
        <div className="flex gap-2 items-center mb-4 ">
          <Button
            className=" flex items-center gap-1"
            variant="solid"
            size="sm"
            onClick={handleButtonClick}
          >
            <HiOutlineUser />
            Add New User
          </Button>
        </div>
      </div>
      <div className="mt-5">
        {data && data.length > 0 ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <div>No Any User</div>
        )}
      </div>
      {showForm && (
                    <AddNewUserModal handleButtonClick={handleButtonClick} />
                )}
    </div>
  );
};

export default Users;
