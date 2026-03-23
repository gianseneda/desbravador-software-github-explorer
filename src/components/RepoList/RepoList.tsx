import { type GithubRepo } from "../../services/github";
import { type SortOption } from "../../hooks/useGithub";
import { RepoCard } from "../RepoCard/RepoCard";

interface RepoListProps {
  repos: GithubRepo[];
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Stars ↓", value: "stars_desc" },
  { label: "Stars ↑", value: "stars_asc" },
  { label: "Name", value: "name" },
  { label: "Updated", value: "updated" },
];

export const RepoList = ({ repos, sort, onSortChange }: RepoListProps) => {
  return (
    <section className="w-full bg-linear-to-b from-mauve-50 to-transparent rounded-t-4xl w-full px-2 md:px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-mauve-500">{repos.length} repositories</p>
        <div className="flex gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                sort === option.value
                  ? "bg-indigo-600 border-indigo-600 text-white font-medium"
                  : "border-mauve-300 text-mauve-500 hover:border-indigo-400 hover:text-indigo-500"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
};
