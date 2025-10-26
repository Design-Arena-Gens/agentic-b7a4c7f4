import { AdminDashboard } from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">Admin dashboard</h1>
      <p className="mt-2 text-sm text-slate-600">
        Manage the SweetBite catalog, monitor orders, and update statuses in real time.
      </p>
      <div className="mt-10">
        <AdminDashboard />
      </div>
    </section>
  );
}
