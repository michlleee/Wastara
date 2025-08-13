import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/wastara_logo_small_border.svg"
import { Menu, X } from "lucide-react"

const BRAND = "#6D9D58"
const NAV_OFFSET = 80

const Navbar = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top: y, behavior: "smooth" })
    setIsOpen(false)
  }
  const scrollToHero = () => scrollToId("hero-section")

  const isLight = isScrolled && !isMobile
  const navLinkClass = `transition-colors duration-300 ${
    isLight ? "text-gray-700 hover:text-[#6D9D58]" : "text-white hover:text-[#6D9D58]"
  }`

  const onLoginHover = (e) => {
    if (isLight) {
      e.currentTarget.style.backgroundColor = BRAND
      e.currentTarget.style.color = "#ffffff"
    } else {
      e.currentTarget.style.backgroundColor = "#ffffff"
      e.currentTarget.style.color = BRAND
    }
  }
  const onLoginLeave = (e) => {
    e.currentTarget.style.backgroundColor = "transparent"
    e.currentTarget.style.color = isLight ? BRAND : "#ffffff"
  }

  const navItems = [
    { id: "hero-section", label: "Home", onClick: scrollToHero },
    { id: "about", label: "About Us" },
    { id: "vision", label: "Vision & Mission" },
    { id: "features", label: "Features" },
    { id: "how", label: "How to Use" },
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => {
      if (!isMobile) {
        const heroSection = document.getElementById("hero-section")
        if (heroSection) {
          const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
          setIsScrolled(window.scrollY > heroBottom * 0.8)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [isMobile])

  return (
    <header
      className={`flex justify-between items-center px-6 py-4 text-white fixed top-0 w-full z-50 transition-all duration-300 ${
        isLight ? "sm:bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      } ${className}`}
    >
      <button
        type="button"
        onClick={scrollToHero}
        title="Back to top"
        className="flex flex-row items-center cursor-pointer select-none focus:outline-none"
      >
        <img src={logo} alt="Wastara Logo" className="ml-2 sm:ml-8 h-8 sm:h-12 w-auto" />
        <span
          className={`ml-2 sm:ml-4 text-md sm:text-lg font-extrabold transition-colors duration-300 ${
            isMobile ? "text-[#6D9D58]" : isScrolled ? "text-gray-800" : "text-white"
          }`}
        >
          Wastara
        </span>
      </button>

      <nav className="space-x-20 hidden mr-25 sm:flex">
        {navItems.map(({ id, label, onClick }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault()
              onClick ? onClick() : scrollToId(id)
            }}
            className={navLinkClass}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="hidden sm:flex space-x-2">
        <Link
          to="/login"
          className="px-4 py-2 text-base font-semibold rounded-xl transition-all duration-300"
          style={{
            color: isLight ? BRAND : "#ffffff",
            border: isLight ? `1px solid ${BRAND}` : "1px solid #ffffff",
          }}
          onMouseOver={onLoginHover}
          onMouseOut={onLoginLeave}
        >
          Login
        </Link>
      </div>

      <button
        className={`sm:hidden focus:outline-none transition-colors duration-300 ${
          isMobile ? "text-[#6D9D58]" : "text-white"
        }`}
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={28} color={isMobile ? BRAND : isScrolled ? "#111827" : "#ffffff"} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="fixed top-0 left-0 w-3/5 max-w-xs h-full bg-white p-6 text-black shadow-lg z-50 flex flex-col gap-6">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={scrollToHero}
                className="flex items-center gap-2 focus:outline-none"
                title="Back to top"
              >
                <img src={logo} alt="Logo" className="h-8 w-auto" />
              </button>
              <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            {navItems.map(({ id, label, onClick }) => (
              <a
                key={`m-${id}`}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  onClick ? onClick() : scrollToId(id)
                }}
              >
                {label}
              </a>
            ))}

            <hr />

            <Link to="/login" onClick={() => setIsOpen(false)} className="text-[#6D9D58] font-semibold">
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar