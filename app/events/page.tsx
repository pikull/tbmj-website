import Image from "next/image";

// ==========================================
// QUICK COMPONENT PARAMETERS FOR EASY UPDATE
// ==========================================
const EVENTS_DATA = [
  {
    id: "ms-summer-camp",
    title: "Middle School Summer Camp",
    description: "Join us this summer for an immersive science camp geared towards middle schoolers. Through engaging activities and guided lessons, we spark early interest in STEM and lay the groundwork for future scientific curiosity.",
    // Toggle these to easily update the website:
    status: "upcoming", // "upcoming" or "past"
    signupsOpen: true, // true or false
    airtableEmbedUrl: "https://airtable.com/embed/YOUR_FORM_ID_HERE?backgroundColor=green",
    imageSrc: "", // e.g., "/events/ms-camp.jpg" (Make sure to put the image in public/events/)
    imagePlaceholder: "[ Middle School Camp Image Placeholder ]"
  },
  {
    id: "hs-summer-project",
    title: "HS Summer Project",
    description: "A comprehensive summer research and project-building opportunity designed to equip high schoolers with tangible computational and laboratory skills.",
    status: "upcoming",
    signupsOpen: false,
    airtableEmbedUrl: "", 
    imageSrc: "", 
    imagePlaceholder: "[ HS Summer Project Image Placeholder ]"
  },
  {
    id: "hs-dna-extraction",
    title: "HS Workshops — Learning Microscopy",
    description: "We provide hands-on, interactive experiences for high school students to engage directly with advanced scientific techniques. Recently, we conducted an in-person DNA extraction and microscopy workshop to give students practical, real-world laboratory experience.",
    status: "past",
    signupsOpen: false,
    airtableEmbedUrl: "",
    imageSrc: "", // Add your path here when ready, e.g., "/events/dna-extraction.jpg"
    imagePlaceholder: "[ IHS DNA Extraction / Microscopy Image Placeholder ]"
  }
];

export default function Page() {
  // const upcomingEvents = EVENTS_DATA.filter((e) => e.status === "upcoming");
  // const pastEvents = EVENTS_DATA.filter((e) => e.status === "past");
  const upcomingEvents = {};
  const pastEvents = {};

  return (
    <div className="mx-auto px-6 py-16 max-w-5xl">
      <h1 className="text-5xl md:text-6xl font-bold text-center text-[var(--dark-green)] mb-16">
        Programs & Workshops
      </h1>

      {/* UPCOMING EVENTS SECTION */}
      {upcomingEvents.length > 0 && (
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-4xl font-bold text-[var(--dark-green)]">
              Upcoming Events
            </h2>
            <span className="h-1 flex-1 bg-[var(--light-green)] opacity-30 rounded-full" />
          </div>

          <div className="space-y-16">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-[var(--light-green)]/5 p-8 rounded-3xl border border-[var(--light-green)]/30 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Info side */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-3xl font-bold text-[var(--dark-green)]">{event.title}</h3>
                      {event.signupsOpen ? (
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">Signups Open</span>
                      ) : (
                        <span className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Signups Closed</span>
                      )}
                    </div>
                    <p className="text-lg text-[var(--dark-green)] leading-relaxed mb-6 opacity-90">
                      {event.description}
                    </p>

                    {/* Image or Placeholder (Only shown if no airtable form is open/provided to save space) */}
                    {!event.signupsOpen && (
                      <div className="w-full aspect-video relative bg-gray-100 rounded-2xl overflow-hidden border border-[var(--light-green)]/30 mt-6">
                        {event.imageSrc ? (
                          <Image
                            src={event.imageSrc}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 bg-gray-200">
                            {event.imagePlaceholder}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Form Side */}
                  {event.signupsOpen && event.airtableEmbedUrl && (
                    <div className="flex-1 w-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-inner h-[500px]">
                      <iframe
                        className="w-full h-full"
                        src={event.airtableEmbedUrl}
                        frameBorder="0"
                        title={`${event.title} Signup Form`}
                        style={{ background: 'transparent' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PAST EVENTS SECTION */}
      {pastEvents.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-4xl font-bold text-[var(--dark-green)]">
              Past Events
            </h2>
            <span className="h-1 flex-1 bg-[var(--light-green)] opacity-30 rounded-full" />
          </div>

          <div className="space-y-16">
            {pastEvents.map((event, index) => (
              <div key={event.id} className={`flex flex-col gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                <div className="flex-1 text-lg text-[var(--dark-green)] leading-relaxed">
                  <h3 className="text-3xl font-bold mb-4">{event.title}</h3>
                  <p className="opacity-90">{event.description}</p>
                </div>
                <div className="flex-1 w-full aspect-[4/3] relative bg-gray-100 rounded-2xl overflow-hidden border border-[var(--light-green)]/30">
                  {event.imageSrc ? (
                    <Image
                      src={event.imageSrc}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 bg-gray-200">
                      {event.imagePlaceholder}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <div className="text-center mt-20 pt-10 border-t border-[var(--light-green)]/20">
        <p className="text-xl text-[var(--dark-green)] mb-6">
          Email us for more information at{" "}
          <a href="mailto:thebiomedjournal@gmail.com" className="underline hover:text-[var(--light-green)] font-semibold">
            thebiomedjournal@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
