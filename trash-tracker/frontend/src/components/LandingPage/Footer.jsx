import logo from "../../assets/WASTARA_black.svg";

export default () => {
  const footerNavs = [
    {
      label: "Support",
      items: [
        { href: "#", name: "FAQ" },
        { href: "#", name: "Contact Us" },
        { href: "#", name: "Bug Report" },
      ],
    },
    {
      label: "Legal",
      items: [
        { href: "#", name: "Terms of Service" },
        { href: "#", name: "Privacy Policy" },
        { href: "#", name: "License" },
      ],
    },
  ];

  return (
    <footer className="text-white bg-[#333E2F] w-full px-4 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left logo and description */}
        <div className="max-w-md">
          <img src={logo} alt="Wastara Logo" className="h-8 w-auto mb-4" />
          <p className="text-sm leading-relaxed">
            Easily report full or neglected trash bins with GPS and photos. Help organizers respond quicker and keep your city clean — one report at a time.
          </p>
        </div>

        {/* Right navs side-by-side */}
        <div className="flex flex-col sm:flex-row gap-16">
          {footerNavs.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-medium mb-4">{section.label}</h4>
              <ul className="space-y-2 text-sm">
                {section.items.map((el, i) => (
                  <li key={i}>
                    <a
                      href={el.href}
                      className="hover:underline hover:text-indigo-300"
                    >
                      {el.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between">
        <div>&copy; 2025 Wastara All rights reserved.</div>
        <ul className="flex items-center space-x-4 mt-4 sm:mt-0">
          {/* Replace hrefs with actual links */}
          {[
            {
              href: "#",
              svg: (
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z" />
                </svg>
              ),
            },
            {
              href: "#",
              svg: (
                <svg
                  className="w-5 h-5 text-sky-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.5.58-2.33.7a4.07 4.07 0 001.81-2.24c-.79.47-1.65.8-2.57.98A4.05 4.05 0 0016.2 4c-2.26 0-4.1 1.85-4.1 4.1 0 .32.04.65.1.95-3.4-.2-6.42-1.8-8.43-4.3a4.12 4.12 0 00-.55 2.07c0 1.43.7 2.7 1.77 3.45a4.1 4.1 0 01-1.86-.52v.05c0 2 1.4 3.67 3.27 4.05-.34.1-.7.15-1.07.15-.26 0-.52-.02-.77-.07.52 1.62 2.03 2.8 3.82 2.83a8.2 8.2 0 01-5.07 1.75c-.33 0-.66-.02-.99-.06a11.6 11.6 0 006.29 1.85c7.55 0 11.7-6.26 11.7-11.7l-.01-.53A8.4 8.4 0 0022.46 6z" />
                </svg>
              ),
            },
            {
              href: "#",
              svg: (
                <svg
                  className="w-5 h-5 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2.1.2 2.9.5a6.4 6.4 0 012.3 1.5c.6.6 1.1 1.4 1.5 2.3.3.8.4 1.7.5 2.9.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 2.1-.5 2.9a6.4 6.4 0 01-1.5 2.3c-.6.6-1.4 1.1-2.3 1.5-.8.3-1.7.4-2.9.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2.1-.2-2.9-.5a6.4 6.4 0 01-2.3-1.5 6.4 6.4 0 01-1.5-2.3c-.3-.8-.4-1.7-.5-2.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-2.1.5-2.9a6.4 6.4 0 011.5-2.3A6.4 6.4 0 016.5 2.8c.8-.3 1.7-.4 2.9-.5C8.4 2.2 8.8 2.2 12 2.2zm0 5.3a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.4a2.9 2.9 0 110-5.8 2.9 2.9 0 010 5.8zm5.2-7.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                </svg>
              ),
            },
            {
              href: "#",
              svg: (
                <svg
                  className="w-5 h-5 text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9v5.7H9V9h3.4v1.6h.1c.4-.8 1.4-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.8v6.6zM5.4 7.5a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zm1.8 12.9H3.6V9h3.6v11.4zM22 0H2a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V2a2 2 0 00-2-2z" />
                </svg>
              ),
            },
          ].map(({ href, svg }, i) => (
            <li
              key={i}
              className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center"
            >
              <a href={href}>{svg}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};