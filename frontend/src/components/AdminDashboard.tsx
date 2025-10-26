'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { ApiCake, ApiOrderResponse, ApiUser } from '@/lib/api';

const statuses = ['PENDING', 'PROCESSING', 'READY', 'COMPLETED', 'CANCELLED'];

export function AdminDashboard() {
  const [cakes, setCakes] = useState<ApiCake[]>([]);
  const [orders, setOrders] = useState<ApiOrderResponse[]>([]);
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [cakesData, ordersData, usersData] = await Promise.all([
          api.getCakes(),
          api.getAllOrders(),
          api.getUsers(),
        ]);
        setCakes(cakesData);
        setOrders(ordersData);
        setUsers(usersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load admin data');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const updateStatus = async (orderId: number, status: string) => {
    try {
      await api.updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update order');
    }
  };

  if (loading) {
    return <p className="text-center text-sm text-slate-500">Loading admin dashboard…</p>;
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold text-slate-800">Catalog Overview</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cakes.map((cake) => (
            <div key={cake.id} className="rounded-2xl bg-white p-5 shadow">
              <h3 className="text-lg font-semibold text-pink-600">{cake.name}</h3>
              <p className="mt-2 text-sm text-slate-500">{cake.description}</p>
              <div className="mt-3 text-xs text-slate-400 space-y-1">
                <p>Sizes: {cake.sizes?.join(', ') || 'N/A'}</p>
                <p>Flavors: {cake.flavors?.join(', ') || 'N/A'}</p>
              </div>
              <span className="mt-3 inline-block text-sm font-semibold text-slate-700">${cake.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-800">Customers</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {users.map((user) => (
            <div key={user.id} className="rounded-2xl bg-white p-4 shadow">
              <p className="text-sm font-semibold text-slate-700">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
              <span className="mt-2 inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
                {user.role}
              </span>
            </div>
          ))}
          {users.length === 0 ? (
            <p className="rounded-2xl bg-white p-6 text-sm text-slate-500 shadow">
              No registered users yet.
            </p>
          ) : null}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-800">Orders</h2>
        {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
        <div className="mt-4 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl bg-white p-6 shadow">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Order #{order.id}</h3>
                  <p className="text-sm text-slate-500">
                    {order.userName} • {order.userEmail}
                  </p>
                  <p className="text-xs text-slate-400">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs uppercase text-slate-400">Status</label>
                  <select
                    value={order.status}
                    onChange={(event) => updateStatus(order.id, event.target.value)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 grid gap-3 text-sm">
                {order.items.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-100 p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-700">{item.cakeName}</p>
                      <span className="text-pink-500">${Number(item.totalPrice ?? 0).toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Qty: {item.quantity} • {item.size || 'Any size'} • {item.flavor || 'Any flavor'}
                    </p>
                    {item.message ? <p className="text-xs text-slate-500">Message: {item.message}</p> : null}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-1 text-xs text-slate-500">
                <p>Delivery address: {order.deliveryAddress}</p>
                <p>Contact: {order.contactPhone}</p>
                {order.specialInstructions ? <p>Notes: {order.specialInstructions}</p> : null}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Total: ${Number(order.totalAmount ?? 0).toFixed(2)}</span>
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
