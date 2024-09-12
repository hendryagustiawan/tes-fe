import React, { useEffect, useMemo, useState } from "react";
import { fetchTodos } from "../helper/helper";
import { Col, Container, Input, Row } from "reactstrap";
import Select, { components } from "react-select";
import Pagination from "../Components/PaginationComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Components/Navbar";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    status: null,
  });
  const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        const todos = await fetchTodos();
        setData(todos);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesSearch = filter.search === "" || item.title.toLowerCase().includes(filter.search.toLowerCase());
      const matchesStatus = filter.status === null || item.completed === filter.status.id;
      return matchesSearch && matchesStatus;
    });
    setFilteredData(filtered);
  }, [filter, data]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Navbar />
      <div className="mt-5">
        <Container>
          {/* Filter */}
          <div className="filter-container bg-light rounded px-3 pt-3 shadow-sm">
            <form className="p-0">
              <Row>
                <Col lg={6} className="mb-3">
                  <Select
                    name="status"
                    isClearable
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    placeholder="Status"
                    options={[
                      { id: true, name: "Aktif" },
                      { id: false, name: "Tidak Aktif" },
                    ]}
                    onChange={(e) => setFilter({ ...filter, status: e })}
                    className="select2-selection"
                  />
                </Col>
                <Col lg={6} className="mb-3">
                  <Input
                    name="search"
                    placeholder="Masukan Pencarian"
                    className="select2-selection"
                    onChange={(e) => {
                      setFilter({ ...filter, search: e.target.value });
                    }}
                  />
                </Col>
              </Row>
            </form>
          </div>
          <table className="table table-bordered table-striped table-hover mt-5 shadow-sm custom-table ">
            <thead className="bg-warning">
              <tr>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort("title")} className="table-header">
                  Title {sortConfig.key === "title" ? sortConfig.direction === "asc" ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSort} />}
                </th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {(currentPosts || []).map((el, idx) => (
                <tr key={idx} className="align-middle table-row">
                  <td>{el.title}</td>
                  <td>
                    <span className={`badge ${el.completed ? "bg-success" : "bg-danger"} status-badge`}>{el.completed ? "Aktif" : "Tidak Aktif"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end mt-3">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
          </div>
        </Container>
      </div>
    </>
  );
}
