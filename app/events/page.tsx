// pages/events.tsx
import LinkSection from "@/components/LinkSection";

export default function Page() {
  return (
    <div className="mx-auto text-center px-6 py-16 max-w-4xl"> {/* wider container */}
      <h1 className="text-5xl md:text-6xl font-serif font-bold text-[var(--dark-green)] mb-8">
        Our Programs
      </h1>
      <p className="text-lg md:text-2xl text-[var(--dark-green)] mb-6 leading-relaxed">
        We offer <b>middle school and high school workshops</b>, 
        <b> side projects</b>, and <b>summer camps</b> to help students explore 
        science, technology, and research.
      </p>
      <p className="text-lg md:text-2xl text-[var(--dark-green)] mb-10 leading-relaxed">
        Email us for more information at{" "}
        <a href="mailto:info@thebiomedjournal.org" className="underline hover:text-[var(--light-green)]">
          thebiomedjournal@gmail.com
        </a>
      </p>
      <LinkSection
        title="Learn More"
        links={[
          { label: "Our Website", url: "/" },
          { label: "Articles", url: "/articles" },
          { label: "Publishing Form", url: "/contact" },
        ]}
      />
    </div>
  );
}