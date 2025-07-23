import React, { useState, useEffect } from 'react';
import BootScreen from './BootScreen';
import Terminal from './Terminal';
import Windows98Desktop from './Windows98Desktop';
import commands from './commands';


const Portfolio = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [currentSection, setCurrentSection] = useState('boot');
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [terminalLines, setTerminalLines] = useState([]);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [time, setTime] = useState(new Date());

  const bootSteps = [
    'Phoenix BIOS v6.00',
    'Copyright 1985-1998 Phoenix Technologies Ltd.',
    '',
    'Detecting Primary Master... IBM-DTLA-307030',
    'Detecting Primary Slave... None',
    'Detecting Secondary Master... HITACHI DVD-ROM GD-2500',
    'Detecting Secondary Slave... None',
    '',
    'Memory Test: 65536K OK',
    '',
    'Award Modular BIOS v6.0, An Energy Star Ally',
    'Copyright (C) 1984-99, Award Software, Inc.',
    '',
    'AMD Athlon(tm) Processor',
    '    650 MHz Processor',
    '    Bus Clock: 100 MHz',
    '',
    'Press DEL to enter SETUP',
    '',
    'Verifying DMI Pool Data...........',
    'Boot from CD: MSCDEX Version 2.25',
    'OAKCDROM.SYS Version 2.35',
    '',
    'Loading PORTFOLIO.EXE...',
    'Initializing Terminal Interface...',
    <><strong>READY</strong></>
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 2100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const skipTimer = setTimeout(() => {
      if (!bootComplete) setShowSkipButton(true);
    }, 1000);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(cursorInterval);
    };
  }, [bootComplete]);

  useEffect(() => {
    if (currentSection === 'boot') {
      const bootInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < bootSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(bootInterval);
            setTimeout(() => {
              setBootComplete(true);
              setCurrentSection('terminal');
              setTerminalLines([
                'PORTFOLIO OS v1.0 [Built on MS-DOS 6.22]',
                '(C) Copyright 1999-2024 Fernando Murra Industries, Inc.',
                '',
                'Welcome to Portfolio Terminal',
                'Type "/help" for available commands.',
                'Type "/gui" to launch the graphical interface.',
                ''
              ]);
            }, 1500);
            return prev;
          }
        });
      }, 150);

      return () => clearInterval(bootInterval);
    }
  }, [currentSection]);

  const skipToBoot = () => {
    setCurrentStep(bootSteps.length - 1);
  };

  const skipToGUI = () => {
    setCurrentSection('windows98');
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...commandHistory, `C:\\PORTFOLIO> ${cmd}`];

    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]();
      if (result === 'CLEAR') {
        setTerminalLines([]);
        setCommandHistory([]);
        setCurrentCommand('');
        return;
      }
      if (result === 'EXIT') {
        setCurrentSection('boot');
        setBootComplete(false);
        setCurrentStep(0);
        setCommandHistory([]);
        setCurrentCommand('');
        return;
      }
      if (result === 'LAUNCH_GUI') {
        setCurrentSection('windows98');
        return;
      }
      const newLines = [...terminalLines, ...newHistory, '', ...result, ''];
      setTerminalLines(newLines);
    } else if (trimmedCmd === '') {
      setTerminalLines([...terminalLines, ...newHistory]);
    } else {
      const suggestion = trimmedCmd.startsWith('/') ? '' : ' (Try "/help" for available commands)';
      setTerminalLines([...terminalLines, ...newHistory, '', `'${cmd}' is not recognized as an internal or external command.${suggestion}`, '']);
    }

    setCommandHistory([]);
    setCurrentCommand('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    }
  };

  // Conditional renders
  if (!bootComplete) {
    return (
      <BootScreen
        bootSteps={bootSteps}
        currentStep={currentStep}
        showCursor={showCursor}
        showSkipButton={showSkipButton}
        skipToBoot={skipToBoot}
        skipToGUI={skipToGUI}
      />
    );
  }

  if (currentSection === 'terminal') {
    return (
      <Terminal
        terminalLines={terminalLines}
        currentCommand={currentCommand}
        setCurrentCommand={setCurrentCommand}
        handleKeyPress={handleKeyPress}
        setCurrentSection={setCurrentSection}
        time={time}
      />
    );
  }

  return <Windows98Desktop time={time} setCurrentSection={setCurrentSection} />;
};

export default Portfolio;
