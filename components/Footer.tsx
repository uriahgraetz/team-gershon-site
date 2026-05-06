const footerLinks = [
  { href: "#home",     label: "Home" },
  { href: "#programs", label: "Programs" },
  { href: "#gallery",  label: "Gallery" },
  { href: "#contact",  label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black-deep border-t border-red/20 px-[5vw] py-12 flex flex-wrap justify-between items-center gap-4">
      <div className="font-bebas text-[1.5rem] tracking-[2px] text-cream">
        TEAM <span className="text-red">GERSHON</span>
      </div>
      <div className="text-[0.85rem] text-muted">
        © 2025 Team Gershon. All rights reserved.
      </div>
      <div className="flex gap-6">
        {footerLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-barlow-cond text-[0.8rem] font-semibold tracking-[2px] uppercase text-muted no-underline transition-colors duration-200 hover:text-red"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
