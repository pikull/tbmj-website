import LinkSection from "@/components/LinkSection";
import TeamCard from "@/components/TeamCard";

const TeamList = [
  {
    name: "Haadiyah Pathan",
    role: "Co-Founder",
    image: "/team/haadiyah.avif",
    about: "Hey, I am Haadiyah Pathan, I am a junior at Irvington High School, Fremont, CA. I founded this organization to provide accessible research opportunities to students after my continuous struggle of being unable to get the right mentorship for research. My future goals are to make The BioMed Journal large scale, and to pursue medicine. During my undergrad, I want to pursue molecular biology.",
  },
  {
    name: "Rania Khan",
    role: "Co-Founder",
    image: "/team/rania.avif",
    about: "Hi, my name is Rania, and I am a junior at Irvington High school. As one of the co-founders of the Biomed Journal, I hope to grow this platform into a place where all students can teach, explore, and learn from each other.",
  },
]

export default function Page() {
  return (
    <div className="mx-auto text-center px-12 max-w-screen-lg">
      <h2 className="font-bold text-2xl md:text-4xl pb-3">Who are we?</h2>
      <span className="text-lg">
        We are a high school run journal and organization that focuses on
        research and sharing knowledge in biological sciences.
        <br />
        <br />
        Our goal is to mentor students to write their research papers and
        literature reviews, while giving them the opportunity to{" "}
        <b>explore different topics in biological sciences.</b> We aim to{" "}
        <b>bridge the gap</b> between learning biological sciences in a
        classroom and in a lab. Our website serves as a platform to publish
        student-written papers and learn more about biological topics.
      </span>
      <LinkSection
        title="Read our articles"
        links={[
          { label: "Our Website", url: "/articles" },
          { label: "Substack", url: "https://substack.com/@thebiomedjournal" },
          { label: "Medium", url: "https://medium.com/@thebiomedjournal" },
        ]}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12 my-10">
        {TeamList.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
}
