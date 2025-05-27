import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import "../../styles/App.css";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  loading,
  error,
}) {
  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
