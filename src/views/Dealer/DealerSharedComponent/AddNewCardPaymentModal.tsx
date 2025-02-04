import { HiOutlineChevronLeft } from "react-icons/hi";
import CheckoutForm from "../CheckoutForm";
import { useState } from "react";

interface AddNewCardPaymentModalProps {
  amount: number;
  orderNo: number;
  closeModal: () => void; 
  formattedRemaining : number;
}

const AddNewCardPaymentModal: React.FC<AddNewCardPaymentModalProps> = ({
  amount,
  orderNo,
  closeModal,
  formattedRemaining,
}) => {
  
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[650px] h-[700px] rounded-lg shadow-lg relative border border-gray-200 overflow-y-auto">
        <div className="flex justify-between items-center p-3 border-b">
          {isFormVisible && (
            <button className="text-gray-500 hover:text-gray-700">
              <HiOutlineChevronLeft className="text-xl" />
            </button>
          )}
          <h3 className="text-base font-semibold">Card Payment</h3>
          <button className="text-gray-500 hover:text-gray-700"
          onClick={closeModal}
          >✕</button>
        </div>
        <div className="p-3">
          <CheckoutForm amount={amount} orderNo={orderNo} formattedRemaining={formattedRemaining} />
        </div>
      </div>
    </div>
  );
};

export default AddNewCardPaymentModal;
