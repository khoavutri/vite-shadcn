import React, { useState } from "react";

type Props = {};

const Login = ({ }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đăng nhập tại đây
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow w-full max-w-xs flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
          Đăng nhập
        </h2>
        <input
          type="email"
          placeholder="Email"
          required
          className="px-3 py-2 rounded border focus:outline-none focus:ring w-full dark:bg-gray-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          required
          className="px-3 py-2 rounded border focus:outline-none focus:ring w-full dark:bg-gray-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
