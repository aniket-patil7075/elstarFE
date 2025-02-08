import { Button } from "@/components/ui";
import { apiStripepayment } from "./Services/WorkflowService";
import CheckoutForm from "./CheckoutForm";
import AuthorizeEmail from "../auth/Emails/AuthorizeEmail";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import { getAllCustomers } from "./DealerLists/Services/DealerListServices";
import { useEffect } from "react";
import * as XLSX from "xlsx";
import saveAs from "file-saver";

const DealerDashboard = () => {

  

  const handleGeneratePDF = async () => {
    try {
      const customersResponse = await getAllCustomers();
      const customers = customersResponse?.allCustomers || [];

      if (customers.length === 0) {
        alert("No customer data available.");
        return;
      }

      // Initialize jsPDF
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.text("Customer List", 14, 15);

      // Define table columns
      const columns = ["First Name", "Last Name", "Email", "Phone", "City", "Remaining Amount"];

      // Map customer data to rows
      const rows = customers.map((customer:any) => [
        customer?.firstName || "N/A",
        customer?.lastName || "N/A",
        customer?.email?.[0] ?? "N/A",
        customer?.phoneNumber?.[0]?.number ?? "N/A",
        customer?.customerAddress?.city ?? "N/A",
        customer?.remainingAmount ?? "N/A",
      ]);

      // Add table using autoTable
      autoTable(doc, {
        startY: 25,
        head: [columns],
        body: rows,
      });

      // Save the PDF
      doc.save("Customer_List.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF.");
    }
  };

  const handleGenerateExcel = async () => {
    try {
      const customersResponse = await getAllCustomers();
      const customers = customersResponse?.allCustomers || [];

      if (customers.length === 0) {
        alert("No customer data available.");
        return;
      }

      const rows = customers.map((customer: any) => ({
        "First Name": customer.firstName || "N/A",
        "Last Name": customer.lastName || "N/A",
        Email: customer.email?.[0] || "N/A",
        Phone: customer.phoneNumber?.[0]?.number || "N/A",
        City: customer.customerAddress?.city || "N/A",
        "Remaining Amount":
          customer.remainingAmount !== undefined ? customer.remainingAmount : "N/A",
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(data, "Customer_List.xlsx");
    } catch (error) {
      console.error("Error generating Excel:", error);
      alert("Failed to generate Excel.");
    }
  };

  return (
    <div>
      <h2>Dealer Dashboard</h2>
      <div>
        <Button variant="solid" className="w-25 mt-4" onClick={handleGeneratePDF}>
          pdf
        </Button>
      </div>
      <div>
        <Button variant="solid" className="w-25 mt-4" onClick={handleGenerateExcel}>
          excel
        </Button>
      </div>
      {/* <CheckoutForm /> */}
      {/* <AuthorizeEmail /> */}
    </div>
  );
};

export default DealerDashboard;
