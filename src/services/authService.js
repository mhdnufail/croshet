import api from "./api";

export const loginUser = async (email, password) => {
  // Query users matching email and password
  const response = await api.get("/users", {
    params: {
      email: email.trim().toLowerCase(),
      password: password,
    },
  });

  if (response.data && response.data.length > 0) {
    return response.data[0];
  }

  // Fallback in case JSON Server case-matching or param filter needs in-memory check
  const allUsersResponse = await api.get("/users");
  const matched = (allUsersResponse.data || []).find(
    (u) =>
      u.email?.trim().toLowerCase() === email.trim().toLowerCase() &&
      u.password === password
  );

  return matched || null;
};

export const checkEmailExists = async (email) => {
  const normalized = email.trim().toLowerCase();
  const response = await api.get("/users");
  const users = response.data || [];
  return users.some((u) => u.email?.trim().toLowerCase() === normalized);
};

export const registerUser = async (userData) => {
  const normalizedUser = {
    ...userData,
    email: userData.email.trim().toLowerCase(),
  };
  const response = await api.post("/users", normalizedUser);
  return response.data;
};

export const updateProfile = async (id, updatedFields) => {
  const response = await api.patch(`/users/${id}`, updatedFields);
  return response.data;
};
