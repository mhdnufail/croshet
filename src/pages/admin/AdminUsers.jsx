import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminUsers,
  toggleUserStatus,
} from "../../store/adminUserSlice";

function AdminUsers() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.adminUsers);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const handleToggleStatus = async (user) => {
    const isBlocked = user.blocked === true || user.status === "Blocked";
    const confirmMessage = isBlocked
      ? `Are you sure you want to unblock ${user.name || user.email}?`
      : `Are you sure you want to block ${user.name || user.email}?`;

    if (window.confirm(confirmMessage)) {
      setUpdatingId(user.id);
      try {
        await dispatch(toggleUserStatus(user)).unwrap();
      } catch (err) {
        console.error("Failed to toggle user status:", err);
      } finally {
        setUpdatingId(null);
      }
    }
  };

  // Filter users by search term
  const filteredUsers = items.filter((user) => {
    const term = searchTerm.toLowerCase();
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    const id = String(user.id || "").toLowerCase();
    return name.includes(term) || email.includes(term) || id.includes(term);
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2F241F]">Users</h1>
          <p className="text-[#756A64] mt-2">
            Manage customer accounts and access permissions.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, email, or ID..."
            className="w-full bg-white border border-[#2F241F]/20 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8B5E3C]"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && items.length === 0 && (
        <div className="bg-white rounded-xl border border-[#2F241F]/10 p-12 text-center">
          <p className="text-[#756A64]">Loading users...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredUsers.length === 0 && (
        <div className="bg-white rounded-xl border border-[#2F241F]/10 p-12 text-center">
          <h2 className="text-xl font-semibold text-[#2F241F]">No users found</h2>
          <p className="text-[#756A64] mt-2">
            {searchTerm
              ? "Try adjusting your search criteria."
              : "No registered customers yet."}
          </p>
        </div>
      )}

      {/* User Table */}
      {filteredUsers.length > 0 && (
        <div className="bg-white rounded-xl border border-[#2F241F]/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F5EBE0] text-[#2F241F]">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#2F241F]/10">
                {currentUsers.map((user) => {
                  const isBlocked =
                    user.blocked === true || user.status === "Blocked";
                  const isUpdating = updatingId === user.id;

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-[#FFF8F0]/50 transition"
                    >
                      <td className="px-5 py-4 text-sm font-mono text-[#756A64]">
                        #{user.id}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-[#2F241F]">
                        {user.name || "N/A"}
                      </td>

                      <td className="px-5 py-4 text-sm text-[#756A64]">
                        {user.email || "N/A"}
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {isBlocked ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                            Blocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Active
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(user)}
                          disabled={isUpdating}
                          className={`
                            px-4 py-1.5 rounded-lg text-xs font-semibold transition
                            ${
                              isBlocked
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200"
                            }
                            ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}
                          `}
                        >
                          {isUpdating
                            ? "Updating..."
                            : isBlocked
                            ? "Unblock"
                            : "Block"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#2F241F]/10 bg-[#FFF8F0]/30 text-sm">
              <p className="text-xs text-[#756A64]">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + usersPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded border border-[#2F241F]/20 text-xs disabled:opacity-40 hover:bg-[#F5EBE0]"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold ${
                        currentPage === pageNum
                          ? "bg-[#8B5E3C] text-white"
                          : "border border-[#2F241F]/20 hover:bg-[#F5EBE0]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded border border-[#2F241F]/20 text-xs disabled:opacity-40 hover:bg-[#F5EBE0]"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
