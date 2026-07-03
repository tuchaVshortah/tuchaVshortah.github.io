"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Cloud, Code, Database, ExternalLink, Github, Globe, Linkedin, Mail, Menu, Server, Shield, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const NAV_SECTIONS = ["home", "about", "experience", "projects", "skills", "contact"]

const experience = [
  {
    title: "Cyber Defense Process Architect",
    company: "Kaspi.kz",
    period: "May 2025 – Present",
    location: "Almaty, Kazakhstan",
    description:
      "Review the security architecture and deployment approach of services across hundreds of engineering teams, catching misconfigurations and low-hanging risks before sign-off and hand-off to the Ethical Hacking team. \
      Led on-premise proof-of-concept pilots of Kubernetes security platforms — Luntry and Aqua Security — largely single-handedly, assessing operational fit and trade-offs for the bank. \
      Produce security architecture diagrams for containerized (Kubernetes) workloads and verify network configuration — NAT, VLANs, routing, and IPSec tunnels — on Huawei firewalls during architecture reviews.",
    technologies: ["Security Architecture", "Kubernetes Security", "Aqua Security", "Luntry", "Network Security"],
  },
  {
    title: "DevOps Engineer (Junior → Middle)",
    company: "Institute of Space Engineering and Technologies LLP",
    period: "Feb 2025 – Aug 2025",
    location: "On-site → Remote (part-time)",
    description:
      "Built the organization's CI/CD platform from the ground up, single-handedly — on-premise GitLab CE with Docker-in-Docker runners serving 20+ component repositories, with reusable pipeline templates and a custom approval gate (absent from GitLab CE) that gated releases on manager approval. \
      Configured PostgreSQL replication and logging (2–3 node cluster) and a high-availability RabbitMQ cluster, and authored a custom C passwordcheck module enforcing organizational password policies. \
      Deployed HashiCorp Vault for secrets management and PKI, administered BIND9 DNS, and hardened Linux hosts.",
    technologies: ["PostgreSQL", "RabbitMQ", "GitLab CI", "Vault", "BIND9", "Linux", "Docker", "C"],
  },
  {
    title: "Cloud & DevOps Trainee",
    company: "EPAM Kazakhstan",
    period: "Jul 2024 – Dec 2024",
    location: "Almaty, Kazakhstan",
    description:
      "Built and operated containerized workloads with Docker and Kubernetes across Jenkins, GitLab, and GitHub CI/CD pipelines. \
      Deployed applications to AWS and provisioned infrastructure as code with CloudFormation and Terraform.",
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "CloudFormation", "Jenkins"],
  },
  {
    title: "Cybersecurity Engineer (Intern)",
    company: "Development Bank of Kazakhstan",
    period: "Mar 2023 – May 2023",
    location: "Astana, Kazakhstan",
    description:
      "Conducted network security testing in Python and Rust alongside the bank's security team. \
      Built an ARP-spoofing detection tool in Rust — packaged as a Windows service — that monitors the LAN and forwards alerts to a Syslog server, deployed on machines across the corporate network.",
    technologies: ["Python", "Rust", "Network Security", "Syslog"],
  },
]

const skillGroups = [
  { title: "Cloud & IaC", skills: ["AWS", "Terraform", "AWS CloudFormation"] },
  { title: "Platform / CI-CD", skills: ["Docker", "Kubernetes", "GitLab CI", "Jenkins", "GitHub Actions", "On-prem GitLab & runners"] },
  { title: "Security", skills: ["HashiCorp Vault", "PKI / SSL", "SAST", "Network security", "Password-policy enforcement"] },
  { title: "Languages", skills: ["Python", "Rust", "C", "Bash", "SQL"] },
  { title: "Data & Infra", skills: ["PostgreSQL (replication)", "RabbitMQ (clustering)", "BIND9 DNS", "Linux administration"] },
  { title: "AI", skills: ["LLM agents", "Retrieval-augmented generation", "Knowledge graphs (RDF / SPARQL)", "Applied ML with Python"] },
]

