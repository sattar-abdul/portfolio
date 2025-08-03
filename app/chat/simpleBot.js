// simpleBot.js
//update it accordig to your resume

export const botResponses = [
  // General Introduction
  {
    keywords: ["who are you", "about abdul", "introduce", "yourself"],
    answer:
      "Abdul is a passionate computer engineering student skilled in full-stack web development.",
  },

  // Education
  {
    keywords: ["education", "college", "degree", "cgpa"],
    answer:
      "Abdul is pursuing B.E. in Computer Science at BIT Durg with a 9+ CGPA.",
  },

  // Technical Skills
  {
    keywords: ["skills", "tech stack", "technologies", "languages"],
    answer:
      "Abdul works with Java, C, Python, HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, MySQL, and Flask.",
  },

  // Tools & Technologies
  {
    keywords: ["tools", "libraries", "frameworks", "database"],
    answer:
      "He has experience with Git, GitHub, Figma, Postman, VS Code, and vercel.",
  },

  // Projects — WanderLust
  {
    keywords: ["wanderlust", "airbnb"],
    answer:
      "WanderLust is an Airbnb clone built with MERN and EJS. GitHub: https://github.com/sattar-abdul/wanderlust",
  },

  // Projects — Spotify Clone
  {
    keywords: ["spotify", "music clone"],
    answer:
      "Abdul made a Spotify front-end clone using HTML, CSS & JS. GitHub: https://github.com/sattar-abdul/spotify-clone",
  },

  // Projects — Student Feedback System
  {
    keywords: ["feedback system", "student project", "flask feedback"],
    answer:
      "Abdul built a Student Feedback System with Flask, HTML, CSS & MySQL.",
  },

  // Projects — Portfolio Website
  {
    keywords: ["portfolio", "website", "personal site"],
    answer:
      "His portfolio is built using Next.js and Tailwind CSS. GitHub: https://github.com/sattar-abdul/nextjs-portfolio",
  },

  // Internships

  // Training
  {
    keywords: ["training", "railway", "internships"],
    answer:
      "He completed training in 'Telecommunication department' at SECR Railways.",
  },

  // Certifications
  {
    keywords: ["certifications", "courses", "certificates"],
    answer:
      "Abdul has certifications in Python, Web Development, and AI/ML from platforms like Edx",
  },

  // Achievements
  {
    keywords: ["achievements", "awards", "won", "prize"],
    answer:
      "Abdul won 1st prize in Blind Coding at BIT Durg and Voiceflow API prize at Hack The Space 2024.",
  },

  // Languages
  {
    keywords: ["languages known", "language"],
    answer: "Abdul is fluent in English, Hindi, and Bengali.",
  },

  // Contact
  {
    keywords: ["contact", "email", "connect", "linkedin"],
    answer:
      "You can email him at masattar.sunny@gmail.com or connect via LinkedIn: https://www.linkedin.com/in/md-abdul-sattar/",
  },

  // GitHub
  {
    keywords: ["github", "projects", "repos", "code"],
    answer: "Explore his projects at https://github.com/sattar-abdul",
  },
  // Career goals
  {
    keywords: ["future goals", "five years", "career aspirations", "vision"],
    answer:
      "Abdul aims to become a skilled full-stack developer and work on impactful scalable products.",
  },

  //Extra possible queries

  // Strengths
  {
    keywords: [
      "strength",
      "strong point",
      "why hire",
      "what makes you special",
    ],
    answer:
      "Abdul is self-driven, quick to learn, and has a strong grasp of both backend and frontend.",
  },

  // Weakness (safe answer)
  {
    keywords: ["weakness"],
    answer:
      "Abdul tends to be a perfectionist, but it helps him produce high-quality work.",
  },

  // Open to relocate / work
  {
    keywords: ["relocate", "remote", "work from home", "willing to move"],
    answer:
      "Abdul is comfortable with both remote and on-site roles, and open to relocation.",
  },

  // Expected salary
  {
    keywords: ["salary", "ctc", "expectation"],
    answer:
      "Abdul is flexible and prioritizes learning and growth over initial compensation.",
  },

  // Hobbies
  {
    keywords: ["hobbies", "interests", "free time"],
    answer:
      "Abdul enjoys designing sites, Photography, Playing games, and exploring new tech.",
  },

  // Availability
  {
    keywords: ["available", "join", "notice period"],
    answer:
      "Abdul can join immediately as he is currently a student looking for opportunities.",
  },
];

export function getBotReply(userMessage) {
  const msg = userMessage.toLowerCase();
  for (let item of botResponses) {
    for (let key of item.keywords) {
      if (msg.includes(key)) {
        return item.answer;
      }
    }
  }
  return "Sorry, I don't have an answer to that yet.";
}
