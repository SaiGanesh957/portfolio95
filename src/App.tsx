import { useState, useEffect, useRef, Suspense } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import {
  Sun,
  Moon,
  ChevronDown,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Menu,
  X,
} from "lucide-react";

// magic ui
import SparklesText from "@/components/ui/sparkles-text";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

// Utility function for class names
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

// Projects data
const projects = [
  {
    id: 1,
    title: "PBK ARTS",
    description: "Responsive website for my incredibly talented brother",
    image: "pbk1.jpeg",
    category: "Web Development",
    tech: "Vite.js, React.js, Tailwind CSS",
  },
  {
    id: 2,
    title: "STAY GOLD REAL-ESTATE",
    description: "Digital helper for renting rooms",
    image: "sg2.png",
    category: "Full-Stack Development",
    tech: "Angular, Oracle DB, Node.js, Express.js",
  },
  {
    id: 3,
    title: "PLUG AND POWER",
    description: "Innovative plug-and-play power solutions for roads",
    image: "ibm.jpeg",
    category: "Full-Stack Web Development",
    tech: "Python, Flask, IBM Db2, Docker",
  },
  {
    id: 4,
    title: "BLOOD BANK PROJECT",
    description: "Platform connecting blood donors with those in need",
    image: "bb3.png",
    category: "Web Development",
    tech: "Python, HTML5, CSS, JavaScript, XAMPP",
  },
  {
    id: 5,
    title: "Car Landing Page With Figma",
    description: "Car Landing Page",
    image: "car2.png",
    category: "Web Design",
    tech: "Figma,UI/UX",
  },
  {
    id: 6,
    title: "3D parallax website",
    description: "3D Car Landing page",
    image: "morflax-studio.png",
    category: "Web Design",
    tech: "Figma,UI/UX",
  },
];

// Skills data
const skills = [
  { name: "Python", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "React", level: 80 },
  { name: "Angular", level: 75 },
  { name: "Node.js", level: 80 },
  { name: "MongoDB", level: 70 },
];

// Experiences data
const experiences = [
  {
    role: "Machine Learning Intern",
    company: "SKILLDZIRE",
    period: "May 2024 - July 2024",
  },
  {
    role: "Full-Stack Web Developer Intern",
    company: "SLASHMARK",
    period: "Nov 2023 - Feb 2024",
  },
  {
    role: "Cyber Security Intern",
    company: "SUPRAJA TECHNOLOGIES",
    period: "Jun 2023 - Jul 2023",
  },
];

// Education data
const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Narasaraopet Engineering College",
    period: "2021 - 2025",
  },
  {
    degree: "Intermediate Education",
    institution: "Bhavana Jr College",
    period: "2019 - 2021",
  },
  {
    degree: "Secondary School Education",
    institution: "Z.P High School",
    period: "2018 - 2019",
  },
];

// Certifications data
const certifications = [
  "MongoDB Atlas Administrator Path - MongoDB",
  "Enterprise Design Thinking Practitioner - IBM",
  "Introduction to MongoDB for Students - MongoDB",
  "Machine Learning with Python - edX",
  "Digital Skills: User Experience - Accenture",
  "Data Science and Machine Learning Capstone Project - edX",
];

// Awards data
const awards = [
  "1st Prize in Machine Learning Hackathon at Narasaraopet Engineering College",
  "1st Prize in rigorous web development contest",
  "3rd Prize in Web Design competition at Jubilation 2K23",
];

// Developer quotes for marquee
const developerQuotes = [
  "I don't create a website, I create an experience for users.",
  "Good code is its own best documentation.",
  "Fight For It,or Don't Cry For It .",
  "Every line of code should appear to be written by a single person.",
  "Simplicity is the soul of efficiency.",
];