const projects = [
  {
    name: "financial-kg-agent",
    language: "Python",
    url: "https://github.com/tuchaVshortah/financial-kg-agent",
    description: "LLM agent that grounds financial-transaction queries in a knowledge graph — builds an RDF graph, retrieves facts over SPARQL, and injects them into the model with compliance guardrails. Implementation behind the published IEEE research.",
  },
  {
    name: "passwordcheck",
    language: "C",
    url: "https://github.com/tuchaVshortah/passwordcheck",
    description: "PostgreSQL passwordcheck implementation that enforces configurable password policies.",
  },
  {
    name: "arp-spoofing-detector-rs",
    language: "Rust",
    url: "https://github.com/tuchaVshortah/arp-spoofing-detector-rs",
    description: "Detects ARP-spoofing attacks on local or corporate networks, runs as a Windows service, and ships logs to a Syslog-compatible server.",
  },
  {
    name: "puff",
    language: "Python",
    url: "https://github.com/tuchaVshortah/puff",
    description: "Passive subdomain enumeration tool for reconnaissance.",
  },
]

const publications = [
  {
    title: "Investigating Knowledge Graphs for Context-Aware Search in Financial Transactional AI Agents",
    venue: "ICECCO 2026 — indexed in IEEE Xplore",
    date: "2026",
    url: "https://orcid.org/0009-0000-8386-4960",
  },
]

