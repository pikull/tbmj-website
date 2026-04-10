import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  about: string;
}

export default function TeamCard({ name, role, image, about }: TeamMember) {
  return (
    <div className="flex flex-col group bg-[var(--light-green)] text-[var(--soft-white)] rounded-2xl overflow-hidden shadow-md">
      {/* Image */}
      <div className="relative w-full aspect-[2/3] bg-gray-100 mb-3 overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Text container with padding */}
      <div className="flex flex-col p-4 gap-1">
        <span className="font-mono text-xs md:text-sm text-[var(--dark-green)] uppercase">
          {role}
        </span>
        <h3 className="text-lg md:text-xl font-bold tracking-tight leading-snug">
          {name}
        </h3>
        <div className="text-sm md:text-base text-[var(--dark-green)]">
          {about}
        </div>
      </div>
    </div>
  );
}