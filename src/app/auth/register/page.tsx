import { titleFont } from "@/config/fonts";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Register</h1>

      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="name"
          placeholder="Your name"
        />

        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          placeholder="example@example.com"
        />

        <label htmlFor="password">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          placeholder="******"
        />

        <button className="btn-primary">Register</button>

      </div>
    </div>
  );
}
