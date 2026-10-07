import { GITHUB_USER } from "./projects";

export interface Repo {
  name: string;
  url: string;
  homepage: string | null;
  language: string | null;
  pushedAt: string;
  fork: boolean;
}

/** Public repos, most recently pushed first. Cached for an hour; [] on failure. */
export async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data: any[] = await res.json();
    return data.map((r) => ({
      name: r.name,
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language,
      pushedAt: r.pushed_at,
      fork: r.fork,
    }));
  } catch {
    return [];
  }
}