// Navbar component
const Navbar = ({
  theme,
  toggleTheme,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header
      className={cn(
        "fixed top-1 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-opacity-90 backdrop-blur-md shadow-md" : "bg-opacity-20"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="#"
              className="text-xl sm:text-2xl font-bold font-speedbeast"
            >
              PSG
            </a>
          </motion.div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {[
                "About",
                "Skills",
                "Projects",
                "Experience",
                "Education",
                "Contact",
              ].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-gray-300 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <motion.button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full transition-colors duration-300 mr-2",
                theme === "dark"
                  ? "bg-gray-800 text-white-400"
                  : "bg-gray-200 text-gray-800"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>
            <motion.button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={cn(
                "px-2 pt-2 pb-3 space-y-1 sm:px-3",
                theme === "dark" ? "bg-black" : "bg-white"
              )}
            >
              {[
                "About",
                "Skills",
                "Projects",
                "Experience",
                "Education",
                "Contact",
              ].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 rounded-md font-speedbeast text-base font-medium hover:bg-gray-700 hover:text-white transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// SwirlCursor component
const SwirlCursor = () => {
  const [cursorTrail, setCursorTrail] = useState<
    { x: number; y: number; id: number; rotation: number }[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    setCursorTrail((prevTrail) => {
      const newPosition = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
        rotation: Math.random() * 360,
      };
      return [newPosition, ...prevTrail.slice(0, 19)]; // Keep last 20 positions
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isClient) {
    return null; // Return null on server-side
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {cursorTrail.map((cursor, index) => (
          <motion.div
            key={cursor.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5, rotate: cursor.rotation }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: cursor.x,
              top: cursor.y,
              transform: `translate(-50%, -50%) rotate(${cursor.rotation}deg)`,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: 1 - index * 0.05, // Fade out based on position in the trail
                color: `hsl(${index * 20}, 100%, 50%)`, // Change color based on position
              }}
            >
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              <path d="M13 13l6 6" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Skill bar component
const SkillBar = ({
  skill,
  index,
  theme,
}: {
  skill: { name: string; level: number };
  index: number;
  theme: "dark" | "light";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="text-lg font-semibold">{skill.name}</span>
        <span className="text-lg font-bold">{skill.level}%</span>
      </div>
      <div
        className={cn(
          "h-3 rounded-full overflow-hidden",
          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
        )}
      >
        <motion.div
          className={cn("h-full", theme === "dark" ? "bg-white" : "bg-black")}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

// Marquee component
const Marquee = ({
  items,
  theme,
}: {
  items: string[];
  theme: "dark" | "light";
}) => {
  return (
    <div className="overflow-hidden py-4 bg-opacity-20 backdrop-blur-md">
      <motion.div
        className="whitespace-nowrap"
        animate={{ x: [0, -2000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {items.map((item, index) => (
          <span
            key={index}
            className={cn(
              "text-xl font-semibold mx-8",
              theme === "dark" ? "text-white" : "text-black"
            )}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// 3D Text component
const AnimatedText3D = ({ text }: { text: string }) => {
  const textRef = useRef<any>();
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.x = Math.sin(clock.elapsedTime) * 0.2;
      textRef.current.rotation.y = Math.sin(clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Text
      ref={textRef}
      fontSize={1}
      maxWidth={10}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="/fonts/Inter-Bold.woff"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
};

// Main portfolio component
const EnhancedAnimatedPortfolio = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={cn(
        "min-h-screen font-sans transition-colors duration-300",
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <SwirlCursor />
      <motion.div
        className={cn(
          "fixed top-0 left-0 right-0 h-1 origin-left z-50",
          theme === "dark" ? "bg-white" : "bg-black"
        )}
        style={{ scaleX }}
      />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="font-geist pt-16 sm:pt-20">
        <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img
              src="panter psg2.png"
              alt="SaiGanesh Ponnaganti"
              className="w-full h-full object-cover opacity-90"
            />
          </motion.div>

          <SparklesText text="SaiGanesh Ponnaganti" />
          <SparklesText text="Full-Stack Web Developer" />

          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "mt-10 px-8 py-3 rounded-full text-xl font-semibold transition-colors relative z-10",
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            )}
          >
            Explore My Work
          </motion.a>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 2,
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-8 z-10"
          >
            <ChevronDown className="w-10 h-10" />
          </motion.div>
          <div className="absolute inset-0 -z-10">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <AnimatedText3D text="Welcome" />
              </Suspense>
            </Canvas>
          </div>
        </section>

        <Marquee items={developerQuotes} theme={theme} />

        <VelocityScroll
          text="I Don't Create a Website, I Create an Experience for Users. "
          default_velocity={1}
          className="font-display text-center text-4xl font-bold tracking-[-0.02em] bg-gradient-to-r from-purple-400 to-yellow-400"
        />

<motion.section
  id="about"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="min-h-screen flex items-center justify-center p-8 relative"
>
  <div className="max-w-4xl text-center relative">
   
    <img
      src="Robot3DAnimatedIcon.gif"
      alt="3D Robot Icon"
      width={150}
      className="absolute top-0 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
    />
    <h2 className="text-4xl font-bold mb-8 relative">About Me</h2>
    <p className="text-xl leading-relaxed mb-6">
      I'm a passionate Full-Stack Web Developer with a keen interest in creating innovative solutions. 
      Currently pursuing my B.Tech in Computer Science and Engineering at Narasaraopet Engineering College, 
      I bring a blend of theoretical knowledge and practical skills to every project.
    </p>
    <p className="text-xl leading-relaxed">
      My expertise spans across various technologies, and I'm always eager to learn and adapt to new challenges. 
      With a strong foundation in both front-end and back-end development, I strive to create seamless, 
      user-friendly applications that solve real-world problems.
    </p>
  </div>
</motion.section>

<motion.section
  id="skills"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="min-h-screen flex items-center justify-center p-8 relative "
>
  <div className="max-w-4xl w-full relative">
    <img
      src="Jumping3DIcon.gif"
      alt="Jumping Icon"
      width={100}
      className="absolute top-0 left-1 transform -translate-x-1/2 -translate-y-1/2"
    />
    <h2 className="text-4xl font-bold mb-12 text-center relative">
      Skills & Expertise
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skills.map((skill, index) => (
        <SkillBar
          key={skill.name}
          skill={skill}
          index={index}
          theme={theme}
        />
      ))}
    </div>
  </div>
</motion.section>


<motion.section 
  id="projects"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="min-h-screen p-8 relative"
>
  <img 
    src="RotatingLoading3DIcon.gif" 
    alt="Rotating Icon"
    width={100} 
    className="absolute left-1/3 z-0 top-0" 
  />
  
  <h2 className="text-4xl font-bold mb-16 text-center z-10 relative">
    Featured Projects
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto z-10 relative">
    {projects.map((project, index) => (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className="relative overflow-hidden rounded-lg shadow-lg project-image"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover"
        />
        <motion.div
          className={cn(
            "absolute inset-0 flex flex-col justify-center items-center p-6 text-white",
            theme === "dark"
              ? "bg-black bg-opacity-70"
              : "bg-white bg-opacity-70"
          )}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-center mb-4">{project.description}</p>
          <p className="text-sm mb-4">{project.tech}</p>
          <span
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold",
              theme === "dark"
                ? "bg-white text-black"
                : "bg-black text-white"
            )}
          >
            {project.category}
          </span>
        </motion.div>
      </motion.div>
    ))}
  </div>
</motion.section>

<motion.section
  id="experience"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="min-h-screen flex items-center justify-center p-8 relative"
>
  {/* Background Image */}
  <img 
    src="Abstract3DIcon.gif" 
    alt="3D Abstract Icon" 
    width={450} 
    className="z-0 absolute top-50 left-2/3 transform -translate-x-1/2"
  />
  
  {/* Content Section */}
  <div className="max-w-4xl w-full relative z-10">
    <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
    
    {experiences.map((exp, index) => (
      <motion.div
        key={exp.company}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold">{exp.role}</h3>
        <p className="text-xl">{exp.company}</p>
        <p className="text-lg text-gray-400">{exp.period}</p>
      </motion.div>
    ))}
  </div>
</motion.section>

<motion.section
  id="education"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="min-h-screen flex items-center justify-center p-8 relative"
>
  {/* Background Image */}
  <img 
    src="3dman.png" 
    alt="3D Man" 
    width={500} 
    className="absolute right-40 z-0 top-1/2 transform -translate-y-1/2" 
  />
  
  {/* Content */}
  <div className="max-w-4xl w-full relative z-10">
    <h2 className="text-4xl font-bold mb-12 text-center">Education</h2>
    {education.map((edu, index) => (
      <motion.div
        key={edu.institution}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold">{edu.degree}</h3>
        <p className="text-xl">{edu.institution}</p>
        <p className="text-lg text-gray-400">{edu.period}</p>
      </motion.div>
    ))}
  </div>
</motion.section>


        <motion.section
          id="certifications"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex items-center justify-center p-8"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Certifications & Awards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Certifications</h3>
                <ul className="list-disc list-inside space-y-2">
                  {certifications.map((cert, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {cert}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Awards</h3>
                <ul className="list-disc list-inside space-y-2">
                  {awards.map((award, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {award}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex items-center justify-center p-8"
        >
          <div className="max-w-3xl w-full">
            <h2 className="text-4xl font-bold mb-8 text-center font-geist">
              Contact Me
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xl mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={cn(
                    "w-full p-3 rounded-lg focus:outline-none transition-colors",
                    theme === "dark"
                      ? "bg-gray-800 border-2 border-gray-700 focus:border-white"
                      : "bg-gray-200 border-2 border-gray-300 focus:border-black"
                  )}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xl mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={cn(
                    "w-full p-3 rounded-lg focus:outline-none transition-colors",
                    theme === "dark"
                      ? "bg-gray-800 border-2 border-gray-700 focus:border-white"
                      : "bg-gray-200 border-2 border-gray-300 focus:border-black"
                  )}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xl mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={cn(
                    "w-full p-3 rounded-lg focus:outline-none transition-colors",
                    theme === "dark"
                      ? "bg-gray-800 border-2 border-gray-700 focus:border-white"
                      : "bg-gray-200 border-2 border-gray-300 focus:border-black"
                  )}
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-full p-4 text-xl font-bold rounded-lg transition-colors",
                  theme === "dark"
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                )}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.section>
      </main>

      <footer className="py-8 text-center font-geist">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/6oXhJUD61j90ef9KFaFhQD?utm_source=generator&theme=0"
            width="50%"
            height="250"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        <p>
          &copy; 2023 SaiGanesh Ponnaganti. Crafting innovative web solutions.
        </p>

        <div className="flex justify-center space-x-6 mt-4">
          <motion.a
            href="https://www.instagram.com/saiganesh_957/"
            whileHover={{ scale: 1.1 }}
          >
            <Instagram className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="www.linkedin.com/in/saiganesh-ponnaganti-108b36283"
            whileHover={{ scale: 1.1 }}
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>

          <motion.a href="https://github.com/" whileHover={{ scale: 1.1 }}>
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a href="psg779955@gmail.com" whileHover={{ scale: 1.1 }}>
            <Mail className="w-6 h-6" />
          </motion.a>
        </div>
      </footer>
    </div>
  );
};
export default EnhancedAnimatedPortfolio;