import { CakeCard } from "@/components/CakeCard";
import type { ApiCake } from "@/lib/api";

async function fetchCakes(): Promise<ApiCake[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  try {
    const res = await fetch(`${base}/api/cakes`, { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to load cakes', await res.text());
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Unable to reach backend', error);
    return [];
  }
}

export default async function CakesPage() {
  const cakes = await fetchCakes();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Our cakes</h1>
          <p className="mt-2 text-sm text-slate-600">
            Choose a signature creation or tailor every layer to your celebration.
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cakes.map((cake) => (
          <CakeCard key={cake.id} cake={cake} />
        ))}
        {cakes.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <p className="text-sm text-slate-500">No cakes found. Please add items from the admin dashboard.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
