import api from "./api";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const getUserOrders = async (userId, userEmail) => {
  const response = await api.get("/orders");
  const allOrders = response.data || [];
  // Filter only orders belonging to this user
  return allOrders.filter(
    (order) =>
      (userId && String(order.userId) === String(userId)) ||
      (userEmail &&
        order.userEmail?.toLowerCase() === userEmail?.toLowerCase())
  );
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};
