import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const commands = {
  whoami: `Aditya Kumar Singh
DevOps Engineer | Gurugram, India`,
  summary: `DevOps Engineer with 3+ years of experience in automation, CI/CD pipelines, and Azure Cloud migrations.
Skilled in Python, Jenkins, Kubernetes, Terraform, GitHub Actions, and Ansible.`,
  skills: `Languages: Python, Java, C++, Groovy, Bash
Frameworks: FastAPI, Spring Boot
Tools: Jenkins, Docker, Kubernetes, Terraform, Ansible, Prometheus
Cloud: Azure`,
  experience: `Optum (2021–Present)
Role: Associate Software Engineer (DevOps)
• Decommissioned license-heavy deployment tools → Saved $150K/year.
• Built Jenkins & GitHub Actions CI/CD pipelines.
• Migrated multiple apps to Azure → $50K cost optimization.
• Authored Python CLIs to standardize deployments.`,
  certifications: (
    <span>
      Microsoft Certified:{" "}
      <a
        href="https://learn.microsoft.com/en-us/certifications/azure-fundamentals/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Azure Fundamentals (AZ-900)
      </a>
    </span>
  ),
  projects: `ANPR System – Python, YOLOv4, OpenCV
Delivered 93% OCR accuracy.`,
  education: `B.Tech in Computer Science, KIET Group of Institutions (2017–2021)`,
  achievements: `• Cost optimization ~$200K+ via automation
• Jenkinsfile to GitHub Actions converter
• 30% faster deployment time achieved`,
};

const contactJSX = (
  <div>
    <div>
      Email: <a href="mailto:adi06031998@gmail.com">adi06031998@gmail.com</a>
    </div>
    <div>
      Phone: <a href="tel:+918875811269">+91 88758 11269</a>
    </div>
    <div>
      GitHub: <a href="https://github.com/stalord63">github.com/stalord63</a>
    </div>
    <div>
      LinkedIn: <a href="https://linkedin.com/in/aditya-singh-264627203">linkedin.com/in/aditya-singh-264627203</a>
    </div>
  </div>
);

function App() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [exitTerminal, setExitTerminal] = useState(false);

  const handleCommand = (cmd) => {
    const lowerCmd = cmd.toLowerCase();
    if (lowerCmd === "clear") {
      setHistory([]);
      return;
    }
    if (lowerCmd === "contact") {
      setHistory((prev) => [...prev, { cmd, output: contactJSX }]);
      return;
    }
    if (lowerCmd === "exit") {
      setHistory((prev) => [...prev, { cmd, output: "Shutting down..." }]);
      setTimeout(() => setExitTerminal(true), 800); // trigger goodbye display
      return;
    }
    const output = commands[lowerCmd] || `bash: ${cmd}: command not found`;
    setHistory((prev) => [...prev, { cmd, output }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      handleCommand(input.trim());
      setInput("");
    }
  };

  const commandList = Object.keys(commands).concat("contact", "exit");

  return (
    <div>
      <AnimatePresence>
        {!exitTerminal && (
          <motion.div
            className="terminal"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div style={{ marginBottom: "1rem", fontFamily: "monospace" }}>
              <p>Welcome to Aditya's DevOps Portfolio 💻</p>
              <p>Click or type below to explore!</p>
            </div>

            <div className="button-bar">
              {commandList.map((cmd) => (
                <button key={cmd} onClick={() => handleCommand(cmd)}>
                  {cmd}
                </button>
              ))}
            </div>

            <div className="history">
              {history.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.cmd && <span className="prompt">$ {item.cmd}</span>}
                  <pre style={{ whiteSpace: item.output && item.output.type ? "normal" : "pre-wrap" }}>
                    {typeof item.output === "string" ? item.output : ""}
                  </pre>
                  {typeof item.output !== "string" ? item.output : null}
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <span className="prompt">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command..."
                autoFocus
              />
            </form>
          </motion.div>
        )}

        {exitTerminal && (
          <motion.div
            className="goodbye-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              background: "black",
              color: "#00ff00",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              fontFamily: "monospace",
              flexDirection: "column",
            }}
          >
            <div>💻 Terminal Closed</div>
            <div>Goodbye, see you soon! 👋</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
