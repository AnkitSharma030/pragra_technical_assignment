'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 px-4">
      <main className="text-center space-y-8 max-w-3xl">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Future Store
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Experience the next generation of e-commerce. <br />
          Seamless Shopping. Secure Payments. Instant Joy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/products"
            className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-lg hover:shadow-indigo-500/20"
          >
            Shop Now
          </Link>
          {user ? "" :
            <Link
              href="/auth/login"
              className="px-8 py-3 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm"
            >
              Sign In
            </Link>
          }
        </div>
      </main>

      <footer className="absolute bottom-8 text-zinc-400 text-sm">
        &copy; {new Date().getFullYear()} Future Store. All rights reserved.
      </footer>
    </div>
  );
}
