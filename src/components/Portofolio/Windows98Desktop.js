import React, { useState, useEffect } from 'react';
import { User, Folder, Computer, Mail, Settings, X, Minimize, Square } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Window from './windows98/Window.jsx';
import BootScreen from './BootScreen.js'; 

const Windows98Desktop = ({ setCurrentSection, time }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [taskbarItems, setTaskbarItems] = useState([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [nextZIndex, setNextZIndex] = useState(1001);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Auto-open welcome window on load
  useEffect(() => {
    if (showWelcome) {
      openWindow('welcome');
      setShowWelcome(false);
    }
  }, [showWelcome]);
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this runs once on mount

  const openWindow = (windowType) => {
    const windowId = Date.now();
    const newWindow = {
      id: windowId,
      type: windowType,
      title: getWindowTitle(windowType),
      minimized: false,
      zIndex: nextZIndex
    };
    setOpenWindows([...openWindows, newWindow]);
    setTaskbarItems([...taskbarItems, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter(w => w.id !== windowId));
    setTaskbarItems(taskbarItems.filter(w => w.id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    setOpenWindows(openWindows.map(w =>
      w.id === windowId ? { ...w, minimized: true } : w
    ));
  };

  const restoreWindow = (windowId) => {
    setOpenWindows(openWindows.map(w =>
      w.id === windowId ? { ...w, minimized: false, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const focusWindow = (windowId) => {
    console.log('focusWindow called with ID:', windowId); //delete after
    console.log('Current nextZIndex:', nextZIndex);
    setOpenWindows(prevWindows => {
      const updatedWindows = prevWindows.map(window => {
        if (window.id === windowId) {
          console.log(`Updating window ${windowId} z-index from ${window.zIndex} to ${nextZIndex}`);
          return { ...window, zIndex: nextZIndex };
        }
        return window;
      });
      console.log('Updated windows:', updatedWindows);
      return updatedWindows;
    });
    
    setNextZIndex(prev => {
      console.log('Incrementing nextZIndex from', prev, 'to', prev + 1);
      return prev + 1;
    });
  };

  const getWindowTitle = (type) => {
    const titles = {
      about: 'About Fernando Murra Vicario',
      projects: 'My Projects',
      skills: 'Technical Skills',
      contact: 'Contact Information',
      welcome: 'Welcome to My Portfolio'
    };
    return titles[type] || 'Window';
  };

  const renderWindowContent = (type) => {
    switch (type) {
      case 'welcome':
        return (
          <div className="p-4 space-y-4 pixelated" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2" style={{ color: '#000080' }}>Welcome to My Portfolio!</h2>
                <p className="text-sm" style={{ color: '#008000' }}>Running on Windows 98 </p>
              </div>
            </div>

            <div 
              className="p-4 border-2 space-y-3"
              style={{
                backgroundColor: '#ffffff',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#dfdfdf',
                borderBottomColor: '#dfdfdf'
              }}
            >
              <h3 className="font-bold text-lg mb-3" style={{ color: '#000080' }}>📁 What's Inside This Portfolio?</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-3">
                  <span className="w-6 text-center">👤</span>
                  <div>
                    <strong>About Me:</strong> Learn about my background, experience, and passion for development
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="w-6 text-center">🛠️</span>
                  <div>
                    <strong>Skills:</strong> My technical expertise with progress bars
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="w-6 text-center">💼</span>
                  <div>
                    <strong>Projects:</strong> Some of my repos 
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="w-6 text-center">📧</span>
                  <div>
                    <strong>Contact:</strong> Get in touch for opportunities and collaborations
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="w-6 text-center">⚡</span>
                  <div>
                    <strong>Terminal:</strong> Access my retro command-line interface
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="p-3 border-2"
              style={{
                backgroundColor: '#ffffcc',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#dfdfdf',
                borderBottomColor: '#dfdfdf'
              }}
            >
              <p className="text-xs">
                <strong>Tip:</strong> Don't forget to click the <strong>"Start"</strong> button in the taskbar! 
              </p>
            </div>

            <div 
              className="p-3 border-2"
              style={{
                backgroundColor: '#e6f3ff',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#dfdfdf',
                borderBottomColor: '#dfdfdf'
              }}
            >
              <p className="text-sm">
                <strong>Why Windows 98 Theme?</strong><br/>
                This retro interface represents a nostalgic tribute to one of the most iconic operating systems of all time.
              </p>
            </div>

            <div className="flex space-x-2 justify-center">
              <button 
                onClick={() => openWindow('about')}
                className="px-4 py-2 text-sm border-2"
                style={{
                  backgroundColor: '#c0c0c0',
                  borderTopColor: '#dfdfdf',
                  borderLeftColor: '#dfdfdf',
                  borderRightColor: '#808080',
                  borderBottomColor: '#808080'
                }}
              >
              About Me
              </button>
              <button 
                onClick={() => closeWindow(openWindows.find(w => w.type === 'welcome')?.id)}
                className="px-4 py-2 text-sm border-2"
                style={{
                  backgroundColor: '#c0c0c0',
                  borderTopColor: '#dfdfdf',
                  borderLeftColor: '#dfdfdf',
                  borderRightColor: '#808080',
                  borderBottomColor: '#808080'
                }}
              >
                Close 
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
                <img 
                  src="img/headshot-1.jpeg" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-2" style={{ color: '#000080' }}>About Me</h2>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> Fernando Murra Vicario</p>
                  <p><strong>Title:</strong> Full Stack Developer</p>
                  <p><strong>Location:</strong> San Antonio, TX</p>
                  <p><strong>Experience:</strong> 3+ years</p>
                </div>
              </div>
            </div>
            <div 
              className="p-3 border-2"
              style={{
                backgroundColor: '#ffffff',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#dfdfdf',
                borderBottomColor: '#dfdfdf'
              }}
            >
              <p className="text-sm leading-relaxed">
                Developer with expertise in CyberSecurity, Software Development & Data Analytics. 
                I love creating solutions and bringing ideas to life through code. 
                When I'm not coding, you can find me on the soccer pitch or on the beach.
              </p>
            </div>

            {/* Social Links Section */}
            <div 
              className="p-3 border-2"
              style={{
                backgroundColor: '#e6f3ff',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#dfdfdf',
                borderBottomColor: '#dfdfdf'
              }}
            >
              <h4 className="font-bold text-sm mb-2">Connect with me:</h4>
              <div className="flex space-x-3">
                <a 
                  href="https://linkedin.com/in/fernando-murra-vicario-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-1 text-xs border-2 hover:bg-blue-100"
                  style={{
                    backgroundColor: '#c0c0c0',
                    borderTopColor: '#dfdfdf',
                    borderLeftColor: '#dfdfdf',
                    borderRightColor: '#808080',
                    borderBottomColor: '#808080'
                  }}
                >
                  <FaLinkedin className="w-3 h-3 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/F-MurraVicario13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-1 text-xs border-2 hover:bg-gray-100"
                  style={{
                    backgroundColor: '#c0c0c0',
                    borderTopColor: '#dfdfdf',
                    borderLeftColor: '#dfdfdf',
                    borderRightColor: '#808080',
                    borderBottomColor: '#808080'
                  }}
                >
                  <FaGithub className="w-3 h-3 text-gray-800" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div className="flex space-x-2">
              <a 
                href="/Resume.pdf"
                className="px-3 py-1 text-xs border-2"
                style={{
                  backgroundColor: '#c0c0c0',
                  borderTopColor: '#dfdfdf',
                  borderLeftColor: '#dfdfdf',
                  borderRightColor: '#808080',
                  borderBottomColor: '#808080'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
              <a 
                href="/Resume.pdf"
                download="Resume.pdf"
                className="px-3 py-1 text-xs border-2"
                style={{
                  backgroundColor: '#c0c0c0',
                  borderTopColor: '#dfdfdf',
                  borderLeftColor: '#dfdfdf',
                  borderRightColor: '#808080',
                  borderBottomColor: '#808080'
                }}
              >
                Download CV
              </a>
            </div>
          </div>
        );
      
      case 'skills':
        return (
          <div className="p-4 space-y-4 pixelated" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            <h3 className="font-bold mb-4 text-lg" style={{ color: '#000080' }}>Technical Skills</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="p-3 border-2"
                style={{
                  backgroundColor: '#ffffff',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf'
                }}
              >
                <h4 className="font-bold text-sm mb-2">Frontend</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span>React.js</span>
                    <div className="w-16 h-3 bg-gray-300 border">
                      <div className="w-4/6 h-full bg-blue-600"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>JavaScript</span>
                    <div className="w-16 h-3 bg-gray-300 border">
                      <div className="w-4/6 h-full bg-green-600"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>TypeScript</span>
                    <div className="w-16 h-3 bg-gray-300 border">
                      <div className="w-4/5 h-full bg-yellow-600"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>HTML/CSS</span>
                    <div className="w-16 h-3 bg-gray-300 border">
                      <div className="w-5/6 h-full bg-orange-600"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="p-3 border-2"
                style={{
                  backgroundColor: '#ffffff',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf'
                }}
              >
                <h4 className="font-bold text-sm mb-2">Backend</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span>Node.js</span>
                    <div className="w-16 h-3 bg-gray-300 border">
                      <div className="w-5/6 h-full bg-green-600"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Python</span>
                    <div className="w-16 h-3 bg-gray-300 border">
                      <div className="w-4/5 h-full bg-blue-600"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Express</span>
                    <div className="w-16 h-3 bg-gray-300 border">
                      <div className="w-3/5 h-full bg-purple-600"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SQL</span>
                    <div className="w-16 h-3 bg-gray-300 border">
                      <div className="w-3/4 h-full bg-green-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="p-3 border-2"
              style={{
                backgroundColor: '#ffffff',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#dfdfdf',
                borderBottomColor: '#dfdfdf'
              }}
            >
              <h4 className="font-bold text-sm mb-2">Tools & Technologies</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-200 border text-center">Git</span>
                <span className="px-2 py-1 bg-blue-200 border text-center">Docker</span>
                <span className="px-2 py-1 bg-green-200 border text-center">AWS</span>
                <span className="px-2 py-1 bg-yellow-200 border text-center">VS Code</span>
                <span className="px-2 py-1 bg-purple-200 border text-center">Postman</span>
                <span className="px-2 py-1 bg-red-200 border text-center">Linux</span>
              </div>
            </div>

            <div 
              className="p-3 border-2"
              style={{
                backgroundColor: '#ffffcc',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#dfdfdf',
                borderBottomColor: '#dfdfdf'
              }}
            >
              <p className="text-xs">
                <strong>Fun Fact:</strong> I know how to sail which may sound lame but it's actually pretty cool! 
              </p>
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="p-4 space-y-4 pixelated" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            <h3 className="font-bold mb-4 text-lg" style={{ color: '#000080' }}>My Projects</h3>
            
            <div className="space-y-3">
              <div 
                className="p-3 border-2 flex items-start space-x-3"
                style={{
                  backgroundColor: '#ffffff',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf'
                }}
              >
                <div className="flex-1">
                  <h4 className="font-bold text-sm">GroupChat</h4>
                  <p className="text-xs text-gray-600 mb-2">Made a GroupChat using Python for Backend and HTML for the frontend</p>
                  <div className="flex space-x-1 mb-2">
                    <span className="px-2 py-1 text-xs bg-blue-200 border">HTML</span>
                    <span className="px-2 py-1 text-xs bg-green-200 border">Python</span>
                    <span className="px-2 py-1 text-xs bg-purple-200 border">APIs</span>
                  </div>
                  <img 
                    src="img/project_1.png" 
                    alt="GroupChat preview"
                    className="max-w-md mx-auto h-auto object-cover rounded mb-2 border"
                  />
                  <a 
                    href="https://github.com/F-MurraVicario13/GroupChat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-blue-600 underline hover:text-blue-800"
                  >
                    <FaGithub className="w-3 h-3" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>

              <div 
                className="p-3 border-2 flex items-start space-x-3"
                style={{
                  backgroundColor: '#ffffff',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf'
                }}
              >
                <div className="flex-1">
                  <h4 className="font-bold text-sm">Genie Chrome Extension</h4>
                  <p className="text-xs text-gray-600 mb-2">Chrome Extension that helps write Cold Emails</p>
                  <div className="flex space-x-1 mb-2">
                    <span className="px-2 py-1 text-xs bg-blue-200 border">Gemini</span>
                    <span className="px-2 py-1 text-xs bg-orange-200 border">JavaScript</span>
                    <span className="px-2 py-1 text-xs bg-red-200 border">Render</span>
                  </div>
                  <div className="flex space-x-2 mb-2">
                    <img 
                      src="img/project_2.png" 
                      alt="Genie Chrome Extension preview"
                      className="max-w-md mx-auto h-auto max-h-64 object-cover rounded border"
                    />
                    <img 
                      src="img/project_2_1.png" 
                      alt="project 2"
                      className="max-w-md mx-auto h-auto max-h-64 object-cover rounded border"
                    />
                  </div>
                  <a 
                    href="https://github.com/F-MurraVicario13/Genie" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-blue-600 underline hover:text-blue-800"
                  >
                    <FaGithub className="w-3 h-3" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>

              <div 
                className="p-3 border-2 flex items-start space-x-3"
                style={{
                  backgroundColor: '#ffffff',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf'
                }}
              >
                <div className="flex-1">
                  <h4 className="font-bold text-sm">BatteryFinder</h4>
                  <p className="text-xs text-gray-600 mb-2">An app that quickly identifies the exact replacement batteries you need for any device by scanning or searching model numbers in seconds.</p>
                  <div className="flex space-x-1 mb-2">
                    <span className="px-2 py-1 text-xs bg-yellow-200 border">React Native</span>
                    <span className="px-2 py-1 text-xs bg-green-200 border">Node.js</span>
                    <span className="px-2 py-1 text-xs bg-blue-200 border">Supabase</span>
                  </div>
                  <img 
                    src="img/project_3.png" 
                    alt="BatteryFinder preview"
                    className="w-full h-auto rounded mb-2 border"
                  />
                  <a 
                    href="https://github.com/F-MurraVicario13/BatteryFinder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-blue-600 underline hover:text-blue-800"
                  >
                    <FaGithub className="w-3 h-3" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="p-4 space-y-4 pixelated" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            <h3 className="font-bold mb-4 text-lg" style={{ color: '#000080' }}>Contact Information</h3>
            
            <div className="space-y-3">
              <div 
                className="p-3 border-2"
                style={{
                  backgroundColor: '#ffffff',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf'
                }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="w-4 h-4" />
                  <strong className="text-sm">Email</strong>
                </div>
                <p className="text-sm ml-7">fmuvic13@gmail.com</p>
              </div>

              <div 
                className="p-3 border-2"
                style={{
                  backgroundColor: '#ffffff',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf'
                }}
              >
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

              <div 
                className="p-3 border-2"
                style={{
                  backgroundColor: '#ffffff',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf'
                }}
              >
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

              <div 
                className="p-3 border-2"
                style={{
                  backgroundColor: '#ffffcc',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf'
                }}
              >
                <p className="text-xs">
                  <strong>Available for:</strong> Freelance projects, full-time opportunities, 
                  and collaborative ventures. Let's build something amazing together!
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <a href="mailto:fmuvic13@gmail.com">
                <button 
                  className="px-3 py-1 text-xs border-2"
                  style={{
                    backgroundColor: '#c0c0c0',
                    borderTopColor: '#dfdfdf',
                    borderLeftColor: '#dfdfdf',
                    borderRightColor: '#808080',
                    borderBottomColor: '#808080'
                  }}
                >
                  Send Email
                </button>
              </a>
              <a 
                href="https://linkedin.com/in/fernando-murra-vicario-/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button 
                  className="flex items-center space-x-1 px-3 py-1 text-xs border-2"
                  style={{
                    backgroundColor: '#c0c0c0',
                    borderTopColor: '#dfdfdf',
                    borderLeftColor: '#dfdfdf',
                    borderRightColor: '#808080',
                    borderBottomColor: '#808080'
                  }}
                >
                  <FaLinkedin className="w-3 h-3 text-blue-600" />
                  <span>Connect</span>
                </button>
              </a>
            </div>
          </div>
        );
      
      default:
        return <div className="p-4">Window content</div>;
    }
  };

  return (
    <>
      {/* Add pixelated styling to the entire page */}
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
          backgroundPosition: 'center',
          imageRendering: 'pixelated'
        }}
      >
        {/* Desktop Icons */}
        <div className="absolute top-4 left-4 space-y-4">
          <div onClick={() => openWindow('about')} className="flex flex-col items-center cursor-pointer p-2 hover:bg-blue-200 hover:bg-opacity-30 rounded pixelated">
            <User className="w-8 h-8 text-white mb-1" />
            <span className="text-white text-xs text-center font-bold" style={{ textShadow: '1px 1px 0px #000' }}>About Me</span>
          </div>
          <div onClick={() => openWindow('projects')} className="flex flex-col items-center cursor-pointer p-2 hover:bg-blue-200 hover:bg-opacity-30 rounded pixelated">
            <Folder className="w-8 h-8 text-white mb-1" />
            <span className="text-white text-xs text-center font-bold" style={{ textShadow: '1px 1px 0px #000' }}>Projects</span>
          </div>
          <div onClick={() => openWindow('skills')} className="flex flex-col items-center cursor-pointer p-2 hover:bg-blue-200 hover:bg-opacity-30 rounded pixelated">
            <Computer className="w-8 h-8 text-white mb-1" />
            <span className="text-white text-xs text-center font-bold" style={{ textShadow: '1px 1px 0px #000' }}>Skills</span>
          </div>
          <div onClick={() => openWindow('contact')} className="flex flex-col items-center cursor-pointer p-2 hover:bg-blue-200 hover:bg-opacity-30 rounded pixelated">
            <Mail className="w-8 h-8 text-white mb-1" />
            <span className="text-white text-xs text-center font-bold" style={{ textShadow: '1px 1px 0px #000' }}>Contact</span>
          </div>
          <div onClick={() => setCurrentSection('terminal')} className="flex flex-col items-center cursor-pointer p-2 hover:bg-blue-200 hover:bg-opacity-30 rounded pixelated">
            <Settings className="w-8 h-8 text-white mb-1" />
            <span className="text-white text-xs text-center font-bold" style={{ textShadow: '1px 1px 0px #000' }}>Terminal</span>
          </div>
        </div>

        {/* Start Menu */}
        {showStartMenu && (
          <div 
            className="absolute bottom-8 left-0 w-64 border-2 shadow-lg pixelated"
            style={{
              backgroundColor: '#c0c0c0',
              borderTopColor: '#dfdfdf',
              borderLeftColor: '#dfdfdf',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              zIndex: 9999
            }}
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
            
            <div className="p-2 space-y-1">
              <div 
                onClick={() => { openWindow('about'); setShowStartMenu(false); }}
                className="flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm"
                style={{ fontFamily: 'monospace' }}
              >
                <span className="w-4">👤</span>
                <span>About Me</span>
              </div>
              
              <div 
                onClick={() => { openWindow('projects'); setShowStartMenu(false); }}
                className="flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm"
                style={{ fontFamily: 'monospace' }}
              >
                <span className="w-4">💼</span>
                <span>My Projects</span>
              </div>
              
              <div 
                onClick={() => { openWindow('skills'); setShowStartMenu(false); }}
                className="flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm"
                style={{ fontFamily: 'monospace' }}
              >
                <span className="w-4">🛠️</span>
                <span>Technical Skills</span>
              </div>
              
              <div 
                onClick={() => { openWindow('contact'); setShowStartMenu(false); }}
                className="flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm"
                style={{ fontFamily: 'monospace' }}
              >
                <span className="w-4">📧</span>
                <span>Contact Info</span>
              </div>
              
              <hr style={{ borderColor: '#808080', margin: '4px 0' }} />
              
              <div 
                onClick={() => { setCurrentSection('terminal'); setShowStartMenu(false); }}
                className="flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm"
                style={{ fontFamily: 'monospace' }}
              >
                <span className="w-4">⚡</span>
                <span>Terminal</span>
              </div>
              
              <hr style={{ borderColor: '#808080', margin: '4px 0' }} />
              
              {/* Easter Egg Button */}
              <div 
                onClick={() => {
                  setShowStartMenu(false);
                  // Play the Windows 98 startup sound effect 
                  const audio = new Audio('/o98.wav');
                  audio.play().catch(() => console.log('Audio file not found'));
                  
                  // Show nostalgic alert
                  setTimeout(() => {
                    alert(` EASTER EGG \n\n` +
                          `HELLO WELCOME TO MY SECRET\n` +
                          `If this is a recruiter, please hire me I need a job\n` +
                          `If this is Daniel, then you chopped \n` +
                          `Now get back to browsing`);
                  }, 500);
                }}
                className="flex items-center space-x-2 p-2 hover:bg-green-600 hover:text-white cursor-pointer text-sm font-bold"
                style={{ 
                  fontFamily: 'monospace',
                  backgroundColor: '#ffff99'
                }}
              >
                <span className="w-4">🎁</span>
                <span>??? Mystery Box</span>
              </div>
              
              <hr style={{ borderColor: '#808080', margin: '4px 0' }} />
              
              <div 
                className="flex items-center space-x-2 p-2 hover:bg-red-600 hover:text-white cursor-pointer text-sm"
                style={{ fontFamily: 'monospace' }}
                onClick={() => {
                  if (window.confirm('Are you sure you want to shut down?')) {
                    alert('Bruh, this is a website, not a computer');
                  }
                  setShowStartMenu(false);
                }}
              >
                <span className="w-4">🔌</span>
                <span>Shut Down...</span>
              </div>
            </div>
          </div>
        )}

        {/* Open Windows */}
        {openWindows.filter(w => !w.minimized).map((window) => (
  <Window
    key={window.id}
    window={window}
    closeWindow={closeWindow}
    minimizeWindow={minimizeWindow}
    restoreWindow={restoreWindow}
    focusWindow={focusWindow} // Make sure this line is included
    renderContent={renderWindowContent}
  />
))}
      

        {/* Click outside to close start menu */}
        {showStartMenu && (
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowStartMenu(false)}
          />
        )}

        {/* Taskbar */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-8 flex items-center px-2 pixelated"
          style={{
            backgroundColor: '#c0c0c0',
            borderTop: '1px solid #dfdfdf',
            borderBottom: '1px solid #808080'
          }}
        >
          <button 
            onClick={() => setShowStartMenu(!showStartMenu)}
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
              onClick={() => item.minimized ? restoreWindow(item.id) : minimizeWindow(item.id)} 
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