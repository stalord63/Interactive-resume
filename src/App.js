import React, { useState, useEffect } from "react";
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
Role: Software Engineer (DevOps)
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

const ContactCard = () => (
  <motion.div
    className="contact-card"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
  >
    <h3>📬 Contact Information</h3>
    <p>
      <strong>Email:</strong>{" "}
      <a href="mailto:adi06031998@gmail.com">adi06031998@gmail.com</a>
    </p>
    <p>
      <strong>Phone:</strong>{" "}
      <a href="tel:+918875811269">+91 88758 11269</a>
    </p>
    <p>
      <strong>GitHub:</strong>{" "}
      <a href="https://github.com/stalord63" target="_blank" rel="noreferrer">
        github.com/stalord63
      </a>
    </p>
    <p>
      <strong>LinkedIn:</strong>{" "}
      <a
        href="https://linkedin.com/in/aditya-singh-264627203"
        target="_blank"
        rel="noreferrer"
      >
        linkedin.com/in/aditya-singh-264627203
      </a>
    </p>
  </motion.div>
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

    // ✅ Each command replaces the previous (tab-like behavior)
    setHistory([]);

    if (lowerCmd === "contact") {
      setHistory([{ cmd, output: <ContactCard /> }]);
      return;
    }

    if (lowerCmd === "resume") {
      const resumeUrl =
        "https://raw.githubusercontent.com/stalord63/Interactive-resume/resume/Aditya_resume.pdf"; // replace with your real resume link

      // Trigger auto-download
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Aditya_Kumar_Singh_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setHistory([
        {
          cmd,
          output: (
            <motion.div
              className="resume-download"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              📄 Resume is being downloaded...
            </motion.div>
          ),
        },
      ]);
      return;
    }

    if (lowerCmd === "exit") {
      setHistory([{ cmd, output: "Shutting down..." }]);
      setTimeout(() => setExitTerminal(true), 800);
      return;
    }

    const output = commands[lowerCmd] || `bash: ${cmd}: command not found`;
    setHistory([{ cmd, output }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      handleCommand(input.trim());
      setInput("");
    }
  };

  const commandList = Object.keys(commands).concat("contact", "resume", "exit");

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
              <p>Welcome to Aditya's Personal Portfolio 💻</p>
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
                  <pre
                    style={{
                      whiteSpace:
                        item.output && item.output.type ? "normal" : "pre-wrap",
                    }}
                  >
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
