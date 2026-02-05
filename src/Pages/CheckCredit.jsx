/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from "react";
import Header from "../components/CheckCredit/Header";
import Table from "../components/CheckCredit/Table";
import Model from "../components/CheckCredit/Model";
import Search from "../components/CheckCredit/Search";
import axiosSecure from "../lib/axiosSecure";

const CheckCredit = () => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    if (!users?.length) return [];

    let filtered = [...users];

    if (selectedFilter === "active")
      filtered = filtered.filter((u) => !u.isBlocked);
    if (selectedFilter === "blocked")
      filtered = filtered.filter((u) => u.isBlocked);
    if (selectedFilter === "with_credits")
      filtered = filtered.filter((u) => u.credit > 0);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.userName?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q) ||
          u.phoneNumber?.includes(searchQuery),
      );
    }

    return filtered;
  }, [users, selectedFilter, searchQuery]);

  const paginatedUsers = filteredUsers;
  const totalPages = meta?.totalPages || 1;

  const getStatusBadge = (isBlocked) => {
    return isBlocked
      ? "bg-red-500/20 text-red-400 border border-red-500/30"
      : "bg-green-500/20 text-green-400 border border-green-500/30";
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get(
          `/users/get-all-users?page=${currentPage}&limit=${itemsPerPage}`,
        );
        setUsers(res.data?.data ?? []);
        setMeta(res.data?.meta ?? null);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilter]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <Header />

      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
      />

      <Table
        paginatedUsers={paginatedUsers}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        getStatusBadge={getStatusBadge}
        setSelectedUser={setSelectedUser}
        filteredUsers={filteredUsers}
        meta={meta}
      />

      {selectedUser && (
        <Model
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          getStatusBadge={getStatusBadge}
        />
      )}
    </div>
  );
};

export default CheckCredit;
