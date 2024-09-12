import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationNumbers = () => {
    const pagination = [];
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage > 1) pagination.push(currentPage - 1);
    pagination.push(currentPage);
    if (currentPage < totalPages) pagination.push(currentPage + 1);

    if (pagination[0] > 1) pagination.unshift("...");
    if (pagination[pagination.length - 1] < totalPages) pagination.push("...");

    return pagination;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            Previous
          </a>
        </li>

        {getPaginationNumbers().map((number, index) => (
          <li key={index} className={`page-item ${number === currentPage ? "active" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (number !== "...") onPageChange(number);
              }}
            >
              {number}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
