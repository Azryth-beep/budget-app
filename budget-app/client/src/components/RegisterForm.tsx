import React from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useStore } from "../store";

const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const register = async (data: { email: string; password: string }) => {
  const response = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Registration failed");
  return response.json();
};

export default function RegisterForm() {
  const { setUser } = useStore();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setUser({ id: data.id, email: data.email, token: null });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      registerSchema.parse(data);
      mutation.mutate(data as { email: string; password: string });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-4 p-4">
        <a
          href="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Register
        </a>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {mutation.isError && (
          <p className="text-red-500">{mutation.error.message}</p>
        )}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </>
  );
}
