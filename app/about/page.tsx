import LinkSection from "../../components/LinkSection";

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
    </div>
  );
}
