# GitHub Explorer

A client-side React application that allows you to search for GitHub users and explore their repositories.

🔗 **Live demo**: [desbravador-software-github-explore.vercel.app](https://desbravador-software-github-explore.vercel.app)

---

## Features

- Search for any GitHub user with autocomplete suggestions
- View user profile details: avatar, bio, email, followers and following
- List all public repositories ordered by stars (descending by default)
- Change repository sort order: stars ↓, stars ↑, name, or last updated
- View repository details: name, description, stars, forks, language, branch, dates
- Direct link to the repository on GitHub
- Smooth animations powered by Framer Motion
- Fully responsive layout

---

## Tech stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router v7](https://reactrouter.com)
- [Axios](https://axios-http.com)
- [Framer Motion](https://www.framer.com/motion)
- [GitHub REST API v3](https://docs.github.com/en/rest)

---

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/gianseneda/desbravador-software-github-explorer.git

# Navigate to the project directory
cd desbravador-software-github-explorer

# Install dependencies
npm install
```

### Environment variables

Create a `.env` file in the root of the project:

```env
VITE_GITHUB_TOKEN=your_github_token_here
```

> The token is optional but recommended. Without it, the GitHub API allows only 60 requests/hour. With a token, the limit increases to 5,000 requests/hour.
>
> To generate a token: **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)** — select the `public_repo` scope.

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

---

## Project structure

```
src/
├── components/
│   ├── RepoCard/
│   ├── RepoList/
│   ├── RepoModal/
│   ├── SearchInput/
│   └── UserCard/
├── hooks/
│   └── useGithub.ts
├── pages/
│   ├── Home/
│   └── Repo/
├── services/
│   └── github.ts
└── utils/
    ├── formatDate.ts
    └── languageColors.ts
```

---

## API endpoints used

| Endpoint                      | Description                   |
| ----------------------------- | ----------------------------- |
| `GET /search/users?q={query}` | Search users for autocomplete |
| `GET /users/{username}`       | Get user profile details      |
| `GET /users/{username}/repos` | List user repositories        |
| `GET /repos/{owner}/{repo}`   | Get repository details        |

---

## License

MIT
