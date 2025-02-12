import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Table from "@/components/ui/Table";
import { getAllEstimates } from "../Services/WorkflowService";
import {
  HiChat,
  HiCheckCircle,
  HiOutlineCalculator,
  HiOutlineCalendar,
  HiOutlineMenuAlt2,
  HiOutlineUserCircle,
  HiTruck,
} from "react-icons/hi";
const { Tr, Th, Td, THead, TBody } = Table;

type ColumnType = {
  id: string;
  content: string;
};

type ColumnsType = {
  estimate: ColumnType[];
  droppedOff: ColumnType[];
  inProgress: ColumnType[];
  invoices: ColumnType[];
};

// const initialColumns: ColumnsType = {
//   estimate: [
//     { id: "1", content: "Estimate 1" },
//     { id: "2", content: "Estimate 2" },
//   ],
//   droppedOff: [
//     { id: "3", content: "Dropped Off 1" },
//     { id: "4", content: "Dropped Off 2" },
//   ],
//   inProgress: [
//     { id: "5", content: "In Progress 1" },
//     { id: "6", content: "In Progress 2" },
//   ],
//   invoices: [
//     { id: "7", content: "Invoice 1" },
//     { id: "8", content: "Invoice 2" },
//   ],
// };

const WorkFlowColumn: React.FC = () => {
  const [columns, setColumns] = useState({
    estimate: [],
    droppedOff: [],
    inProgress: [],
    invoices: [],
  });
  const [order, setOrder] = useState([]);

  const fetchEstimate = async () => {
    try {
      const response = await getAllEstimates();
      if (
        response?.status === "success" &&
        Array.isArray(response.allEstimates)
      ) {
        setOrder(response.allEstimates);

        const categorizedData = {
          estimate: response.allEstimates.filter(
            (order: any) => order.status === "Estimates"
          ),
          droppedOff: response.allEstimates.filter(
            (order: any) => order.status === "Dropped Off"
          ),
          inProgress: response.allEstimates.filter(
            (order: any) => order.status === "In Progress"
          ),
          invoices: response.allEstimates.filter(
            (order: any) => order.status === "Invoice"
          ),
        };

        setColumns(categorizedData);
      } else {
        console.log("No estimate found...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEstimate();
  }, []);

  console.log("column : ", columns);
  console.log("order : ", order);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceDroppableId = source.droppableId as keyof ColumnsType;
    const destDroppableId = destination.droppableId as keyof ColumnsType;

    if (
      sourceDroppableId === destDroppableId &&
      source.index === destination.index
    )
      return;

    const sourceColumn = [...columns[sourceDroppableId]];
    const destColumn = [...columns[destDroppableId]];
    const [movedItem] = sourceColumn.splice(source.index, 1);

    if (!destColumn.some((item) => item.id === movedItem.id)) {
      destColumn.splice(destination.index, 0, movedItem);
    }

    setColumns({
      ...columns,
      [sourceDroppableId]: sourceColumn,
      [destDroppableId]: destColumn,
    });
  };

  return (
    <div className="p-4 overflow-x-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Table className="w-full border-collapse border border-gray-300 table-fixed min-w-[1000px]">
          <THead>
            <Tr>
              {Object.keys(columns).map((col) => (
                <Th
                  key={col}
                  className="p-3 border border-gray-300 text-center w-1/4 capitalize"
                >
                  {col.replace(/([A-Z])/g, " $1").trim()}
                </Th>
              ))}
            </Tr>
          </THead>
          <TBody className="bg-gray-100">
            <Tr>
              {Object.keys(columns).map((col) => (
                <Td key={col} className="workflowTable align-top w-1/4 ">
                  <Droppable droppableId={col}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="min-h-[100px]"
                      >
                        {columns[col].map((order, index) => (
                          <Draggable
                            key={order._id}
                            draggableId={order._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-3 mb-2 bg-white text-black rounded-lg shadow-md cursor-pointer transition ${
                                  snapshot.isDragging
                                    ? "bg-blue-700 text-white"
                                    : ""
                                }`}
                              >
                                <p className="font-bold text-blue-700">
                                  #({order.orderNo}) {order.orderName}
                                </p>
                                <p className="flex items-center gap-2 text-gray-700 my-1">
                                  <HiOutlineUserCircle className="text-xl" />
                                  {" : "} {order.customer.firstName}{" "}
                                  {order.customer.lastName}
                                </p>
                                <p className="flex items-center gap-2 text-gray-700 my-1">
                                  <HiTruck className="text-xl" />
                                  {" : "} {order.vehicle.year}{" "}
                                  {order.vehicle.make}
                                </p>
                                <p className="flex items-center gap-2 text-gray-700 my-1">
                                  <HiOutlineCalculator className="text-xl" />
                                  {" : "}
                                </p>
                                <div className="flex items-center justify-between gap-2 text-gray-700">
                                  <div className="flex items-center justify-between gap-2 text-gray-700">
                                    <HiCheckCircle className="text-xl" />{" "}
                                    <HiChat className="text-xl" />{" "}
                                    <HiOutlineCalendar className="text-xl" />{" "}
                                    <HiOutlineMenuAlt2 className="text-xl" />{" "}
                                  </div>
                                  <div className="text-end">
                                  <p>${order.grandTotal}</p>
                                  <p className="text-red-500">Due ${order.remainingAmount}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Td>
              ))}
            </Tr>
          </TBody>
        </Table>
      </DragDropContext>
    </div>
  );
};

export default WorkFlowColumn;
