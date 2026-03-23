import { useState } from "react";

import { SearchInput, UserSection } from "@components";

export const Home = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="flex flex-col w-full">
      <section
        className="flex flex-col justify-center
      items-center gap-4 px-4 py-10 min-h-screen"
      >
        <p className="text-sm tracking-widest text-mauve-400 uppercase">
          GitHub Explorer
        </p>
        <h1 className="text-indigo-700 text-5xl text-center leading-tight">
          Find any developer's repository
        </h1>
        <p className="text-mauve-500 text-base text-center">
          Type a GitHub username to access their profile and list their
          repositories
        </p>
        <SearchInput onSelect={setUsername} />
        <UserSection username={username} />
      </section>
    </div>
  );
};
