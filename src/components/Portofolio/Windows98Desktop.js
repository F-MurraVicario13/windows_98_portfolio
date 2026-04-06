import React, { useEffect, useMemo, useState } from 'react';
import { Computer, FileText, Folder, Mail, Settings, User } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Window from './windows98/Window.jsx';

const retroWindowSurface = {
  backgroundColor: '#ffffff',
  borderTopColor: '#808080',
  borderLeftColor: '#808080',
  borderRightColor: '#dfdfdf',
  borderBottomColor: '#dfdfdf'
};

const retroButtonStyle = {
  backgroundColor: '#c0c0c0',
  borderTopColor: '#dfdfdf',
  borderLeftColor: '#dfdfdf',
  borderRightColor: '#808080',
  borderBottomColor: '#808080'
};

const windowConfig = {
  welcome: {
    title: 'Welcome to My Portfolio',
    width: 520,
    height: 430
  },
  about: {
    title: 'About Fernando Murra Vicario',
    width: 500,
    height: 440
  },
  skills: {
    title: 'Technical Skills',
    width: 540,
    height: 430
  },
  contact: {
    title: 'Contact Information',
    width: 480,
    height: 420
  },
  resume: {
    title: 'Resume Shortcut',
    width: 420,
    height: 300
  },
  groupchat: {
    title: 'Project - GroupChat',
    width: 620,
    height: 500
  },
  genie: {
    title: 'Project - Genie Chrome Extension',
    width: 680,
    height: 520
  },
  supermariodqn: {
    title: 'Project - Super Mario DQN',
    width: 620,
    height: 500
  },
  bookreview: {
    title: 'Project - Book Review',
    width: 600,
    height: 460
  },
  heatmap: {
    title: 'Project - Heat Map',
    width: 600,
    height: 460
  },
  esgpipeline: {
    title: 'Project - ESG Pipeline',
    width: 620,
    height: 480
  }
};

const projectData = {
  groupchat: {
    name: 'GroupChat',
    summary: 'A lightweight chat experience built with a Python backend and an HTML frontend.',
    stack: ['HTML', 'Python', 'APIs'],
    image: '/img/project_1.png',
    github: 'https://github.com/F-MurraVicario13/GroupChat',
    accent: '#d9ecff',
    status: 'ACTIVE',
    notes: [
      'Focused on building end-to-end messaging flows.',
      'Good example of shipping full-stack fundamentals quickly.'
    ]
  },
  genie: {
    name: 'Genie Chrome Extension',
    summary: 'A Chrome extension that helps users draft cold outreach emails faster.',
    stack: ['Gemini', 'JavaScript', 'Render'],
    images: ['/img/project_2.png', '/img/project_2_1.png'],
    github: 'https://github.com/F-MurraVicario13/Genie',
    accent: '#fff0cf',
    status: 'MAINTAINED',
    notes: [
      'Designed around a very direct productivity use case.',
      'Blends browser UX, AI assistance, and deployment work.'
    ]
  },
  supermariodqn: {
    name: 'Super Mario DQN',
    summary: 'A reinforcement learning project focused on training a Deep Q-Network to play Super Mario.',
    stack: ['Python', 'DQN', 'Reinforcement Learning'],
    github: 'https://github.com/F-MurraVicario13/super_mario_DQN',
    accent: '#def7df',
    status: 'RESEARCH',
    notes: [
      'Explores agent training, reward shaping, and game-state decision making.',
      'A strong signal for applied machine learning and experimentation work.'
    ]
  },
  bookreview: {
    name: 'Book Review',
    summary: 'A project centered on reviewing, organizing, and presenting book-related content in a clean workflow.',
    stack: ['Python', 'Data', 'Web App'],
    github: 'https://github.com/F-MurraVicario13/Book-Review',
    accent: '#ffe4d1',
    status: 'ACTIVE',
    notes: [
      'Combines content structure with practical application logic.',
      'Shows product thinking beyond pure algorithm work.'
    ]
  },
  heatmap: {
    name: 'Heat Map',
    summary: 'A visualization-driven project focused on mapping patterns and making dense information easier to read.',
    stack: ['Data Viz', 'Python', 'Analytics'],
    github: 'https://github.com/F-MurraVicario13/heat_map',
    accent: '#f4d9ff',
    status: 'ACTIVE',
    notes: [
      'Built around turning raw data into something visual and interpretable.',
      'Good example of combining analytics with presentation.'
    ]
  },
  esgpipeline: {
    name: 'ESG Pipeline',
    summary: 'A pipeline project for processing ESG-related data in a more structured and repeatable way.',
    stack: ['Python', 'Pipelines', 'Data Engineering'],
    github: 'https://github.com/F-MurraVicario13/esg_pipeline',
    accent: '#d9ecff',
    status: 'PIPELINE',
    notes: [
      'Focuses on automation, data flow, and repeatable processing steps.',
      'Shows engineering discipline beyond frontend presentation.'
    ]
  }
};

