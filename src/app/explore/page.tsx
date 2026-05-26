"use client";

import { useState, useEffect } from "react";

export default function ExplorePage() {
  const [mounted, setMounted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>(Array(7).fill(false));
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleAnswer = (index: number) => {
    const updated = [...answers];
    updated[index] = !updated[index];
    setAnswers(updated);
  };

  const runDAR = async () => {
    const res = await fetch("/api/run-dar", {
      method: "POST",
      body: JSON.stringify({ answers }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>DYH Explore</h1>

      <h2>Questions</h2>
      {answers.map((value, i) => (
        <div key={i}>
          <label>
            Q{i + 1}:{" "}
            <input
              type="checkbox"
              checked={value}
              onChange={() => toggleAnswer(i)}
            />
          </label>
        </div>
      ))}

      <button onClick={runDAR} style={{ marginTop: 16 }}>
        Run DAR
      </button>

      {result && (
        <pre style={{ marginTop: 24 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
    