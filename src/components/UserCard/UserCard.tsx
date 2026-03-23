import type { GithubUser } from "../../services/github";

type UserCardProps = {
  user: GithubUser;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-4 mb-6">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 h-24 rounded-full border border-mauve-200"
      />
      <div>
        <h2 className="text-base font-semibold text-mauve-800">
          {user.name ?? user.login}
        </h2>
        {user.bio && (
          <p className="text-sm text-mauve-500 mt-0.5">{user.bio}</p>
        )}
        {user.email && (
          <p className="text-xs text-mauve-400 mt-0.5">{user.email}</p>
        )}
        <div className="flex gap-4 mt-1">
          <span className="text-xs text-mauve-500">
            <strong className="text-mauve-700">
              {user.followers.toLocaleString()}
            </strong>{" "}
            followers
          </span>
          <span className="text-xs text-mauve-500">
            <strong className="text-mauve-700">
              {user.following.toLocaleString()}
            </strong>{" "}
            following
          </span>
        </div>
      </div>
    </div>
  );
};
