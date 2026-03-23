import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { useGithubUser } from "@hooks/useGithub";
import { getRepo, type GithubRepo } from "@services/github";

import { formatDate } from "@utils/formatDate";
import { getLanguageColor } from "@utils/languageColors";

import { UserCard } from "@components";

export const Repo = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const { user } = useGithubUser(owner || "");

  const navigate = useNavigate();

  const [data, setData] = useState<GithubRepo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!owner || !repo) return;

    const fetchRepo = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getRepo(`${owner}/${repo}`);
        setData(result);
      } catch {
        setError("Repository not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepo();
  }, [owner, repo]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-mauve-400 text-sm">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <p className="text-red-400 text-sm">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-indigo-600 underline"
        >
          Go back
        </button>
      </div>
    );

  if (!data) return null;

  return (
    <div className="hero-gradient min-h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-white border border-mauve-200 rounded-2xl shadow-sm w-full h-[80vh] p-8">
        <button
          onClick={() => navigate(-1)}
          className="text-md text-mauve-400 hover:text-indigo-500 transition-colors mb-6 flex items-center gap-1"
        >
          ← Back
        </button>

        <div className="bg-mauve-50 border border-mauve-100 rounded-xl py-4 px-4 md:px-8 shadow-md mb-4">
          {user && <UserCard user={user} />}
        </div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-center text-indigo-600 break-all">
            {data.name}
          </h1>
          <span className="flex items-center gap-1 text-3xl text-amber-600 font-semibold shrink-0">
            ★ {data.stargazers_count.toLocaleString()}
          </span>
        </div>

        {data.description && (
          <p className="text-xl text-mauve-500 leading-relaxed mb-6">
            {data.description}
          </p>
        )}
        <div className="flex flex-col gap-3 mb-8">
          {data.language && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-md text-mauve-600">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: getLanguageColor(data.language) }}
                />
                {data.language}
              </div>
              <div className="flex items-center gap-2 text-md text-mauve-600">
                <p className="text-mauve-500">Default branch:</p>
                <span className="text-mauve-800">{data.default_branch}</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 text-md text-mauve-600">
            <span className="text-mauve-400">⑂</span>
            {data.forks_count.toLocaleString()} forks
          </div>

          <div className="flex w-full justify-around items-center gap-4 text-md text-mauve-600">
            <p>
              Created <strong>{formatDate(data.created_at)}</strong>
            </p>
            <p>
              Pushed <strong>{formatDate(data.pushed_at)}</strong>
            </p>
            <p>
              Updated <strong>{formatDate(data.updated_at)}</strong>
            </p>
          </div>
        </div>

        <a
          href={data.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center h-10 leading-10 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
};
