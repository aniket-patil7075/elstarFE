import { Button } from "@/components/ui";
import card_machine from "../../../../../public/card_machine.png";

const PaymentReaders = () => {
  return (
    <div>
      <div className="border w-full lg:w-2/3 bg-gray-100">
        <div className="mx-5 my-3">
          <h5 className="text-gray-700">Card Readers</h5>
        </div>
        <div className="flex flex-col sm:flex-row w-full">
          {/* Left Section */}
          <div className="w-full sm:w-1/3 flex justify-center items-center">
            <img
              src={card_machine}
              alt="card machine"
              className="w-3/4 h-auto sm:w-2/3"
            />
          </div>

          {/* Right Section */}
          <div className="w-full sm:w-2/3 m-4">
            <div className="flex flex-col items-center text-center">
              <Button
                variant="solid"
                type="button"
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center gap-1 px-3 py-1.5"
              >
                Order Now
              </Button>
              <p className="p-4 border-b border-gray-300">
                Get better rates and take in-person payments securely with a
                card reader.
              </p>
            </div>

            {/* Card Rates - Responsive */}
            <div className="flex flex-col sm:flex-row w-full m-4">
              <div className="w-full sm:w-1/2 ms-4">
                <p>
                  <span className="text-gray-700 font-bold">All cards</span>{" "}
                  excluding amex
                </p>
              </div>
              <div className="w-full sm:w-1/2">
                <p className="text-green-600">2.9% +30</p>
                <p>per in-person transaction (clever)</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full m-4">
              <div className="w-full sm:w-1/2 ms-4">
                <p className="text-gray-700 font-bold">Amex Card</p>
              </div>
              <div className="w-full sm:w-1/2">
                <p className="text-green-600">2.9% +30</p>
                <p>per in-person transaction (clever)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReaders;
