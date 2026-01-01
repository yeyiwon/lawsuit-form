"use client";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("/#")) {
      e.preventDefault();

      const targetId = href.replace("/#", "");
      const target = document.getElementById(targetId);
      
      if (target) {
        const topOffset = target.offsetTop - 40;
        window.scrollTo({
          top: topOffset,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleScrollTo}
      className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
    >
      {children}
    </a>
  );
}