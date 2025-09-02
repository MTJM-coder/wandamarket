import { useState } from "react";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-white p-2 rounded-md shadow border hover:bg-gray-100"
      >
        Orders ⌄
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm">
          {/* Flèche */}
          <div className="absolute -top-2 left-6 w-4 h-4 bg-white rotate-45 shadow-sm"></div>

          <div className="font-semibold">Trade Assurance</div>
          <div>✅ Safe & easy payments</div>
          <div>💰 Money-back policy</div>
          <div>🚚 Shipping & logistics services</div>
          <div>🛠 After-sales protections</div>
        </div>
      )}
    </div>
  );
}
