import { getRepos } from "@/lib/github";
import { projects } from "@/lib/projects";
import Sidebar from "@/components/site/Sidebar";
import MobileBar from "@/components/site/MobileBar";
import CommandMenu from "@/components/site/CommandMenu";
import Intro from "@/components/site/Intro";
import Work from "@/components/site/Work";
import GitHubFeed from "@/components/site/GitHubFeed";
import { Services, Stack } from "@/components/site/Services";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export const revalidate = 3600;

export default async function Home() {
  const repos = (await getRepos()).map((r) => ({
    ...r,
    // Prefer the live URL I curate (some repo homepages are stale).
    homepage: projects.find((p) => p.repo === r.name)?.url ?? r.homepage,
  }));

  return (
    <>
      <CommandMenu />
      <Sidebar />
      <div className="lg:pl-[264px]">
        <MobileBar />
        <main id="top" className="mx-auto max-w-[1320px] px-4 sm:px-8 lg:px-12 xl:px-16 min-[1800px]:max-w-[1600px] min-[2200px]:max-w-[1840px]">
          <Intro repoCount={repos.length} />
          <Work />
          <GitHubFeed repos={repos} />
          <Services />
          <Stack />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
