"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Cloud, Code, Database, Github, Linkedin, Mail, Menu, Server, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Simple direct theme toggle function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    setMounted(true)

    // Handle scroll to update active section
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
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
            <span className="text-xl font-bold text-gray-800 dark:text-white">DevOps Master</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["home", "about", "experience", "skills", "contact"].map((item) => (
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
                  {["home", "about", "experience", "skills", "contact"].map((item) => (
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

      {/* Rest of your component */}
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
                <span className="text-teal-600 dark:text-teal-400">DevOps</span> Engineer
                <br />& Cloud Architect
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Automating infrastructure, optimizing workflows, and building scalable systems.
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
                  alt="My diving picture"
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
                { icon: <Code className="h-8 w-8" />, label: "IaC" },
                { icon: <Database className="h-8 w-8" />, label: "CI/CD" },
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
                      <p className="text-sm text-teal-600 dark:text-teal-400">2020 - 2022</p>
                      <h4 className="font-medium text-gray-800 dark:text-white">Master's in Computer Science</h4>
                      <p className="text-gray-600 dark:text-gray-300">University of Technology</p>
                    </div>
                    <div className="border-l-2 border-teal-600 dark:border-teal-400 pl-4">
                      <p className="text-sm text-teal-600 dark:text-teal-400">2016 - 2020</p>
                      <h4 className="font-medium text-gray-800 dark:text-white">Bachelor's in Computer Engineering</h4>
                      <p className="text-gray-600 dark:text-gray-300">State University</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Professional Profile</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    I'm a DevOps Engineer with a Master's degree and extensive experience in designing, implementing,
                    and managing cloud infrastructure and CI/CD pipelines.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    My expertise includes containerization with Docker, orchestration with Kubernetes, Infrastructure as
                    Code using Terraform and CloudFormation, and implementing robust CI/CD pipelines.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    I'm passionate about automation, scalable architecture, and implementing DevOps best practices to
                    improve development workflows and system reliability.
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
              {[
                {
                  title: "Senior DevOps Engineer",
                  company: "Tech Solutions Inc.",
                  period: "2021 - Present",
                  description:
                    "Led the migration to Kubernetes, reducing deployment time by 70%. Implemented GitOps workflow with ArgoCD and Flux. Designed and maintained AWS infrastructure using Terraform.",
                  technologies: ["AWS", "Kubernetes", "Terraform", "ArgoCD", "GitHub Actions"],
                },
                {
                  title: "DevOps Engineer",
                  company: "Cloud Systems Ltd.",
                  period: "2019 - 2021",
                  description:
                    "Designed and implemented CI/CD pipelines using Jenkins and GitLab CI. Containerized legacy applications and deployed them to EKS. Automated infrastructure provisioning with CloudFormation.",
                  technologies: ["AWS", "Docker", "Jenkins", "CloudFormation", "EKS"],
                },
                {
                  title: "Systems Administrator",
                  company: "Data Networks Corp.",
                  period: "2017 - 2019",
                  description:
                    "Managed on-premises infrastructure and began cloud migration initiatives. Implemented monitoring solutions with Prometheus and Grafana. Automated routine tasks with Ansible.",
                  technologies: ["Linux", "Ansible", "Prometheus", "Grafana", "AWS"],
                },
              ].map((job, index) => (
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
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                      <p className="text-teal-600 dark:text-teal-400">{job.company}</p>
                    </div>
                    <div className="mt-2 md:mt-0 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">
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

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Cloud & Infrastructure</h3>

                {[
                  { name: "AWS", level: 90 },
                  { name: "Kubernetes", level: 85 },
                  { name: "Docker", level: 95 },
                  { name: "Terraform", level: 80 },
                  { name: "Linux", level: 90 },
                ].map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-teal-600 dark:text-teal-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-teal-600 dark:bg-teal-400 h-2.5 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">DevOps & Automation</h3>

                {[
                  { name: "CI/CD Pipelines", level: 90 },
                  { name: "GitOps", level: 85 },
                  { name: "Monitoring & Observability", level: 80 },
                  { name: "Infrastructure as Code", level: 85 },
                  { name: "Security Automation", level: 75 },
                ].map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-teal-600 dark:text-teal-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-teal-600 dark:bg-teal-400 h-2.5 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Tools & Technologies</h3>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {[
                  "AWS",
                  "GCP",
                  "Azure",
                  "Kubernetes",
                  "Docker",
                  "Terraform",
                  "Ansible",
                  "Jenkins",
                  "GitHub Actions",
                  "ArgoCD",
                  "Prometheus",
                  "Grafana",
                  "ELK Stack",
                  "Helm",
                  "Istio",
                  "Vault",
                ].map((tool, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      show: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{
                      y: -5,
                      backgroundColor: theme === "dark" ? "rgb(20, 184, 166, 0.1)" : "rgb(20, 184, 166, 0.05)",
                    }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{tool}</span>
                  </motion.div>
                ))}
              </motion.div>
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
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Contact Information</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Feel free to reach out to me for collaboration, job opportunities, or just to say hello!
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mr-3">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-gray-800 dark:text-white">nurkanat@nurkanatb.kz</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mr-3">
                        <Linkedin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                        <p className="text-gray-800 dark:text-white">linkedin.com/in/nurkanat-baisenkul</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mr-3">
                        <Github className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                        <p className="text-gray-800 dark:text-white">github.com/tuchaVshortah</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Send a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      ></textarea>
                    </div>

                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Send Message</Button>
                  </form>
                </div>
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
              <span className="text-xl font-bold text-gray-800 dark:text-white">DevOps Master</span>
            </div>

            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/nurkanat-baisenkul" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://github.com/tuchaVshortah" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">
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
      {/* ... */}
    </div>
  )
}