const desktopItems = [
  { id: 'about', label: 'About Me', type: 'window', windowType: 'about', icon: User, top: 20, left: 16 },
  { id: 'skills', label: 'Skills', type: 'window', windowType: 'skills', icon: Computer, top: 124, left: 16 },
  { id: 'contact', label: 'Contact', type: 'window', windowType: 'contact', icon: Mail, top: 228, left: 16 },
  { id: 'resume', label: 'Resume', type: 'window', windowType: 'resume', icon: FileText, top: 332, left: 16 },
  { id: 'groupchat', label: 'GroupChat', type: 'window', windowType: 'groupchat', icon: Folder, top: 20, left: 120 },
  { id: 'genie', label: 'Genie', type: 'window', windowType: 'genie', icon: Folder, top: 124, left: 120 },
  { id: 'supermariodqn', label: 'Super Mario DQN', type: 'window', windowType: 'supermariodqn', icon: Folder, top: 228, left: 120 },
  { id: 'bookreview', label: 'Book Review', type: 'window', windowType: 'bookreview', icon: Folder, top: 332, left: 120 },
  { id: 'heatmap', label: 'Heat Map', type: 'window', windowType: 'heatmap', icon: Folder, top: 20, left: 224 },
  { id: 'esgpipeline', label: 'ESG Pipeline', type: 'window', windowType: 'esgpipeline', icon: Folder, top: 124, left: 224 },
  { id: 'terminal', label: 'Terminal', type: 'section', section: 'terminal', icon: Settings, top: 228, left: 224 }
];

const tagColors = ['#d9ecff', '#def7df', '#fff0cf', '#f4d9ff', '#ffe4d1'];

