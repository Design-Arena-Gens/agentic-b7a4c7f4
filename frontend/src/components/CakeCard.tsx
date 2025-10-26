'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ApiCake } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export function CakeCard({ cake }: { cake: ApiCake }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(cake.sizes?.[0]);
  const [flavor, setFlavor] = useState(cake.flavors?.[0]);
  const [message, setMessage] = useState('');

  const price = Number(cake.price ?? 0);

  const onAddToCart = () => {
    addToCart({
      cake,
      quantity,
      size,
      flavor,
      message: message.trim() || undefined,
    });
    setQuantity(1);
    setMessage('');
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-lg shadow-pink-100">
      <div className="relative h-56 w-full overflow-hidden rounded-xl">
        <Image
          src={cake.imageUrl || 'https://images.unsplash.com/photo-1546553034-6e81709b0333'}
          alt={cake.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">{cake.name}</h3>
          <span className="text-pink-600">${price.toFixed(2)}</span>
        </div>
        <p className="mt-2 text-sm text-slate-500">{cake.description}</p>
        <div className="mt-4 space-y-2 text-sm">
          {cake.sizes?.length ? (
            <label className="flex items-center justify-between">
              <span className="text-slate-600">Size</span>
              <select
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              >
                {cake.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          {cake.flavors?.length ? (
            <label className="flex items-center justify-between">
              <span className="text-slate-600">Flavor</span>
              <select
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm"
                value={flavor}
                onChange={(event) => setFlavor(event.target.value)}
              >
                {cake.flavors.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          <label className="flex items-center justify-between">
            <span className="text-slate-600">Quantity</span>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="w-20 rounded-md border border-slate-200 px-2 py-1 text-right"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-slate-600">Custom message</span>
            <input
              type="text"
              maxLength={60}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={cake.customizationNotes || 'Add a personalized message'}
              className="rounded-md border border-slate-200 px-3 py-2"
            />
          </label>
        </div>
        <button
          onClick={onAddToCart}
          className="mt-4 flex items-center justify-center gap-2 rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-pink-600"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
