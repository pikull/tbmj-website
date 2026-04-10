import LinkSection from "@/components/LinkSection";
import TeamCard from "@/components/TeamCard";

const TeamList = [
  {
    name: "Haadiyah Pathan",
    role: "Co-Founder",
    image: "/team/haadiyah.avif",
    about:
      "Hey, I am Haadiyah Pathan, I am a junior at Irvington High School, Fremont, CA. I founded this organization to provide accessible research opportunities to students after my continuous struggle of being unable to get the right mentorship for research. My future goals are to make The BioMed Journal large scale, and to pursue medicine. During my undergrad, I want to pursue molecular biology.",
  },
  {
    name: "Rania Khan",
    role: "Co-Founder",
    image: "/team/rania.avif",
    about:
      "Hi, my name is Rania, and I am a junior at Irvington High school. As one of the co-founders of the Biomed Journal, I hope to grow this platform into a place where all students can teach, explore, and learn from each other.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-16 py-16">
      {/* Intro section */}
      <section className="text-center max-w-4xl mx-auto">
        <p className="uppercase tracking-[0.2em] text-sm text-[var(--light-green)] font-semibold mb-3">
          About Us
        </p>

        <h1 className="font-bold text-4xl md:text-6xl text-[var(--dark-green)] leading-tight mb-6">
          Who Are We?
        </h1>

        <div className="space-y-6 text-lg md:text-xl leading-8 text-[var(--dark-green)] opacity-90">
          <p>
            We are a high school–run journal and organization focused on
            research, discovery, and sharing knowledge in the biological
            sciences.
          </p>

          <p>
            Our mission is to mentor students in writing research papers and
            literature reviews while giving them the opportunity to{" "}
            <span className="font-semibold text-[var(--dark-green)]">
              explore different topics in biological sciences
            </span>
            .
          </p>

          <p>
            We aim to{" "}
            <span className="font-semibold text-[var(--dark-green)]">
              bridge the gap
            </span>{" "}
            between classroom learning and real scientific inquiry in the lab.
            Our platform serves as a space to publish student-written papers and
            inspire curiosity in future researchers.
          </p>
        </div>
      </section>

      {/* CTA links */}
      <div className="mt-14">
        <LinkSection
          title="Read our articles"
          links={[
            { label: "Our Website", url: "/articles" },
            {
              label: "Substack",
              url: "https://substack.com/@thebiomedjournal",
            },
            {
              label: "Medium",
              url: "https://medium.com/@thebiomedjournal",
            },
          ]}
        />
      </div>

      {/* Team section */}
      <section className="mt-24">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.2em] text-sm text-[var(--light-green)] font-semibold mb-2">
            Leadership
          </p>
          <h2 className="text-4xl md:text-5xl text-[var(--dark-green)] font-bold">
            Meet the Team
          </h2>
          <div className="w-24 h-1 bg-[var(--light-green)] mx-auto mt-4 rounded-full opacity-70" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {TeamList.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
}