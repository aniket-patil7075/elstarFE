import Tabs from "@/components/ui/Tabs";
import DeletedOrders from "./DeletedItems/DeletedOrders";
import CannedServices from "./DeletedItems/CannedServices";
import InspectionTemplates from "./DeletedItems/InspectionTemplates";
import InventoryParts from "./DeletedItems/InventoryParts";
import InventoryTires from "./DeletedItems/InventoryTires";
import InventoryLabors from "./DeletedItems/InventoryLabors";
import InventoryFees from "./DeletedItems/InventoryFees";
const { TabNav, TabList, TabContent } = Tabs;

const DeletedItems = () => {
  return (
    <div>
      <div className="mb-5 ms-2">
        <h3 className="mb-4 lg:mb-0 ">Deleted Items</h3>
      </div>
      <div><Tabs defaultValue="tab1">
        <TabList>
          <TabNav value="tab1">Orders</TabNav>
          <TabNav value="tab2">Canned Services</TabNav>
          <TabNav value="tab3">Inspection Templates</TabNav>
          <TabNav value="tab4">Inventory Parts</TabNav>
          <TabNav value="tab5">Inventory Tires</TabNav>
          <TabNav value="tab6">Inventory Labors</TabNav>
          <TabNav value="tab7">Inventory Fees</TabNav>
        </TabList>
        <div className="p-4">
          <TabContent value="tab1">
            <div className="">
              <DeletedOrders/>
            </div>
          </TabContent>
          <TabContent value="tab2">
            <div className="">
              <CannedServices />
            </div>
          </TabContent>
          <TabContent value="tab3">
            <div className="">
              <InspectionTemplates />
            </div>
          </TabContent>
          <TabContent value="tab4">
            <div className="">
              <InventoryParts />
            </div>
          </TabContent>
          <TabContent value="tab5">
            <div className="">
              <InventoryTires />
            </div>
          </TabContent>
          <TabContent value="tab6">
            <div className="">
              <InventoryLabors />
            </div>
          </TabContent>
          <TabContent value="tab7">
            <div className="">
              <InventoryFees />
            </div>
          </TabContent>
        </div>
      </Tabs>
      </div>
    </div>
  )
}

export default DeletedItems