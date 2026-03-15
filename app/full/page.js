"use client";

import { useState, useRef, useEffect } from "react";

const LOADING_PLACEHOLDER = "\u200B";

function TypingDots() {
  return (
    <span className="typing-dots" aria-label="Thinking">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </span>
  );
}

const miniCards = [
  {
    id: "programs",
    label: "📋 Programs",
    prompt: "What are the current DOST programs and projects?"
  },
  {
    id: "services",
    label: "🏢 Services",
    prompt: "What services does DOST Region II offer?"
  },
  {
    id: "cagayan",
    label: "📍 Cagayan",
    prompt: "What Cagayan data or information do you have? What can you tell me about Cagayan (capital, governor, population, tourism, census, Innovation Hub)?"
  }
];

export default function FullPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    const newMessages = [
      ...messages,
      { role: "user", content: text },
      { role: "assistant", content: LOADING_PLACEHOLDER }
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, stream: true })
      });

      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data.answer || "Request failed. Please try again.";
        setMessages([
          ...messages,
          { role: "user", content: text },
          { role: "assistant", content: msg }
        ]);
        setLoading(false);
        return;
      }

      if (contentType.includes("application/x-ndjson") && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let buffer = "";
        let streamDone = false;
        while (!streamDone) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const obj = JSON.parse(line);
              if (obj.content) accumulated += obj.content;
              if (obj.fallback) accumulated = obj.fallback;
              if (obj.error) accumulated = obj.error;
              if (obj.done) streamDone = true;
            } catch (_) {}
          }
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === "assistant") {
              next[next.length - 1] = { ...last, content: accumulated || LOADING_PLACEHOLDER };
            }
            return next;
          });
        }
        setLoading(false);
        return;
      }

      const data = await res.json().catch(() => ({}));
      setMessages([
        ...messages,
        { role: "user", content: text },
        { role: "assistant", content: data.answer || "Sorry, I could not generate an answer." }
      ]);
    } catch (e) {
      const msg = e?.message || "Sorry, an error occurred. Please check your connection and try again.";
      setMessages([
        ...messages,
        { role: "user", content: text },
        { role: "assistant", content: msg }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleCardClick = (prompt) => {
    sendMessage(prompt);
  };

  const handleClear = () => {
    setMessages([]);
    setInput("");
  };

  const chatWindowRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = chatWindowRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  return (
    <div className="dost-page">
      <div className="dost-logo-wrapper">
        <img src="/img/cagayan.png" alt="Cagayan" className="dost-logo-container" />
        <img src="/img/dost.png" alt="DOST logo" className="dost-logo-container" />
        <img src="/img/ihub.png" alt="iHub" className="dost-logo-container" />
        <img src="/img/bagong-pilipinas.png" alt="Bagong Pilipinas" className="dost-logo-container" />
      </div>

      <div className="dost-header-title">What can I help with?</div>
      <div className="dost-subtitle">
        Ask about DOST R02 and Cagayan services, programs details and more.
      </div>

      <div className="dost-main-card">
        <div className="dost-chatbot chatgpt-style">
          <div className="chat-window" ref={chatWindowRef}>
            {messages.length === 0 ? (
              <div className="chat-empty">
                <p className="chat-empty-title">Welcome to the DOST R02 and Cagayan assistant.</p>
                <p className="chat-empty-subtitle">Here are some things you can ask:</p>
                <ul>
                  <li>"What services does DOST Region II offer?"</li>
                  <li>"What can you tell me about Cagayan (governor, capital, population, tourism)?"</li>
                  <li>"What is the Cagayan Innovation Hub? What programs does it offer?"</li>
                  <li>"What is OneLab? What testing or calibration services are available?"</li>
                  <li>"How do I apply for SETUP iFUND or JLSS scholarship?"</li>
                  <li>"What is AMCen? What does the Advanced Manufacturing Center do?"</li>
                  <li>"Tell me about Cagayan's economy, key industries, or investment opportunities."</li>
                </ul>
              </div>
            ) : (
              messages.map((m, idx) => (
                <div
                  key={idx}
                  className={
                    m.role === "user"
                      ? "chat-row chat-row-user"
                      : "chat-row chat-row-assistant"
                  }
                >
                  <div className="chat-avatar">
                    {m.role === "user" ? (
                      <span>You</span>
                    ) : (
                      <img
                        src="/img/chatbot-profile.png"
                        alt="Assistant"
                        className="chat-avatar-logo"
                      />
                    )}
                  </div>
                  <div
                    className={
                      m.role === "user" ? "chat-bubble user" : "chat-bubble assistant"
                    }
                  >
                    {m.role === "assistant" &&
                    m.content === LOADING_PLACEHOLDER &&
                    loading ? (
                      <TypingDots />
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <form className="dost-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="dost-text-input"
            placeholder="Ask anything about DOST Region II…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="btn primary"
            disabled={loading || !input.trim()}
          >
            {loading ? "Thinking…" : "Ask"}
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </button>
        </form>

        <div className="mini-cards-row">
          {miniCards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={`mini-card ${index === miniCards.length - 1 ? "mini-card-last" : ""}`}
              onClick={() => handleCardClick(card.prompt)}
              disabled={loading}
            >
              <span className="mini-card-text">{card.label}</span>
            </button>
          ))}
        </div>

        <div className="dost-footer">
          This assistant uses an internal DOST Region II knowledge base and public documents.
          For the most up-to-date official information, please contact DOST Region II directly.
          <br />
          <span className="dost-disclaimer">
            Responses are generated by an AI chatbot and may contain errors. For questions that are not
            covered by the available documents, the assistant will advise you to directly contact or visit
            DOST Region II to confirm details.
          </span>
        </div>
      </div>
    </div>
  );
}
