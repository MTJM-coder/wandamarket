export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <header className="text-xl font-bold mb-4">Bienvenue invité 👋</header>
      <main className="w-full max-w-md bg-white p-6 rounded shadow">{children}</main>
    </div>
  );
}
