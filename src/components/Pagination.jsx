import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Pagination() {
  const { page, handlePageChange, totalPages } = useContext(AppContext);

  return (
    <div className="fixed bottom-0 z-40 w-full py-3 bg-white border-t shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 w-11/12 max-w-[630px] mx-auto">
        <div className="flex gap-2">
          {page > 1 && (
            <button
              className="px-3 py-1 text-sm border rounded sm:text-base hover:bg-gray-100"
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
          )}

          {page < totalPages && (
            <button
              className="px-3 py-1 text-sm border rounded sm:text-base hover:bg-gray-100"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          )}
        </div>

        <p className="text-xs text-gray-700 sm:text-sm">
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  );
}

export default Pagination;
