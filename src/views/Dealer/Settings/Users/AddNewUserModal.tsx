import CreateDealer from "@/views/SuperAdmin/dealers/CreateDealer";

const AddNewUserModal = ({ handleButtonClick }:any) => {


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[650px] h-[600px] rounded-lg shadow-lg relative border border-gray-200">
          <div className="flex justify-between items-center p-3 border-b">
              <h3 className="text-base font-semibold">New Part</h3>
              <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleButtonClick}
              >
                  ✕
              </button>
          </div>
          <div className="overflow-y-auto p-4" style={{ height: 'calc(100% - 110px)' }}>
              <CreateDealer />
          </div>
      </div>
    </div>
  )
}

export default AddNewUserModal
