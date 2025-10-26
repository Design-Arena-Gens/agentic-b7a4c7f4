import Link from "next/link";
import { Hero } from "@/components/Hero";

const highlights = [
  {
    title: "Curated Signatures",
    description: "Discover our best-selling cakes perfected by artisan pastry chefs.",
  },
  {
    title: "Custom Creations",
    description: "Design every layer – flavors, frostings, fillings, and messages.",
  },
  {
    title: "Admin Intelligence",
    description: "Monitor orders, update statuses, and manage the full catalog with ease.",
  },
];

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      <Hero />

      <section className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold text-slate-900">Crafted for celebrations</h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          SweetBite brings together a seamless shopping experience for customers and a powerful toolkit for cake shop owners.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 shadow-lg shadow-pink-100/40">
              <h3 className="text-xl font-semibold text-pink-600">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">A delightful workflow from oven to doorstep</h2>
              <p className="mt-4 text-base text-slate-600">
                Customers browse curated collections, customize every detail, and place orders in a few intuitive steps. Meanwhile, admins manage inventory, monitor order statuses, and keep every celebration on schedule.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-500">
                <p>• Responsive storefront optimized for mobile ordering.</p>
                <p>• Secure account creation and speedy checkout.</p>
                <p>• Admin dashboard for catalog, orders, and user oversight.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                <Link href="/cakes" className="rounded-full bg-pink-500 px-5 py-2 text-white shadow hover:bg-pink-600">
                  Explore the menu
                </Link>
                <Link href="/admin" className="rounded-full border border-pink-200 px-5 py-2 text-pink-600 hover:bg-pink-50">
                  Manage orders
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-pink-100 bg-pink-50 p-6 shadow">
                <p className="text-xs uppercase text-pink-400">Customer story</p>
                <p className="mt-2 text-sm text-pink-700">
                  “SweetBite helped us launch our cake shop online in a single weekend. The admin tools keep my team organized during rush hours.”
                </p>
                <p className="mt-3 text-xs font-semibold text-pink-500">— Priya, Sweet Whisk Bakery</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow">
                <h3 className="text-lg font-semibold text-slate-800">At a glance</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-500">
                  <li>⚡ Live catalog management</li>
                  <li>📦 Real-time order status updates</li>
                  <li>🎉 Personalized cake builder experience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
