# Windows 98 Portfolio

Fernando Murra Vicario's developer portfolio, built as a Windows 98 desktop. Live at **[fernandomurra.com](https://fernandomurra.com/)**.

The site boots with a retro BIOS screen, then drops you onto a desktop where every section and project is an icon. Windows can be dragged, resized, minimized to the taskbar and restored. There is also a terminal mode for anyone who prefers typing.

## Features

- **Boot sequence** with a skip button
- **Retro sounds**: dial-up in the terminal, plus a hidden easter egg in the Start menu
- **Desktop windows** for About Me, Skills, Contact and Resume (opens the PDF)
- **One window per project** with a summary, tech stack, screenshots, build notes and a GitHub link
- **Terminal** (desktop icon) with these commands:

| Command | What it does |
|---|---|
| `/help` | List all commands |
| `/about` | Personal info |
| `/skills` | Technical skills |
| `/projects` | Project list with tech stacks |
| `/contact` | Contact info |
| `/gui` or `/skip` | Back to the desktop |
| `/clear` | Clear the screen |
| `/exit` | Return to the boot screen |

## Projects featured

| Project | What it is | Stack |
|---|---|---|
| [GroupChat](https://github.com/F-MurraVicario13/GroupChat) | Real-time chat room over WebSockets | Python, Flask, Flask-SocketIO |
| [Genie](https://github.com/F-MurraVicario13/Genie) | Chrome extension that turns a LinkedIn profile into a personalized cold email in Gmail | JavaScript, Chrome MV3, Gemini API, Render |
| [Super Mario DQN](https://github.com/F-MurraVicario13/super_mario_DQN) | Deep Q-Network that learns Mario 1-1 from raw pixels | Python, PyTorch, TorchRL, OpenAI Gym |
| [Book Review (Marginalia)](https://github.com/F-MurraVicario13/Book-Review) | Search books, rate and review them, keep a personal shelf | Next.js 14, React, Supabase, Tailwind |
| [Heat Map (CityPulse)](https://github.com/F-MurraVicario13/heat_map) | U.S. metro migration map built from IRS data | React, Leaflet, Supabase, Recharts, Python ETL |
| [ESG Pipeline](https://github.com/F-MurraVicario13/esg_pipeline) | NLP/ML ESG scoring with greenwashing detection | Python, Streamlit, scikit-learn, NLTK, Plotly |

## Tech stack

- React 19 (Create React App)
- Tailwind CSS
- react-rnd for draggable, resizable windows
- lucide-react and react-icons for icons
- Press Start 2P font via Fontsource
- Google Analytics (gtag.js)
- Deployed on Vercel

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

To make a production build in `build/`:

```bash
npm run build
```

## Project structure

```
public/
  index.html          SEO meta tags, structured data, Google Analytics tag
  img/                Project screenshots
  Resume.pdf          Linked from the Resume window
src/components/Portofolio/
  Portfolio.js        Boot sequence and switching between desktop and terminal
  BootScreen.js       BIOS-style boot screen
  Windows98Desktop.js Desktop, icons, windows and project data
  Terminal.js         Terminal UI
  commands.js         Terminal command output
```

## Adding or editing a project

1. Add an entry to `windowConfig` and `projectData` in `Windows98Desktop.js`
2. Add a desktop icon to `desktopItems` in the same file
3. Add it to the `/projects` output in `commands.js`
4. Optional: put screenshots in `public/img/` and reference them with `image` or `images`

## Deployment

Hosted on Vercel as a standard Create React App build: `npm run build`, serving the `build/` folder.