const Windows98Desktop = ({ setCurrentSection }) => {
  const [openWindows, setOpenWindows] = useState([
    {
      id: 1000,
      type: 'welcome',
      title: windowConfig.welcome.title,
      minimized: false,
      zIndex: 1001,
      defaultSize: { width: windowConfig.welcome.width, height: windowConfig.welcome.height }
    }
  ]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(1002);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDesktopItem, setSelectedDesktopItem] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const taskbarItems = useMemo(() => openWindows, [openWindows]);

  const openWindow = (windowType) => {
    const existingWindow = openWindows.find((item) => item.type === windowType);

    if (existingWindow) {
      restoreWindow(existingWindow.id);
      return;
    }

    const config = windowConfig[windowType] || { title: 'Window', width: 450, height: 350 };
    const windowId = Date.now() + Math.floor(Math.random() * 1000);

    setOpenWindows((prev) => [
      ...prev,
      {
        id: windowId,
        type: windowType,
        title: config.title,
        minimized: false,
        zIndex: nextZIndex,
        defaultSize: { width: config.width, height: config.height }
      }
    ]);
    setNextZIndex((prev) => prev + 1);
  };

  const closeWindow = (windowId) => {
    setOpenWindows((prev) => prev.filter((window) => window.id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((window) => (window.id === windowId ? { ...window, minimized: true } : window))
    );
  };

  const restoreWindow = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId ? { ...window, minimized: false, zIndex: nextZIndex } : window
      )
    );
    setNextZIndex((prev) => prev + 1);
  };

  const focusWindow = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId ? { ...window, zIndex: nextZIndex } : window
      )
    );
    setNextZIndex((prev) => prev + 1);
  };

  const launchDesktopItem = (item) => {
    setSelectedDesktopItem(item.id);
    setShowStartMenu(false);

    if (item.type === 'window') {
      openWindow(item.windowType);
      return;
    }

    if (item.type === 'section') {
      setCurrentSection(item.section);
    }
  };

  const renderProjectWindow = (projectKey) => {
    const project = projectData[projectKey];

    if (!project) {
      return <div className="p-4">Project not found.</div>;
    }

    return (
      <div className="p-4 space-y-4 pixelated" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
        <div className="border-2 p-4 space-y-3" style={{ ...retroWindowSurface, backgroundColor: project.accent }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold" style={{ color: '#000080' }}>{project.name}</h3>
              <p className="text-sm mt-1 max-w-xl">{project.summary}</p>
            </div>
            <div
              className="px-3 py-1 text-xs border-2 font-bold"
              style={{ ...retroButtonStyle, minWidth: 'fit-content' }}
            >
              {project.status}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {project.stack.map((tag, index) => (
              <span
                key={tag}
                className="px-2 py-1 border"
                style={{ backgroundColor: tagColors[index % tagColors.length] }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="border-2 p-3 space-y-3" style={retroWindowSurface}>
          <h4 className="font-bold text-sm" style={{ color: '#000080' }}>Project Preview</h4>
          {project.images ? (
            <div className="grid gap-3 md:grid-cols-2">
              {project.images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${project.name} preview ${index + 1}`}
                  className="w-full h-auto border"
                />
              ))}
            </div>
          ) : project.image ? (
            <img src={project.image} alt={`${project.name} preview`} className="w-full h-auto border" />
          ) : (
            <div
              className="border-2 p-6 text-sm"
              style={{ ...retroButtonStyle, backgroundColor: '#f3f3f3' }}
            >
              No screenshot added yet. The repo link is live, and this window acts as the project shortcut inside the desktop.
            </div>
          )}
        </div>

        <div className="grid gap-3 md:grid-cols-[1.3fr_0.9fr]">
          <div className="border-2 p-3" style={retroWindowSurface}>
            <h4 className="font-bold text-sm mb-2" style={{ color: '#000080' }}>Build Notes</h4>
            <div className="space-y-2 text-sm">
              {project.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>

          <div className="border-2 p-3 space-y-3" style={{ ...retroWindowSurface, backgroundColor: '#ffffcc' }}>
            <p className="text-xs">
              <strong>Interaction hint:</strong> Minimize this window, then restore it from the taskbar like a real desktop app.
            </p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3 py-1 text-xs border-2"
              style={retroButtonStyle}
            >
              <FaGithub className="w-3 h-3 text-gray-800" />
              <span>Open GitHub Repo</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderWindowContent = (type) => {
    switch (type) {
      case 'welcome':
        return (
          <div className="p-4 space-y-4 pixelated" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            <div className="space-y-2">
              <h2 className="text-xl font-bold" style={{ color: '#000080' }}>Welcome to My Portfolio</h2>
              <p className="text-sm" style={{ color: '#008000' }}>Windows 98 Edition</p>
            </div>

            <div className="p-4 border-2 space-y-3" style={retroWindowSurface}>
              <h3 className="font-bold text-lg" style={{ color: '#000080' }}>Desktop Tour</h3>
              <div className="space-y-2 text-sm">
                <p><strong>About Me</strong> covers my background and what I enjoy building.</p>
                <p><strong>Skills</strong> shows the stack I use most often.</p>
                <p><strong>Each project</strong> now lives as its own desktop icon, so the portfolio feels more like an operating system.</p>
                <p><strong>Terminal</strong> is still available if you want the command line version.</p>
              </div>
            </div>

            <div className="p-3 border-2" style={{ ...retroWindowSurface, backgroundColor: '#ffffcc' }}>
              <p className="text-xs">
                <strong>Tip:</strong> Single-click an icon to select it. Double-click to open it.
              </p>
            </div>

            <div className="p-3 border-2" style={{ ...retroWindowSurface, backgroundColor: '#e6f3ff' }}>
              <p className="text-sm">
                The whole site is meant to feel like you are browsing a retro desktop instead of a normal portfolio page.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => openWindow('about')} className="px-4 py-2 text-sm border-2" style={retroButtonStyle}>
                Open About Me
              </button>
              <button onClick={() => openWindow('supermariodqn')} className="px-4 py-2 text-sm border-2" style={retroButtonStyle}>
                Open a Project
              </button>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="p-4 space-y-4 pixelated" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            <div className="flex items-start space-x-4">
              <div
                className="w-16 h-16 border-2 flex items-center justify-center"
                style={{
                  backgroundColor: '#008080',
                  borderTopColor: '#00ffff',
                  borderLeftColor: '#00ffff',
                  borderRightColor: '#004040',
                  borderBottomColor: '#004040'
                }}
              >
                <img src="/img/headshot-1.jpeg" alt="Profile" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-2" style={{ color: '#000080' }}>About Me</h2>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> Fernando Murra Vicario</p>
                  <p><strong>Title:</strong> Full Stack Developer</p>
                  <p><strong>Location:</strong> San Antonio, TX</p>
                  <p><strong>Focus:</strong> Software development, cybersecurity, and data analytics</p>
                </div>
              </div>
            </div>

            <div className="p-3 border-2" style={retroWindowSurface}>
              <p className="text-sm leading-relaxed">
                I like building products that are useful, clear, and a little memorable. This portfolio leans into a retro desktop idea,
                but the goal is still straightforward: show the projects I have built and give a better sense of how I think and work.
              </p>
            </div>

            <div className="p-3 border-2" style={{ ...retroWindowSurface, backgroundColor: '#e6f3ff' }}>
              <h4 className="font-bold text-sm mb-2">Outside of coding</h4>
              <p className="text-sm">You will probably find me on a soccer pitch or near the beach.</p>
            </div>

            <div className="p-3 border-2" style={retroWindowSurface}>
              <h4 className="font-bold text-sm mb-2">Connect with me</h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://linkedin.com/in/fernando-murra-vicario-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-1 text-xs border-2"
                  style={retroButtonStyle}
                >
                  <FaLinkedin className="w-3 h-3 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/F-MurraVicario13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-1 text-xs border-2"
                  style={retroButtonStyle}
                >
                  <FaGithub className="w-3 h-3 text-gray-800" />
                  <span>GitHub</span>
                </a>
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs border-2"
                  style={retroButtonStyle}
                >
                  View Resume
                </a>
                <a
                  href="/Resume.pdf"
                  download="Fernando_Murra_Vicario_Resume.pdf"
                  className="px-3 py-1 text-xs border-2"
                  style={retroButtonStyle}
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="p-4 space-y-4 pixelated" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            <h3 className="font-bold text-lg" style={{ color: '#000080' }}>Technical Skills</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="p-3 border-2" style={retroWindowSurface}>
                <h4 className="font-bold text-sm mb-3">Frontend</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center gap-4">
                    <span>React.js</span>
                    <div className="w-24 h-3 bg-gray-300 border"><div className="w-4/5 h-full bg-blue-600" /></div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span>JavaScript</span>
                    <div className="w-24 h-3 bg-gray-300 border"><div className="w-4/5 h-full bg-green-600" /></div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span>TypeScript</span>
                    <div className="w-24 h-3 bg-gray-300 border"><div className="w-3/4 h-full bg-yellow-600" /></div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span>HTML/CSS</span>
                    <div className="w-24 h-3 bg-gray-300 border"><div className="w-5/6 h-full bg-orange-600" /></div>
                  </div>
                </div>
              </div>

              <div className="p-3 border-2" style={retroWindowSurface}>
                <h4 className="font-bold text-sm mb-3">Backend</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center gap-4">
                    <span>Node.js</span>
                    <div className="w-24 h-3 bg-gray-300 border"><div className="w-5/6 h-full bg-green-600" /></div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span>Python</span>
                    <div className="w-24 h-3 bg-gray-300 border"><div className="w-4/5 h-full bg-blue-600" /></div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span>Express</span>
                    <div className="w-24 h-3 bg-gray-300 border"><div className="w-3/5 h-full bg-purple-600" /></div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span>SQL</span>
                    <div className="w-24 h-3 bg-gray-300 border"><div className="w-3/4 h-full bg-green-700" /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-2" style={retroWindowSurface}>
              <h4 className="font-bold text-sm mb-2">Tools & Technologies</h4>
              <div className="grid grid-cols-2 gap-2 text-xs md:grid-cols-3">
                {['Git', 'Docker', 'AWS', 'VS Code', 'Postman', 'Linux'].map((tool, index) => (
                  <span key={tool} className="px-2 py-1 border text-center" style={{ backgroundColor: tagColors[index] }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 border-2" style={{ ...retroWindowSurface, backgroundColor: '#ffffcc' }}>
              <p className="text-xs">
                <strong>Fun Fact:</strong> I know how to sail, which sounds random until it turns into a very useful story.
              </p>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="p-4 space-y-4 pixelated" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            <h3 className="font-bold text-lg" style={{ color: '#000080' }}>Contact Information</h3>

            <div className="space-y-3">
              <div className="p-3 border-2" style={retroWindowSurface}>
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="w-4 h-4" />
                  <strong className="text-sm">Email</strong>
                </div>
                <p className="text-sm ml-7">fmuvic13@gmail.com</p>
              </div>

              <div className="p-3 border-2" style={retroWindowSurface}>
                <div className="flex items-center space-x-3 mb-2">
                  <FaLinkedin className="w-4 h-4 text-blue-600" />
                  <strong className="text-sm">LinkedIn</strong>
                </div>
                <a
                  href="https://linkedin.com/in/fernando-murra-vicario-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm ml-7 text-blue-600 underline hover:text-blue-800"
                >
                  linkedin.com/in/fernando-murra-vicario-/
                </a>
              </div>

              <div className="p-3 border-2" style={retroWindowSurface}>
                <div className="flex items-center space-x-3 mb-2">
                  <FaGithub className="w-4 h-4 text-gray-800" />
                  <strong className="text-sm">GitHub</strong>
                </div>
                <a
                  href="https://github.com/F-MurraVicario13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm ml-7 text-blue-600 underline hover:text-blue-800"
                >
                  github.com/F-MurraVicario13/
                </a>
              </div>

              <div className="p-3 border-2" style={{ ...retroWindowSurface, backgroundColor: '#ffffcc' }}>
                <p className="text-xs">
                  <strong>Available for:</strong> freelance projects, full-time roles, and collaborations that need a builder who likes shipping.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a href="mailto:fmuvic13@gmail.com" className="px-3 py-1 text-xs border-2" style={retroButtonStyle}>
                Send Email
              </a>
              <a
                href="https://linkedin.com/in/fernando-murra-vicario-/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-1 text-xs border-2"
                style={retroButtonStyle}
              >
                <FaLinkedin className="w-3 h-3 text-blue-600" />
                <span>Connect</span>
              </a>
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="p-4 space-y-4 pixelated" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            <div className="p-4 border-2" style={retroWindowSurface}>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#000080' }}>Resume Shortcut</h3>
              <p className="text-sm">
                Open the PDF in a new tab or download it directly from this desktop window.
              </p>
            </div>

            <div className="p-3 border-2 flex flex-wrap gap-2" style={{ ...retroWindowSurface, backgroundColor: '#e6f3ff' }}>
              <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs border-2" style={retroButtonStyle}>
                Open Resume
              </a>
              <a href="/Resume.pdf" download="Fernando_Murra_Vicario_Resume.pdf" className="px-3 py-1 text-xs border-2" style={retroButtonStyle}>
                Download Resume
              </a>
            </div>
          </div>
        );

      case 'groupchat':
      case 'genie':
      case 'supermariodqn':
      case 'bookreview':
      case 'heatmap':
      case 'esgpipeline':
        return renderProjectWindow(type);

      default:
        return <div className="p-4">Window content</div>;
    }
  };

  return (
    <>
      <style>{`
        .pixelated {
          image-rendering: -moz-crisp-edges;
          image-rendering: -webkit-crisp-edges;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }

        .pixelated * {
          image-rendering: -moz-crisp-edges;
          image-rendering: -webkit-crisp-edges;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
      `}</style>

      <div
        className="min-h-screen relative overflow-hidden pixelated"
        style={{
          backgroundColor: '#008080',
          backgroundImage: 'url("/bliss.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={() => {
          setSelectedDesktopItem(null);
          setShowStartMenu(false);
        }}
      >
        {desktopItems.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedDesktopItem === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className="absolute flex w-20 flex-col items-center rounded p-2 text-white"
              style={{
                top: item.top,
                left: item.left,
                backgroundColor: isSelected ? 'rgba(0, 0, 128, 0.45)' : 'transparent',
                outline: isSelected ? '1px dotted rgba(255,255,255,0.8)' : 'none'
              }}
              onClick={(event) => {
                event.stopPropagation();
                setSelectedDesktopItem(item.id);
              }}
              onDoubleClick={(event) => {
                event.stopPropagation();
                launchDesktopItem(item);
              }}
            >
              <Icon className="w-9 h-9 mb-2 drop-shadow-[1px_1px_0_#000]" />
              <span className="text-[11px] text-center font-bold leading-tight" style={{ textShadow: '1px 1px 0 #000' }}>
                {item.label}
              </span>
            </button>
          );
        })}

        <div
          className="absolute top-4 right-4 max-w-xs border-2 p-3 text-xs"
          style={{
            ...retroWindowSurface,
            backgroundColor: 'rgba(255, 255, 204, 0.95)',
            fontFamily: 'monospace'
          }}
        >
          Double-click icons to open windows. Each project is its own desktop shortcut now.
        </div>

        {showStartMenu && (
          <div
            className="absolute bottom-8 left-0 w-72 border-2 shadow-lg pixelated"
            style={{
              backgroundColor: '#c0c0c0',
              borderTopColor: '#dfdfdf',
              borderLeftColor: '#dfdfdf',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              zIndex: 9999
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="p-2 border-b"
              style={{
                background: 'linear-gradient(90deg, #0000ff 0%, #000080 100%)',
                color: 'white',
                fontFamily: 'monospace',
                fontWeight: 'bold'
              }}
            >
              Windows 98 Portfolio
            </div>

            <div className="p-2 space-y-1" style={{ fontFamily: 'monospace' }}>
              {desktopItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => launchDesktopItem(item)}
                  className="flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm"
                >
                  <span>{item.label}</span>
                </div>
              ))}

              <hr style={{ borderColor: '#808080', margin: '4px 0' }} />

              <div
                onClick={() => {
                  setShowStartMenu(false);
                  const audio = new Audio('/o98.wav');
                  audio.play().catch(() => null);

                  setTimeout(() => {
                    alert(
                      'EASTER EGG\n\nHELLO WELCOME TO MY SECRET\nIf this is a recruiter, please hire me I need a job\nIf this is Daniel, then you chopped\nNow get back to browsing'
                    );
                  }, 500);
                }}
                className="flex items-center space-x-2 p-2 hover:bg-green-600 hover:text-white cursor-pointer text-sm font-bold"
                style={{ backgroundColor: '#ffff99' }}
              >
                <span>??? Mystery Box</span>
              </div>

              <div
                className="flex items-center space-x-2 p-2 hover:bg-red-600 hover:text-white cursor-pointer text-sm"
                onClick={() => {
                  if (window.confirm('Are you sure you want to shut down?')) {
                    alert('Bruh, this is a website, not a computer');
                  }
                  setShowStartMenu(false);
                }}
              >
                <span>Shut Down...</span>
              </div>
            </div>
          </div>
        )}

        {openWindows.filter((window) => !window.minimized).map((window) => (
          <Window
            key={window.id}
            window={window}
            closeWindow={closeWindow}
            minimizeWindow={minimizeWindow}
            restoreWindow={restoreWindow}
            focusWindow={focusWindow}
            renderContent={renderWindowContent}
          />
        ))}

        <div
          className="absolute bottom-0 left-0 right-0 h-8 flex items-center px-2 pixelated"
          style={{
            backgroundColor: '#c0c0c0',
            borderTop: '1px solid #dfdfdf',
            borderBottom: '1px solid #808080'
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            onClick={() => setShowStartMenu((prev) => !prev)}
            className="px-3 py-1 text-xs font-bold flex items-center gap-2 mr-2 border pixelated"
            style={{
              backgroundColor: showStartMenu ? '#808080' : '#c0c0c0',
              borderTopColor: showStartMenu ? '#404040' : '#dfdfdf',
              borderLeftColor: showStartMenu ? '#404040' : '#dfdfdf',
              borderRightColor: showStartMenu ? '#dfdfdf' : '#808080',
              borderBottomColor: showStartMenu ? '#dfdfdf' : '#808080',
              color: showStartMenu ? '#fff' : '#000'
            }}
          >
            ⊞ Start
          </button>

          {taskbarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => (item.minimized ? restoreWindow(item.id) : minimizeWindow(item.id))}
              className="px-3 py-1 text-xs mr-1 border pixelated"
              style={{
                backgroundColor: item.minimized ? '#c0c0c0' : '#808080',
                borderTopColor: item.minimized ? '#dfdfdf' : '#404040',
                borderLeftColor: item.minimized ? '#dfdfdf' : '#404040',
                borderRightColor: item.minimized ? '#808080' : '#dfdfdf',
                borderBottomColor: item.minimized ? '#808080' : '#dfdfdf',
                color: item.minimized ? '#000' : '#fff'
              }}
            >
              {item.title}
            </button>
          ))}

          <div
            className="ml-auto text-xs border px-2 py-1 pixelated"
            style={{
              backgroundColor: '#c0c0c0',
              borderTopColor: '#808080',
              borderLeftColor: '#808080',
              borderRightColor: '#dfdfdf',
              borderBottomColor: '#dfdfdf'
            }}
          >
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Windows98Desktop;
