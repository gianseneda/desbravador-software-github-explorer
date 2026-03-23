import { type GithubRepo } from "../../services/github";
import { getLanguageColor } from "../../utils/languageColors";

import { useNavigate } from "react-router";

interface RepoCardProps {
  repo: GithubRepo;
}

export const RepoCard = ({ repo }: RepoCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        console.log(repo.full_name);
        navigate(`/repo/${repo.full_name}`);
      }}
      className="bg-white border border-mauve-200 rounded-xl p-4 cursor-pointer hover:border-indigo-400 hover:shadow-sm transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-indigo-600 truncate">
          {repo.name}
        </span>
        <span className="flex items-center gap-1 text-xs text-amber-600 font-medium shrink-0 ml-2">
          ★ {repo.stargazers_count.toLocaleString()}
        </span>
      </div>

      <p className="text-xs text-mauve-500 leading-relaxed mb-3 line-clamp-2 min-h-[32px]">
        {repo.description ?? "No description"}
      </p>

      <div className="flex items-center gap-3">
        {repo.language && (
          <span className="text-xs text-mauve-500 flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ background: getLanguageColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
        <span className="text-xs text-mauve-400">
          ⑂ {repo.forks_count.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
