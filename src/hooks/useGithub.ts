import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  getUser,
  getUserRepos,
  searchUsers,
  type GithubUser,
  type GithubRepo,
  type GithubUserSearchResult,
} from "../services/github";

export type SortOption = "stars_desc" | "stars_asc" | "name" | "updated";

export const useGithubUser = (username: string) => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [userData, reposData] = await Promise.all([
          getUser(username),
          getUserRepos(username),
        ]);
        setUser(userData);
        setRepos(reposData);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError("User not found");
        } else if (axios.isAxiosError(err) && err.response?.status === 403) {
          setError("API rate limit exceeded. Add a GitHub token to continue.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { user, repos, loading, error };
};

export const useSortedRepos = (repos: GithubRepo[], sort: SortOption) => {
  return useMemo(() => {
    const sorted = [...repos];

    switch (sort) {
      case "stars_desc":
        return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
      case "stars_asc":
        return sorted.sort((a, b) => a.stargazers_count - b.stargazers_count);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "updated":
        return sorted.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );
      default:
        return sorted;
    }
  }, [repos, sort]);
};

export const useUserSearch = (query: string) => {
  const [results, setResults] = useState<GithubUserSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchUsers(query);
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return { results, loading };
};
