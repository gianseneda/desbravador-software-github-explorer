import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    ...(import.meta.env.VITE_GITHUB_TOKEN && {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }),
  },
});

export interface GithubUserSearchResult {
  id: number;
  login: string;
  avatar_url: string;
}

export interface GithubSearchResponse {
  items: GithubUserSearchResult[];
}

export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  email: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  open_issues: number;
  default_branch: string;
}

export const searchUsers = (query: string) =>
  api
    .get<GithubSearchResponse>("/search/users", {
      params: { q: query, per_page: 6 },
    })
    .then((res) => res.data.items);

export const getUser = (username: string) =>
  api.get<GithubUser>(`/users/${username}`).then((res) => res.data);

export const getUserRepos = (username: string) =>
  api
    .get<GithubRepo[]>(`/users/${username}/repos`, {
      params: { per_page: 100 },
    })
    .then((res) => res.data);

export const getRepo = (fullName: string) =>
  api.get<GithubRepo>(`/repos/${fullName}`).then((res) => res.data);
