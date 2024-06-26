import React, { useEffect, useState } from "react";

function Pagination({ totalPages, page, setPage }) {
  const [thisPage, setThisPage] = useState(page);

  useEffect(() => {
    setThisPage(page);
  }, [page]);

  let Next = () => {
    setPage(page + 1);
  };

  let Prev = () => {
    setPage(page - 1);
  };

  let changePage = (e) => {
    if (e.key == "Enter") {
      let tmp = thisPage;
      if (thisPage < 0) {
        setThisPage(0);
        tmp = 0;
      }
      if (thisPage > totalPages - 1) {
        setThisPage(totalPages - 1);
        tmp = totalPages - 1;
      }
      setPage(tmp);
    }
  };

  return (
    <div className="flex gap-1">
      <button
        className={`${
          page > 0 ? "bg-supplair-primary" : "bg-gray-400 opacity-50"
        } text-white font-semibold rounded h-8 w-16`}
        disabled={page == 0}
        onClick={Prev}
      >
        Prev
      </button>
      <input
        type="number"
        className="w-10 text-center border-2 border-black rounded"
        value={thisPage}
        onKeyDown={changePage}
        onChange={(e) => {
          setThisPage(e.target.value);
        }}
        min={0}
        max={totalPages - 1}
      />
      <button
        className={`${
          page < totalPages - 1 ? "bg-supplair-primary" : "bg-gray-400 opacity-50"
        } text-white font-semibold rounded h-8 w-16`}
        disabled={page == totalPages - 1}
        onClick={Next}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
