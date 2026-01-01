"use client";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(href.replace("#", ""));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 0, // 헤더 높이 보정
        behavior: "smooth",
      });
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