export default function AuthenticatedLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">Header sécurisé</header>
      <main className="p-6">{children}</main>
    </div>
  );
}
