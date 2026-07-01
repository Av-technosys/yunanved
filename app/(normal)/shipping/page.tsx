const Page = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full flex items-start justify-center bg-white py-16 px-0 md:px-8">
        <div className="w-full max-w-3xl flex flex-col items-center gap-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-black text-center">
            Shipping Policy
          </h1>

          <div className="w-full bg-[#F8F6F1] md:rounded-2xl rounded-none shadow-md border border-neutral-200 p-6 sm:p-8 lg:p-10 space-y-6 text-neutral-800 leading-relaxed">
            <p>
              Thank you for choosing Yunanved. We are committed to delivering your order accurately, in good condition, and always on time.
            </p>

            <div>
              <h2 className="font-bold text-black">
                1. Order Processing
              </h2>
              <p className="mt-3">
                All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-black">
                2. Shipping Rates & Delivery Estimates
              </h2>
              <p className="mt-3">
                Shipping charges for your order will be calculated and displayed at checkout. Estimated delivery dates will be provided once your order is confirmed. Standard delivery typically takes 3-7 business days depending on your location.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-black">
                3. Shipment Confirmation & Order Tracking
              </h2>
              <p className="mt-3">
                You will receive a Shipment Confirmation email containing your tracking number(s) once your order has shipped. The tracking number will be active within 24 hours.
              </p>
            </div>
            
            <div>
              <h2 className="font-bold text-black">
                4. Damages
              </h2>
              <p className="mt-3">
                Yunanved is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-black">
                5. Contact Us
              </h2>
              <p className="mt-3">
                If you have any questions about our shipping policy, please contact us at support@yunanved.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
