import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  useGithubUser,
  useSortedRepos,
  type SortOption,
} from "@hooks/useGithub";
import { RepoList, UserCard } from "@components";

type UserSectionProps = {
  username: string;
};

export const UserSection = ({ username }: UserSectionProps) => {
  const { user, repos, loading, error } = useGithubUser(username);

  const [sort, setSort] = useState<SortOption>("stars_desc");

  const sortedRepos = useSortedRepos(repos, sort);

  return (
    <AnimatePresence>
      {username && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex flex-col h-full w-full"
        >
          {loading && (
            <div className="flex justify-center items-center py-20 text-mauve-400 text-sm">
              Loading...
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center py-20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {user && !loading && (
            <div className="w-full mx-auto w-full px-4 pt-8 pb-4">
              <UserCard user={user} />
              <RepoList
                repos={sortedRepos}
                sort={sort}
                onSortChange={setSort}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
