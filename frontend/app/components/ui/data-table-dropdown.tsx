import React from "react";

interface DataTableDropdownProps {
  column: {
    getFilterValue: () => unknown;
    setFilterValue: (value: unknown) => void;
  };
  children: React.ReactNode;
}

export const DataTableDropdown: React.FC<DataTableDropdownProps> = ({ column, children }) => {
  return (
    <div className="relative inline-block w-24">
      <select
        value={(column.getFilterValue() ?? "") as string}
        onChange={(e) =>
          column.setFilterValue(
            e.target.value === "" ? undefined : e.target.value === "true"
          )
        }
        className="mt-1 p-1 border rounded text-sm w-full appearance-none bg-white pr-6"
      >
        {children}
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-sm">
        ▼
      </span>
    </div>
  );
};