const languages = [
  { name: "English", level: "Fluent (IELTS 7.5)" },
  { name: "Kazakh", level: "Native" },
  { name: "Russian", level: "Fluent" },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    setMounted(true)

    // Update active section on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of NAV_SECTIONS) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        })
      }, 10)
      setActiveSection(sectionId)
      setMobileMenuOpen(false)
    }
  }

  // If not mounted yet, return a simple loading state
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900"></div>
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="fixed w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-50 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Server className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">Nurkanat Baisenkul</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAV_SECTIONS.map((item) => (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => scrollToSection(item)}
                className={`capitalize text-sm font-medium ${
                  activeSection === item
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                }`}
              >
                {item}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => (window.location.href = "/blog")}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
            >
              Blog
            </motion.button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700"
            >
              <div className="container mx-auto px-4 py-2">
                <div className="flex flex-col space-y-3 py-3">
                  {NAV_SECTIONS.map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`capitalize text-sm font-medium py-2 px-3 rounded-md ${
                        activeSection === item
                          ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                  <button
                    onClick={() => (window.location.href = "/blog")}
                    className="text-sm font-medium py-2 px-3 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Blog
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-gray-50/30 dark:from-teal-900/10 dark:to-gray-900/10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 200%" }}
          />
        </div>

        {/* Hero Section */}
        <section id="home" className="min-h-[calc(100vh-6rem)] flex flex-col justify-center py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="order-2 md:order-1"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4">
                <span className="text-teal-600 dark:text-teal-400">Platform</span>, Solutions
                <br />& Security Engineer
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Building secure delivery platforms — CI/CD with integrated SAST, secrets management with HashiCorp Vault, and highly available infrastructure.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => scrollToSection("contact")} className="bg-teal-600 hover:bg-teal-700 text-white">
                  Get in Touch
                </Button>
                <Button
                  onClick={() => scrollToSection("experience")}
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/20"
                >
                  View My Work
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="order-1 md:order-2 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-teal-600 dark:border-teal-400 shadow-xl"
              >
                <img
                  src="/diving.jpg"
                  alt="Nurkanat Baisenkul"
                  width={360}
                  height={360}
                  className="w-full h-full object-cover object-[25%_center]"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 md:mt-24 flex justify-center"
          >
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { icon: <Cloud className="h-8 w-8" />, label: "AWS" },
                { icon: <Server className="h-8 w-8" />, label: "Kubernetes" },
                { icon: <Database className="h-8 w-8" />, label: "CI/CD" },
                { icon: <Shield className="h-8 w-8" />, label: "Security" },
                { icon: <Code className="h-8 w-8" />, label: "IaC" },
              ].map((item, index) => (
                <motion.div key={index} whileHover={{ y: -5 }} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-2">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">About Me</h2>
            <div className="w-20 h-1 bg-teal-600 dark:bg-teal-400 mb-6"></div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
              <div className="grid md:grid-cols-[2fr,3fr] gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Education</h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-teal-600 dark:border-teal-400 pl-4">
                      <p className="text-sm text-teal-600 dark:text-teal-400">2024 – 2026 · Graduated</p>
                      <h4 className="font-medium text-gray-800 dark:text-white">M.Sc. Computer Science</h4>
                      <p className="text-gray-600 dark:text-gray-300">Suleyman Demirel University</p>
                    </div>
                    <div className="border-l-2 border-teal-600 dark:border-teal-400 pl-4">
                      <p className="text-sm text-teal-600 dark:text-teal-400">2021 – 2024</p>
                      <h4 className="font-medium text-gray-800 dark:text-white">B.Sc. Cybersecurity</h4>
                      <p className="text-gray-600 dark:text-gray-300">Astana IT University</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Professional Profile</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    I'm a platform- and security-focused engineer with a cybersecurity background and hands-on DevOps
                    experience hardening enterprise infrastructure.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    I build secure delivery platforms — CI/CD with integrated SAST, secrets management with HashiCorp
                    Vault and PKI, and highly available data and messaging services — and ship open-source security
                    tooling in Rust, C, and Python.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    I'm comfortable across cloud (AWS), infrastructure-as-code, and applied AI — including LLM agents
                    grounded in knowledge graphs, the subject of published IEEE research — and I care about automation,
                    scalable architecture, and reliable, secure systems.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Work Experience</h2>
            <div className="w-20 h-1 bg-teal-600 dark:bg-teal-400 mb-6"></div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                      <p className="text-teal-600 dark:text-teal-400">{job.company}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{job.location}</p>
                    </div>
                    <div className="mt-2 md:mt-0 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {job.period}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Open-Source Projects</h2>
            <div className="w-20 h-1 bg-teal-600 dark:bg-teal-400 mb-6"></div>

            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Github className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white break-all group-hover:text-teal-600 dark:group-hover:text-teal-400">
                    {project.name}
                  </h3>
                  <span className="mt-1 mb-3 inline-block w-fit px-2 py-0.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded text-xs font-medium">
                    {project.language}
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Technical Skills</h2>
            <div className="w-20 h-1 bg-teal-600 dark:bg-teal-400 mb-6"></div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillGroups.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Publications & Languages */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Publications</h3>
                </div>
                <ul className="space-y-3">
                  {publications.map((pub, index) => (
                    <li key={index} className="flex flex-col gap-1">
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 dark:text-white text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400"
                      >
                        {pub.title}
                      </a>
                      <div className="flex justify-between gap-4">
                        <p className="text-gray-500 dark:text-gray-400 text-xs">{pub.venue}</p>
                        <span className="text-xs text-teal-600 dark:text-teal-400 whitespace-nowrap">{pub.date}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Languages</h3>
                </div>
                <ul className="space-y-3">
                  {languages.map((lang, index) => (
                    <li key={index} className="flex justify-between gap-4">
                      <p className="text-gray-800 dark:text-white text-sm font-medium">{lang.name}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Get In Touch</h2>
            <div className="w-20 h-1 bg-teal-600 dark:bg-teal-400 mb-6"></div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Feel free to reach out for collaboration, job opportunities, or just to say hello. The quickest way to
                reach me is by email.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <a
                  href="mailto:nurkanat@nurkanatb.kz"
                  className="flex flex-col items-center text-center gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
                  <span className="text-sm text-gray-800 dark:text-white break-all">nurkanat@nurkanatb.kz</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/nurkanat-baisenkul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <Linkedin className="h-5 w-5" />
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</span>
                  <span className="text-sm text-gray-800 dark:text-white break-all">in/nurkanat-baisenkul</span>
                </a>

                <a
                  href="https://github.com/tuchaVshortah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <Github className="h-5 w-5" />
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">GitHub</span>
                  <span className="text-sm text-gray-800 dark:text-white break-all">tuchaVshortah</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Server className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">Nurkanat Baisenkul</span>
            </div>

            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/nurkanat-baisenkul/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://github.com/tuchaVshortah" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="mailto:nurkanat@nurkanatb.kz" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Nurkanat Baisenkul. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
