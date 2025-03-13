import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VehicleState {
  selectedVehicle: any | null;
}

const initialState: VehicleState = {
    selectedVehicle: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setSelectedVehicle: (state, action: PayloadAction<any | null>) => {
      state.selectedVehicle = action.payload;
    },
  },
});

export const { setSelectedVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
