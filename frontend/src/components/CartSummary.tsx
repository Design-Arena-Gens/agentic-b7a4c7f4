'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart, toOrderRequest } from '@/context/CartContext';
import { api } from '@/lib/api';

export function CartSummary() {
  const { state, removeFromCart, total, clearCart } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [instructions, setInstructions] = useState('');
  const [userId, setUserId] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const checkout = async () => {
    if (!address || !phone) {
      setError('Please provide delivery address and contact phone.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const payload = toOrderRequest(userId, state.items, address, phone, instructions);
      await api.createOrder(payload);
      setSuccess('Order placed successfully!');
      clearCart();
      setAddress('');
      setPhone('');
      setInstructions('');
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
        <h2 className="text-2xl font-semibold text-slate-700">Your cart is empty</h2>
        <p className="mt-3 text-sm text-slate-500">Explore our delightful cakes and add your favorites to the cart.</p>
        <Link
          href="/cakes"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-pink-600"
        >
          Browse cakes
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-4">
        {state.items.map((item, index) => (
          <div key={`${item.cake.id}-${index}`} className="flex items-start justify-between rounded-2xl bg-white p-5 shadow">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{item.cake.name}</h3>
              <p className="text-sm text-slate-500">{item.cake.description}</p>
              <div className="mt-2 text-xs text-slate-400 space-x-2">
                {item.size ? <span>Size: {item.size}</span> : null}
                {item.flavor ? <span>Flavor: {item.flavor}</span> : null}
                {item.message ? <span>Message: {item.message}</span> : null}
              </div>
              <span className="mt-2 block text-sm font-semibold text-pink-600">${(Number(item.cake.price ?? 0) * item.quantity).toFixed(2)}</span>
            </div>
            <button
              onClick={() => removeFromCart(index)}
              className="rounded-full border border-pink-200 px-4 py-2 text-xs font-semibold text-pink-500 transition hover:bg-pink-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-slate-800">Delivery details</h3>
          <div className="mt-4 space-y-3 text-sm">
            <label className="block">
              <span className="text-slate-500">Registered user ID</span>
              <input
                type="number"
                min={1}
                value={userId}
                onChange={(event) => setUserId(Number(event.target.value))}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-slate-500">Delivery address</span>
              <textarea
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
                rows={3}
              />
            </label>
            <label className="block">
              <span className="text-slate-500">Contact phone</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-slate-500">Special instructions</span>
              <textarea
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
                rows={2}
              />
            </label>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-900 p-6 text-white shadow">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="mt-4 space-y-2 text-xs text-slate-400">
            <p>Delivery fee calculated upon confirmation.</p>
            <p>All cakes are lovingly baked fresh for your order.</p>
          </div>
          <button
            onClick={checkout}
            disabled={isSubmitting}
            className="mt-4 w-full rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-pink-300"
          >
            {isSubmitting ? 'Placing order…' : `Place order ($${total.toFixed(2)})`}
          </button>
          {error ? <p className="mt-3 text-xs text-red-200">{error}</p> : null}
          {success ? <p className="mt-3 text-xs text-emerald-200">{success}</p> : null}
        </div>
      </div>
    </div>
  );
}
