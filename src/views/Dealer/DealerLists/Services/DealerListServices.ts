import axios from "axios";
import appConfig from "@/configs/app.config";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
// Set the base URL to point to your backend API
// const API_BASE_URL = 'http://localhost:1024'; 
// const API_BASE_URL = 'https://api.247automotive.services'; 
// const API_BASE_URL = 'https://testapi.247automotive.services'; 
const { apiPrefix } = appConfig; // If you have an API prefix like '/api'
const {API_BASE_URL} = appConfig;

export async function getAllCustomersByPage(filters: any) {
    try {
        const response = await axios.post(`${API_BASE_URL}${apiPrefix}/dealer/get-all-customers-pagination`, filters);
        return response.data; // Handle response (e.g., token, user data)
    } catch (error: any) {
        console.error('Get-All-Customers error', error);
        throw error.response?.data || 'Error in getting all customers';
    }
}

export async function getAllCustomers() {
    try {
        const response = await axios.get(`${API_BASE_URL}${apiPrefix}/dealer/get-all-customers`);
        return response.data; // Handle response (e.g., token, user data)
    } catch (error: any) {
        console.error('Get-All-Customers error', error);
        throw error.response?.data || 'Error in getting all customers';
    }
}

export async function apiNewCustomer (data:any){
    try{
        const response = await axios.post(`${API_BASE_URL}${apiPrefix}/dealer/add-new-customer`,data);
        return response.data;
    }
    catch(error:any){
        if (error.response) {
            throw new Error(`Server Error: ${error.response.data.message || 'Error in saving Customer'}`);

        } else if (error.request) {
            // No response was received from the server
            throw new Error('Network Error: Unable to reach the server');
        } else {
            // Some other error
            throw new Error('Unexpected Error: ' + error.message);
        }

    }
}

export async function getAllVehicles(id?: string) {
    try {
        let url = `${API_BASE_URL}${apiPrefix}/dealer/get-all-vehicles`;
        
        // Append the id if it is provided
        if (id) {
            url = `${url}?customerId=${id}`;
        }

        const response = await axios.get(url);
        return response.data; 
    } catch (error: any) {
        console.error('Get-All-Vehicles error', error);
        throw error.response?.data || 'Error in getting all vehicles';
    }
}


export async function getAllVehiclesByPage(filters: any) {
    try {
        const response = await axios.post(`${API_BASE_URL}${apiPrefix}/dealer/get-all-vehicles-pagination`, {
            params: filters,
        });
        return response.data; 
    } catch (error: any) {
        console.error('Get-All-Vehicles error', error);
        throw error.response?.data || 'Error in getting all vehicles';
    }
}


export async function apiNewVehicle (data:any){
    try{
        const response = await axios.post(`${API_BASE_URL}${apiPrefix}/dealer/add-new-vehicle`,data);
        return response.data;
    }
    catch(error:any){
        if (error.response) {
            throw new Error(`Server Error: ${error.response.data.message || 'Error in saving Vehicle'}`);

        } else if (error.request) {
            // No response was received from the server
            throw new Error('Network Error: Unable to reach the server');
        } else {
            // Some other error
            throw new Error('Unexpected Error: ' + error.message);
        }
    }
}


export async function getAllVendors() {
    try {
        const response = await axios.get(`${API_BASE_URL}${apiPrefix}/dealer/get-all-vendors`);
        return response.data; // Handle response (e.g., token, user data)
    } catch (error: any) {
        console.error('Get-All-Vendors error', error);
        throw error.response?.data || 'Error in getting all vendors';
    }
}

export async function apiNewVendor (data:any){
    try{
        const response = await axios.post(`${API_BASE_URL}${apiPrefix}/dealer/add-new-vendor`,data);
        return response.data;
    }
    catch(error:any){
        if (error.response) {
            throw new Error(`Server Error: ${error.response.data.message || 'Error in saving Vendor'}`);

        } else if (error.request) {
            // No response was received from the server
            throw new Error('Network Error: Unable to reach the server');
        } else {
            // Some other error
            throw new Error('Unexpected Error: ' + error.message);
        }

    }
}


