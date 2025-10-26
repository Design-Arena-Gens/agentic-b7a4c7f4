import { AuthForms } from "@/components/AuthForms";

export default function AuthPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Create an account or sign in</h1>
          <p className="mt-3 text-sm text-slate-600">
            Manage your SweetBite orders, track progress, and save your favorite cake configurations.
          </p>
          <div className="mt-6 rounded-2xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-pink-600">Why register?</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>• Save delivery addresses and order history.</li>
              <li>• Faster checkout for recurring celebrations.</li>
              <li>• Receive status updates as your cake is prepared.</li>
            </ul>
          </div>
        </div>
        <AuthForms />
      </div>
    </section>
  );
}
