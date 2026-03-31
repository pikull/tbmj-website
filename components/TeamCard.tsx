import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  about: string;
}

export default function TeamCard({ name, role, image, about }: TeamMember) {
  return <div className="flex flex-col group bg-[var(--light-green)] text-[var(--soft-white)]">
    <div className="relative w-full aspect-[2/3] bg-gray-100 mb-3 overflow-hidden">
      <Image src={image} alt={name} fill className="object-cover" />
    </div>
    <div className="flex flex-col">
      <span className="font-mono text-xs md:text-sm text-[var(--dark-green)] uppercase">{role}</span>
      <h3 className="text-lg md:text-xl font-bold tracking-tight leading-none">{name}</h3>
      <p className="text-lg md:text-xl font-medium tracking-tight leading-none">{about}</p>
    </div>
  </div>
}
