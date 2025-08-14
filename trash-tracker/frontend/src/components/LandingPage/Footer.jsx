import logo from "../../assets/wastara_logo_small.svg"

export default () => {

  const preventNav = (e) => e.preventDefault();

  const footerNavs = [
    {
      label: "Support",
      items: [
        { href: "#", name: "Donate Us" },
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
  ]

  return (
    <footer className="relative text-white bg-gradient-to-br from-[#2a3426] via-[#333E2F] to-[#3d4a37] w-full px-4 py-16 overflow-hidden">

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
          <div className="max-w-md group">
            <div>
              <img
                src={logo}
                alt="Wastara Logo"
                className="h-14 w-auto mb-6 filter brightness-100 transition-all duration-300"
              />
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 transition-colors duration-300 hover:text-white">
              Easily report full or neglected trash bins with GPS and photos. Help organizers respond quicker and keep
              your city clean — one report at a time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 lg:gap-16">
            {footerNavs.map((section, idx) => (
              <div key={idx} className="group">
                <h4 className="font-semibold mb-6 text-white relative">
                  {section.label}
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </h4>
                <ul className="space-y-3">
                  {section.items.map((el, i) => (
                    <li key={i}>
                      <a
                        href={el.href}
                        onClick={preventNav}
                        aria-disabled="true"
                        className="text-gray-300 hover:text-white transition-all duration-300 relative inline-block group/link"
                      >
                        <span className="relative z-10">{el.name}</span>
                        <div className="absolute inset-0 bg-white/5 rounded px-2 py-1 -mx-2 -my-1 scale-95 opacity-0 group-hover/link:scale-100 group-hover/link:opacity-100 transition-all duration-200"></div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-gray-400 text-sm">&copy; 2025 Wastara. All rights reserved.</div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 mr-2">Follow us:</span>
              <ul className="flex items-center gap-3">
                {[
                  {
                    href: "#",
                    name: "Facebook",
                    svg: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z" />
                      </svg>
                    ),
                    color: "hover:text-blue-500 hover:bg-blue-500/10",
                  },
                  {
                    href: "#",
                    name: "Twitter",
                    svg: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.5.58-2.33.7a4.07 4.07 0 001.81-2.24c-.79.47-1.65.8-2.57.98A4.05 4.05 0 0016.2 4c-2.26 0-4.1 1.85-4.1 4.1 0 .32.04.65.1.95-3.4-.2-6.42-1.8-8.43-4.3a4.12 4.12 0 00-.55 2.07c0 1.43.7 2.7 1.77 3.45a4.1 4.1 0 01-1.86-.52v.05c0 2 1.4 3.67 3.27 4.05-.34.1-.7.15-1.07.15-.26 0-.52-.02-.77-.07.52 1.62 2.03 2.8 3.82 2.83a8.2 8.2 0 01-5.07 1.75c-.33 0-.66-.02-.99-.06a11.6 11.6 0 006.29 1.85c7.55 0 11.7-6.26 11.7-11.7l-.01-.53A8.4 8.4 0 0022.46 6z" />
                      </svg>
                    ),
                    color: "hover:text-sky-400 hover:bg-sky-400/10",
                  },
                  {
                    href: "#",
                    name: "Instagram",
                    svg: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2.1.2 2.9.5a6.4 6.4 0 012.3 1.5c.6.6 1.1 1.4 1.5 2.3.3.8.4 1.7.5 2.9.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 2.1-.5 2.9a6.4 6.4 0 01-1.5 2.3c-.6.6-1.4 1.1-2.3 1.5-.8.3-1.7.4-2.9.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2.1-.2-2.9-.5a6.4 6.4 0 01-2.3-1.5 6.4 6.4 0 01-1.5-2.3c-.3-.8-.4-1.7-.5-2.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-2.1.5-2.9a6.4 6.4 0 011.5-2.3A6.4 6.4 0 016.5 2.8c.8-.3 1.7-.4 2.9-.5C8.4 2.2 8.8 2.2 12 2.2zm0 5.3a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.4a2.9 2.9 0 110-5.8 2.9 2.9 0 010 5.8zm5.2-7.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                      </svg>
                    ),
                    color: "hover:text-pink-500 hover:bg-pink-500/10",
                  },
                  {
                    href: "#",
                    name: "LinkedIn",
                    svg: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9v5.7H9V9h3.4v1.6h.1c.4-.8 1.4-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.8v6.6zM5.4 7.5a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zm1.8 12.9H3.6V9h3.6v11.4zM22 0H2a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V2a2 2 0 00-2-2z" />
                      </svg>
                    ),
                    color: "hover:text-blue-700 hover:bg-blue-700/10",
                  },
                ].map(({ href, name, svg, color }, i) => (
                  <li key={i}>
                    <a
                      href={href}
                      aria-label={name}
                      onClick={preventNav}
                      aria-disabled="true"
                      className={`w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 transform hover:scale-110 hover:border-white/40 ${color} group`}
                    >
                      <div className="transform transition-transform duration-300 group-hover:scale-110">{svg}</div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}