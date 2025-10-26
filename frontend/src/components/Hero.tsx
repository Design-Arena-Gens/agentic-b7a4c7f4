import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pink-600">
            SweetBite Cakes
          </span>
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
            Celebrate every moment with handcrafted cakes delivered to your door.
          </h1>
          <p className="text-base text-slate-600">
            Build the cake of your dreams. Choose flavors, sizes, and heartfelt messages while we take care of the baking and delivery.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cakes"
              className="rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-pink-600"
            >
              Browse cakes
            </Link>
            <Link
              href="/admin"
              className="rounded-full border border-pink-200 px-6 py-3 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
            >
              Admin dashboard
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-pink-100 blur-3xl" aria-hidden="true" />
          <div className="relative rounded-3xl bg-white p-6 shadow-xl shadow-pink-100">
            <div className="grid gap-3 text-sm">
              <div className="rounded-2xl bg-pink-50 p-4">
                <p className="text-xs uppercase text-pink-400">Customer favorite</p>
                <p className="mt-2 text-lg font-semibold text-pink-700">Velvet Dream</p>
                <p className="text-sm text-pink-500">Red velvet • Cream cheese • Personalized message</p>
              </div>
              <div className="rounded-2xl border border-pink-100 p-4">
                <p className="text-xs uppercase text-slate-400">Quick inside look</p>
                <ul className="mt-2 space-y-1 text-slate-500">
                  <li>✔️ Real-time order tracking for admins</li>
                  <li>✔️ Custom flavors & sizes</li>
                  <li>✔️ Fast checkout experience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
