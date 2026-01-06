"use client";

import { useEffect, useState } from "react";

type Step = "build" | "docker" | "push" | "deploy" | "done";

export default function Page() {
  const [currentStep, setCurrentStep] = useState<Step>("build");
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleString());

    const steps: Step[] = ["build", "docker", "push", "deploy", "done"];
    let i = 0;

    const interval = setInterval(() => {
      setCurrentStep(steps[i]);
      i++;
      if (i >= steps.length) clearInterval(interval);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const renderStep = (step: Step, label: string) => {
    // THAY ĐỔI TẠI ĐÂY: Đổi #999 thành #000 (đen)
    let color = "#000"; 
    let icon = "";

    const order: Step[] = ["build", "docker", "push", "deploy", "done"];
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(step);

    if (stepIndex < currentIndex) {
      color = "green"; // đã xong
      icon = "✔ ";
    } else if (stepIndex === currentIndex) {
      color = "#000"; // đang chạy
    }

    return (
      <p style={{ color, fontWeight: stepIndex === currentIndex ? "bold" : "normal" }}>
        {icon}{label}
      </p>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 CI/CD Deployment Dashboard</h1>
        <p style={styles.subtitle}>Jenkins · Docker · GitHub · Next.js</p>

        <div style={styles.section}>
          <h2 style={{ color: "#000" }}>📦 Deployment Status</h2>
          {renderStep("build", "Build Application")}
          {renderStep("docker", "Build Docker Image")}
          {renderStep("push", "Push Image to Docker Hub")}
          {renderStep("deploy", "Deploy Container")}
          {currentStep === "done" && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              ✔ Deployed Successfully
            </p>
          )}
        </div>

        <div style={styles.section}>
          <h2 style={{ color: "#000" }}>🕒 Last Deploy Time</h2>
          <p style={{ color: "#000" }}>{time}</p>
        </div>

        <div style={styles.section}>
          <h2 style={{ color: "#000" }}>🔁 Git Information</h2>
          <p style={{ color: "#000" }}>
            <strong>Commit:</strong>{" "}
            {process.env.NEXT_PUBLIC_GIT_COMMIT || "Unknown"}
          </p>
          <p style={{ color: "#000" }}>
            <strong>Branch:</strong> main
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={{ color: "#000" }}>🐳 Container Info</h2>
          <p style={{ color: "#000" }}>Docker Image: <code>npt102/23127123</code></p>
          <p style={{ color: "#000" }}>Port: 3000</p>
        </div>

        <div style={styles.footer}>
          Auto deployed via Jenkins Pipeline
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: 40,
    borderRadius: 12,
    width: 520,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    color: "#000", // Ép toàn bộ text trong card mặc định là đen
  },
  title: {
    textAlign: "center",
    marginBottom: 5,
    color: "#000",
  },
  subtitle: {
    textAlign: "center",
    color: "#000", // Đã đổi từ #555 sang #000
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 12,
    color: "#000", // Đã đổi từ #777 sang #000
  },
};