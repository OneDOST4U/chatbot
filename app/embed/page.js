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
  { id: "programs", label: "📋 Programs", prompt: "What are the current DOST programs and projects?" },
  { id: "services", label: "🏢 Services", prompt: "What services does DOST Region II offer?" },
  { id: "cagayan", label: "📍 Cagayan", prompt: "What Cagayan data or information do you have? What can you tell me about Cagayan (capital, governor, population, tourism, census, Innovation Hub)?" }
];

export default function EmbedPage() {
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
        setMessages([...messages, { role: "user", content: text }, { role: "assistant", content: msg }]);
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
            if (last?.role === "assistant") next[next.length - 1] = { ...last, content: accumulated || LOADING_PLACEHOLDER };
            return next;
          });
        }
        setLoading(false);
        return;
      }

      const data = await res.json().catch(() => ({}));
      setMessages([...messages, { role: "user", content: text }, { role: "assistant", content: data.answer || "Sorry, I could not generate an answer." }]);
    } catch (e) {
      const msg = e?.message || "Sorry, an error occurred. Please check your connection and try again.";
      setMessages([...messages, { role: "user", content: text }, { role: "assistant", content: msg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleCardClick = (prompt) => sendMessage(prompt);
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
    if (!loading && inputRef.current) inputRef.current.focus();
  }, [loading]);

  return (
    <div className="dost-embed-page">
      <div className="dost-main-card dost-embed-card">
        <div className="dost-chatbot chatgpt-style">
          <div className="chat-window" ref={chatWindowRef}>
            {messages.length === 0 ? (
              <div className="chat-empty chat-empty-widget">
                <div className="chat-row chat-row-assistant">
                  <div className="chat-avatar">
                    <img src="/img/chatbot-profile.png" alt="Assistant" className="chat-avatar-logo" />
                  </div>
                  <div className="chat-bubble assistant">
                    Hi! How may I help you? I'm askTAY-EGAY. 😊
                  </div>
                </div>
              </div>
            ) : (
              messages.map((m, idx) => (
                <div key={idx} className={m.role === "user" ? "chat-row chat-row-user" : "chat-row chat-row-assistant"}>
                  <div className="chat-avatar">
                    {m.role === "user" ? <span>You</span> : <img src="/img/chatbot-profile.png" alt="Assistant" className="chat-avatar-logo" />}
                  </div>
                  <div className={m.role === "user" ? "chat-bubble user" : "chat-bubble assistant"}>
                    {m.role === "assistant" && m.content === LOADING_PLACEHOLDER && loading ? <TypingDots /> : m.content}
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
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn primary btn-send" disabled={loading || !input.trim()} aria-label="Send">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
          <button type="button" className="btn secondary dost-embed-clear" onClick={handleClear} disabled={loading}>
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
        <div className="dost-footer dost-embed-footer">
          DOST R02 and Cagayan knowledge base. For official details, contact Cagayan and DOST R02 Office.
        </div>
      </div>
    </div>
  );
}