export async function apiAddNewVehicle (data:any){
    try{
        const response = await axios.post(`${API_BASE_URL}${apiPrefix}/dealer/add-new-vehicle`,data);
        console.log("vehicle add response : ", response)
        return response.data;
    }
    catch(error:any){
        if (error.response) {
            throw new Error(`Server Error: ${error.response.data.message || 'Error in saving Vehicle'}`);

        } else if (error.request) {
            // No response was received from the server
            throw new Error('Network Error: Unable to reach the server');
        } else {
            // Some other error
            throw new Error('Unexpected Error: ' + error.message);
        }

    }
}

export async function apiGetVehicleByVin(query: string) {
    try {
        const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${query}?format=json`);
        return response.data; // Handle response (e.g., token, user data)
    } catch (error: any) {
        console.error('Get-Vehicle-By-VIN error', error);
        throw error.response?.data || 'Error in getting vehicle by VIN';
    }
}
// export const apiSaveCustomer = async (data:any) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({ message: 'Customer saved successfully' });
//         }, 1000); // Simulate a network delay
//     });
// };

export async function apiAddNewAppointment (data:any){
    try{
        const response = await axios.post(`${API_BASE_URL}${apiPrefix}/dealer/add-new-appointment`,data);
        console.log("Response for appointment in api ; ", response)
        return response.data;
    }
    catch(error:any){
        if (error.response) {
            throw new Error(`Server Error: ${error.response.data.message || 'Error in saving Vehicle'}`);

        } else if (error.request) {
            // No response was received from the server
            throw new Error('Network Error: Unable to reach the server');
        } else {
            // Some other error
            throw new Error('Unexpected Error: ' + error.message);
        }

    }
}

export async function apiGetAllAppointment() {
    try {
        const response = await axios.get(`${API_BASE_URL}${apiPrefix}/dealer/get-all-appointment`);
        return response.data; 
    } catch (error: any) {
        console.error('Get-All-Vehicles error', error);
        throw error.response?.data || 'Error in getting all vehicles';
    }
}

export async function apiUpdateAppointment(id: string, data: any) {
    try {
      const response = await axios.put(`${API_BASE_URL}${apiPrefix}/dealer/update-appointment/${id}`, data);
      console.log("Response for updated appointment in API: ", response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      
    }
  }
  
  export const generatePDF = (data: any[], title: string = "Report") => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }
  
    const doc = new jsPDF();
    doc.text(`${title}`, 14, 15);
  
    autoTable(doc, {
      startY: 20,
      head: [
        [
          "Order No",
          "Order Name",
          "Customer",
          "Grand Total",
          "Due Date",
          "Payment Terms",
          "Paid Status",
          "Workflow Status",
          "Order Status",
        ],
      ],
      body: data.map((row: any) => [
        row.orderNo,
        row.orderName,
        row.firstName || row.customer?.firstName || "N/A",
        `$${row.grandTotal}`,
        row.dueDate,
        row.paymentNote || "N/A",
        row.paymentMethod === "cash" || row.paymentMethod === "card" || row.paidStatus === "Paid"
          ? "Paid"
          : "Unpaid",
        row.status,
        row.status,
      ]),
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] },
    });
  
    doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
  };

  export const generateExcel = (data: any[], fileName: string = "Orders_Report") => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }
  
    try {
      const selectedFields = [
        "orderNo",
        "orderName",
        "customer",
        "grandTotal",
        "dueDate",
        "paymentNote",
        "paymentMethod",
        "status",
        "isAuthorized",
        "paymentDate",
      ];
  
      const filteredData = data.map((item: any) => {
        let formattedItem: any = {};
  
        selectedFields.forEach((key) => {
          if (key === "customer") {
            formattedItem["Customer"] = item.firstName || item.customer?.firstName || "N/A";
          } else if (key === "paymentMethod") {
            formattedItem["Payment Status"] =
              item.paymentMethod === "card" || item.paymentMethod === "cash" ? "Paid" : "Unpaid";
          } else if (key === "isAuthorized") {
            formattedItem["Authorized Status"] = item.isAuthorized === true ? "Authorize" : "Unauthorize";
          } else if (key === "paymentNote") {
            formattedItem["Payment Terms"] = item.paymentNote || "N/A";
          } else {
            formattedItem[key] = item[key];
          }
        });
  
        return formattedItem;
      });
  
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  
      XLSX.writeFile(workbook, `${fileName.replace(/\s+/g, "_")}.xlsx`);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Failed to generate Excel.");
    }
  };

  export async function apiAddNewGeneralSetting (data:any){
    try{
        const response = await axios.post(`${API_BASE_URL}${apiPrefix}/dealer/general-setting`,data);
        console.log("General setting in response : ",response)
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

export async function apiAddPricingMatrix(data: any) {
    try {
        const response = await axios.post(`${API_BASE_URL}${apiPrefix}/dealer/pricing-matrix`, data);
        
        console.log("Response for matrix save API: ", response);
        return response.data;
    } catch (error: any) {
        console.log(error)
    }
}

export async function apiUpdatePricingMatrix(data: any) {
    try {
        const { id, ...updatedData } = data; // Extract ID separately

        if (!id) {
            throw new Error("ID is required for updating the pricing matrix.");
        }

        const response = await axios.put(
            `${API_BASE_URL}${apiPrefix}/dealer/update-pricing-matrix/${id}`,
            updatedData
        );

        console.log("Response for matrix update API: ", response);
        return response.data;
    } catch (error: any) {
        console.error("API Update Error:", error);
    }
}

export async function getAllPricingMatrix() {
    try {
        const response = await axios.get(`${API_BASE_URL}${apiPrefix}/dealer/get-all-pricing-matrix`);
        return response.data; 
    } catch (error: any) {
        console.error('get-all-pricing-matrix error', error);
        throw error.response?.data || 'Error in getting all pricing matrix';
    }
}

export async function apiAddLaborMatrix(data: any) {
    try {
        const response = await axios.post(`${API_BASE_URL}${apiPrefix}/dealer/labor-matrix`, data);
        
        console.log("Response for matrix save API: ", response);
        return response.data;
    } catch (error: any) {
        console.log(error)
    }
}

export async function apiUpdateLaborMatrix(data: any) {
    try {
        const { id, ...updatedData } = data; // Extract ID separately

        if (!id) {
            throw new Error("ID is required for updating the labor matrix.");
        }

        const response = await axios.put(
            `${API_BASE_URL}${apiPrefix}/dealer/update-labor-matrix/${id}`,
            updatedData
        );

        console.log("Response for matrix update API: ", response);
        return response.data;
    } catch (error: any) {
        console.error("API Update Error:", error);
    }
}

export async function getAllLaborMatrix() {
    try {
        const response = await axios.get(`${API_BASE_URL}${apiPrefix}/dealer/get-all-labor-matrix`);
        return response.data; 
    } catch (error: any) {
        console.error('get-all-labor-matrix error', error);
        throw error.response?.data || 'Error in getting all labor matrix';
    }
}

export async function apiDeleteLaborFlag(id: string) {
    try {
        if (!id) {
            throw new Error("ID is required for updating the delete flag.");
        }

        const response = await axios.put(
            `${API_BASE_URL}${apiPrefix}/dealer/delete-labor-matrix/${id}`
        );

        console.log("Response for delete flag update API: ", response);
        return response.data;
    } catch (error: any) {
        console.error("API Update Delete Flag Error:", error);
        throw error; // Re-throw for better error handling
    }
}

export async function apiDeletePricingFlag(id: string) {
    try {
        if (!id) {
            throw new Error("ID is required for updating the delete flag.");
        }

        const response = await axios.put(
            `${API_BASE_URL}${apiPrefix}/dealer/delete-pricing-matrix/${id}`
        );

        console.log("Response for delete flag update API: ", response);
        return response.data;
    } catch (error: any) {
        console.error("API Update Delete Flag Error:", error);
        throw error; // Re-throw for better error handling
    }
}