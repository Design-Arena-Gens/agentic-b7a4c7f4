const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`.replace(/([^:]\/)\/+/, '$1/');
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  return res.json() as Promise<T>;
}

export type ApiCake = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  sizes?: string[];
  flavors?: string[];
  customizationNotes?: string;
};

export type ApiOrderItem = {
  cakeId: number;
  quantity: number;
  size?: string;
  flavor?: string;
  message?: string;
};

export type ApiOrderRequest = {
  userId: number;
  items: ApiOrderItem[];
  deliveryAddress: string;
  contactPhone: string;
  specialInstructions?: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type ApiOrderItemResponse = {
  id: number;
  cakeId: number;
  cakeName: string;
  quantity: number;
  size?: string;
  flavor?: string;
  message?: string;
  unitPrice: number | string;
  totalPrice: number | string;
};

export type ApiOrderResponse = {
  id: number;
  status: string;
  totalAmount: number | string;
  createdAt: string;
  updatedAt?: string;
  deliveryAddress: string;
  contactPhone: string;
  specialInstructions?: string;
  userId: number;
  userName: string;
  userEmail: string;
  items: ApiOrderItemResponse[];
};

export const api = {
  getCakes: () => request<ApiCake[]>('/api/cakes'),
  getCake: (id: number) => request<ApiCake>(`/api/cakes/${id}`),
  createOrder: (data: ApiOrderRequest) => request('/api/orders', { method: 'POST', body: JSON.stringify(data) }),
  getOrdersForUser: (userId: number) => request<ApiOrderResponse[]>(`/api/orders/user/${userId}`),
  getAllOrders: () => request<ApiOrderResponse[]>('/api/orders'),
  updateOrderStatus: (orderId: number, status: string) => request(`/api/orders/${orderId}/status?status=${status}`, { method: 'PATCH' }),
  register: (data: { name: string; email: string; password: string }) => request<AuthResponse>('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) => request<AuthResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  getUsers: () => request<ApiUser[]>('/api/users'),
};
