import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerState {
  selectedCustomer: any | null;
  addCustomerModalOpen: boolean;
}

const initialState: CustomerState = {
  selectedCustomer: null,
  addCustomerModalOpen: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<any | null>) => {
      state.selectedCustomer = action.payload;
    },
    setAddCustomerModalOpen: (state, action: PayloadAction<boolean>) => {
        state.addCustomerModalOpen = action.payload;
      },
  },
});

export const { setSelectedCustomer, setAddCustomerModalOpen } = customerSlice.actions;
export default customerSlice.reducer;
