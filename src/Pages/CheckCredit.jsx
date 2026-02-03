/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import Header from "../components/CheckCredit/Header";
import Table from "../components/CheckCredit/Table";
import Model from "../components/CheckCredit/Model";
import Search from "../components/CheckCredit/Search";

const CheckCredit = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const itemsPerPage = 10;

  // Mock users data based on your API
  const users = [
    {
      _id: "6981e2d31462d395b85987b8",
      userName: "Benillingworth",
      email: "benillingworth@ymail.com",
      phoneNumber: "+447927725654",
      role: "user",
      isBlocked: false,
      credit: 0,
      rewardPoint: 0,
      currency: "GBP",
      age: "31",
      createdAt: "2026-02-03T11:58:11.685Z",
      updatedAt: "2026-02-03T12:02:41.895Z",
      lastTransaction: {
        id: "pi_3QYtXNLkJqmrHhZp0r0RKVLg",
        amount: 50.0,
        status: "succeeded",
        date: "2026-02-03T10:30:00.000Z",
        type: "credit_purchase",
      },
      transactions: [
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLg",
          amount: 50.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-02-03T10:30:00.000Z",
        },
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLh",
          amount: 20.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-02-02T14:20:00.000Z",
        },
      ],
    },
    {
      _id: "6980e0fe30e5e600c1fb54e7",
      userName: "BoroDave72",
      email: "davidmark.g76.dg65@gmail.com",
      phoneNumber: "7912692500",
      role: "user",
      isBlocked: false,
      credit: 0,
      rewardPoint: 0,
      currency: "GBP",
      age: "53",
      createdAt: "2026-02-02T17:38:06.905Z",
      updatedAt: "2026-02-02T17:56:38.812Z",
      lastTransaction: null,
      transactions: [],
    },
    {
      _id: "697fc1e630e5e600c1fb5365",
      userName: "RyanParker03",
      email: "ryanjparker03@hotmail.com",
      phoneNumber: "7777357092",
      role: "user",
      isBlocked: false,
      credit: 2,
      rewardPoint: 0,
      currency: "GBP",
      age: "22",
      createdAt: "2026-02-01T21:13:10.307Z",
      updatedAt: "2026-02-01T21:18:21.629Z",
      lastTransaction: {
        id: "pi_3QYtXNLkJqmrHhZp0r0RKVLi",
        amount: 10.0,
        status: "succeeded",
        date: "2026-02-01T20:00:00.000Z",
        type: "credit_purchase",
      },
      transactions: [
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLi",
          amount: 10.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-02-01T20:00:00.000Z",
        },
      ],
    },
    {
      _id: "697a62c430e5e600c1fb4c5b",
      userName: "MK2GAZ",
      email: "pallasaccess@gmail.com",
      phoneNumber: "+447752650606",
      role: "user",
      isBlocked: false,
      credit: 80,
      rewardPoint: 0,
      currency: "GBP",
      age: "38",
      createdAt: "2026-01-28T19:25:56.895Z",
      updatedAt: "2026-01-28T19:27:46.065Z",
      lastTransaction: {
        id: "pi_3QYtXNLkJqmrHhZp0r0RKVLj",
        amount: 100.0,
        status: "succeeded",
        date: "2026-01-28T19:00:00.000Z",
        type: "credit_purchase",
      },
      transactions: [
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLj",
          amount: 100.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-01-28T19:00:00.000Z",
        },
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLk",
          amount: 50.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-01-27T15:00:00.000Z",
        },
      ],
    },
    {
      _id: "6979262330e5e600c1fb4b21",
      userName: "Laura lawton",
      email: "lawton.laura@icloud.com",
      phoneNumber: "7728808301",
      role: "user",
      isBlocked: false,
      credit: 100,
      rewardPoint: 0,
      currency: "GBP",
      age: "32",
      createdAt: "2026-01-27T20:54:59.197Z",
      updatedAt: "2026-01-27T21:39:31.375Z",
      lastTransaction: {
        id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
        amount: 100.0,
        status: "succeeded",
        date: "2026-01-27T21:00:00.000Z",
        type: "credit_purchase",
      },
      transactions: [
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
          amount: 100.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-01-27T21:00:00.000Z",
        },
      ],
    },
    {
      _id: "6979262330e5e600c1fb4b22",
      userName: "Laura lawton",
      email: "lawton.laura@icloud.com",
      phoneNumber: "7728808301",
      role: "user",
      isBlocked: false,
      credit: 100,
      rewardPoint: 0,
      currency: "GBP",
      age: "32",
      createdAt: "2026-01-27T20:54:59.197Z",
      updatedAt: "2026-01-27T21:39:31.375Z",
      lastTransaction: {
        id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
        amount: 100.0,
        status: "succeeded",
        date: "2026-01-27T21:00:00.000Z",
        type: "credit_purchase",
      },
      transactions: [
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
          amount: 100.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-01-27T21:00:00.000Z",
        },
      ],
    },
    {
      _id: "6979262330e5e600c1fb4b23",
      userName: "Laura lawton",
      email: "lawton.laura@icloud.com",
      phoneNumber: "7728808301",
      role: "user",
      isBlocked: false,
      credit: 100,
      rewardPoint: 0,
      currency: "GBP",
      age: "32",
      createdAt: "2026-01-27T20:54:59.197Z",
      updatedAt: "2026-01-27T21:39:31.375Z",
      lastTransaction: {
        id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
        amount: 100.0,
        status: "succeeded",
        date: "2026-01-27T21:00:00.000Z",
        type: "credit_purchase",
      },
      transactions: [
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
          amount: 100.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-01-27T21:00:00.000Z",
        },
      ],
    },
    {
      _id: "6979262330e5e600c1fb4b24",
      userName: "Laura lawton",
      email: "lawton.laura@icloud.com",
      phoneNumber: "7728808301",
      role: "user",
      isBlocked: false,
      credit: 100,
      rewardPoint: 0,
      currency: "GBP",
      age: "32",
      createdAt: "2026-01-27T20:54:59.197Z",
      updatedAt: "2026-01-27T21:39:31.375Z",
      lastTransaction: {
        id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
        amount: 100.0,
        status: "succeeded",
        date: "2026-01-27T21:00:00.000Z",
        type: "credit_purchase",
      },
      transactions: [
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
          amount: 100.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-01-27T21:00:00.000Z",
        },
      ],
    },
    {
      _id: "6979262330e5e600c1fb4b25",
      userName: "Laura lawton",
      email: "lawton.laura@icloud.com",
      phoneNumber: "7728808301",
      role: "user",
      isBlocked: false,
      credit: 100,
      rewardPoint: 0,
      currency: "GBP",
      age: "32",
      createdAt: "2026-01-27T20:54:59.197Z",
      updatedAt: "2026-01-27T21:39:31.375Z",
      lastTransaction: {
        id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
        amount: 100.0,
        status: "succeeded",
        date: "2026-01-27T21:00:00.000Z",
        type: "credit_purchase",
      },
      transactions: [
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
          amount: 100.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-01-27T21:00:00.000Z",
        },
      ],
    },
    {
      _id: "6979262330e5e600c1fb4b26",
      userName: "Laura lawton",
      email: "lawton.laura@icloud.com",
      phoneNumber: "7728808301",
      role: "user",
      isBlocked: false,
      credit: 100,
      rewardPoint: 0,
      currency: "GBP",
      age: "32",
      createdAt: "2026-01-27T20:54:59.197Z",
      updatedAt: "2026-01-27T21:39:31.375Z",
      lastTransaction: {
        id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
        amount: 100.0,
        status: "succeeded",
        date: "2026-01-27T21:00:00.000Z",
        type: "credit_purchase",
      },
      transactions: [
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
          amount: 100.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-01-27T21:00:00.000Z",
        },
      ],
    },
    {
      _id: "6979262330e5e600c1fb4b27",
      userName: "Laura lawton",
      email: "lawton.laura@icloud.com",
      phoneNumber: "7728808301",
      role: "user",
      isBlocked: false,
      credit: 100,
      rewardPoint: 0,
      currency: "GBP",
      age: "32",
      createdAt: "2026-01-27T20:54:59.197Z",
      updatedAt: "2026-01-27T21:39:31.375Z",
      lastTransaction: {
        id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
        amount: 100.0,
        status: "succeeded",
        date: "2026-01-27T21:00:00.000Z",
        type: "credit_purchase",
      },
      transactions: [
        {
          id: "pi_3QYtXNLkJqmrHhZp0r0RKVLl",
          amount: 100.0,
          type: "credit_purchase",
          status: "succeeded",
          date: "2026-01-27T21:00:00.000Z",
        },
      ],
    },
  ];

  // Compute filtered data
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Apply status filter
    switch (selectedFilter) {
      case "active":
        filtered = filtered.filter((u) => !u.isBlocked);
        break;
      case "blocked":
        filtered = filtered.filter((u) => u.isBlocked);
        break;
      case "with_credits":
        filtered = filtered.filter((u) => u.credit > 0);
        break;
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (u) =>
          u.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.phoneNumber.includes(searchQuery),
      );
    }

    return filtered;
  }, [selectedFilter, searchQuery]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
