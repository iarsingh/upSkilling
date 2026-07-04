"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, undefined);

  return (
    <div className="mx-auto max-w-sm px-6 py-24 sm:py-32">
      <h1 className="text-2xl font-bold tracking-tight mb-1 font-mono">
        <span className="text-accent">$</span> sudo login
      </h1>
      <p className="text-muted text-sm mb-8">Sign in to edit portfolio content.</p>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm mb-1.5 text-muted">
            Username
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm mb-1.5 text-muted">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-accent text-background py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
