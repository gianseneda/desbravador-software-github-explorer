import { useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";

import { useUserSearch } from "@hooks/useGithub";
import type { GithubUserSearchResult } from "@services/github";

interface SearchInputProps {
  onSelect: (username: string) => void;
}

export const SearchInput = ({ onSelect }: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { results, loading } = useUserSearch(query);

  const handleSelect = (user: GithubUserSearchResult) => {
    setQuery(user.login);
    setOpen(false);
    onSelect(user.login);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!query.trim()) return;
      setOpen(false);
      onSelect(query.trim());
    }
    if (e.key === "Escape") setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(results.length > 0);
  }, [results]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex gap-2">
        <input
          className="flex-1 h-10 border bg-mauve-50 border-mauve-300 rounded-md px-3 text-sm outline-none focus:border-indigo-500 transition-colors"
          placeholder="Start typing..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          autoComplete="off"
        />
        <button
          onClick={() => {
            if (query.trim()) {
              setOpen(false);
              onSelect(query.trim());
            }
          }}
          className="h-10 px-5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
      </div>

      {open && (
        <motion.ul
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute z-10 top-12 left-0 right-0 bg-mauve-50 border border-mauve-200 rounded-xl shadow-lg overflow-hidden"
        >
          {loading && (
            <li className="px-4 py-3 text-sm text-mauve-400">Searching...</li>
          )}
          {results.map((user) => (
            <li
              key={user.id}
              onMouseDown={() => {
                handleSelect(user);
                setQuery("");
              }}
              className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-linear-to-r from-mauve-100 to-mauve-50 transition-colors"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-7 h-7 rounded-full border border-mauve-100"
              />
              <span className="text-sm text-mauve-700">{user.login}</span>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};
