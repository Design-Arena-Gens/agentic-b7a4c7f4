import { CartSummary } from "@/components/CartSummary";

export default function CartPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">Your cart</h1>
      <p className="mt-2 text-sm text-slate-600">Review your selection and provide delivery details before placing your order.</p>
      <div className="mt-8">
        <CartSummary />
      </div>
    </section>
  );
}
