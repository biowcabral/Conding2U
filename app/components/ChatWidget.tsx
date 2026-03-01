'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { WHATSAPP_NUMBER } from './types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME: Message = {
  role: 'assistant',
  content: "Hey! 👋 I'm Maya, Coding2U's AI assistant. I'm here to help you find out if we're the right fit for your project — what brings you here today?",
};

export default function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [handoff, setHandoff]   = useState(false);
  const [summary, setSummary]   = useState('');
  const [badge, setBadge]       = useState(true);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);

  // Hide badge once opened
  useEffect(() => { if (open) setBadge(false); }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || handoff) return;

    const userMsg: Message = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);

      if (data.handoff) {
        setHandoff(true);
        setSummary(data.summary ?? '');
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, something went wrong. Please try again or reach out via WhatsApp!" },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, handoff, messages]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  // Build WhatsApp URL with lead summary
  const waUrl = (() => {
    const msg = summary
      ? `Hi! I just had a chat with Maya on your website. Here's my info:\n\n${summary}`
      : "Hi! I just chatted with Maya on the Coding2U website and I'd like to talk to a real person!";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  })();

  return (
    <>
      {/* ── FLOATING BUTTON ─────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Chat panel */}
        {open && (
          <div
            className="flex flex-col animate-fade-in"
            style={{
              width: 'min(380px, calc(100vw - 2rem))',
              height: 'min(540px, calc(100vh - 6rem))',
              background: 'linear-gradient(160deg, #0B1628 0%, #0E1C30 100%)',
              border: '1px solid rgba(249,115,22,0.25)',
              borderRadius: '1.25rem',
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(249,115,22,0.08)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid rgba(249,115,22,0.12)',
                background: 'rgba(249,115,22,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F97316, #c2410c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}
              >
                🤖
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>Maya</p>
                <p style={{ color: 'rgba(249,115,22,0.8)', fontSize: '0.7rem', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                  Coding2U AI Assistant
                </p>
              </div>

              {/* Coding2U badge */}
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                padding: '2px 8px', borderRadius: 999,
                background: 'rgba(249,115,22,0.15)', color: '#F97316',
                border: '1px solid rgba(249,115,22,0.3)',
              }}>
                Coding2u
              </span>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#64748b', fontSize: 20, lineHeight: 1, padding: 0,
                  marginLeft: 4,
                }}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1, overflowY: 'auto', padding: '1rem',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '82%',
                      padding: '0.6rem 0.9rem',
                      borderRadius: m.role === 'user' ? '1rem 1rem 0.2rem 1rem' : '1rem 1rem 1rem 0.2rem',
                      background: m.role === 'user'
                        ? 'linear-gradient(135deg, #F97316, #ea6a0a)'
                        : 'rgba(255,255,255,0.07)',
                      color: '#fff',
                      fontSize: '0.825rem',
                      lineHeight: 1.5,
                      border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: '1rem 1rem 1rem 0.2rem',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', gap: 4, alignItems: 'center',
                    }}
                  >
                    {[0, 1, 2].map(d => (
                      <span
                        key={d}
                        style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: '#F97316',
                          display: 'inline-block',
                          animation: 'bounce 1.2s infinite',
                          animationDelay: `${d * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Handoff CTA */}
              {handoff && (
                <div
                  style={{
                    margin: '0.5rem 0',
                    padding: '1rem',
                    borderRadius: '1rem',
                    background: 'rgba(37,211,102,0.08)',
                    border: '1px solid rgba(37,211,102,0.25)',
                  }}
                >
                  <p style={{ color: '#86efac', fontSize: '0.75rem', margin: '0 0 0.75rem', fontWeight: 600 }}>
                    ✓ Summary sent to our team
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
                      padding: '0.7rem 1.25rem', borderRadius: 999,
                      background: '#25D366', color: '#fff',
                      fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
                      boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
                    }}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.486a.5.5 0 0 0 .614.612l5.52-1.445A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.5-5.192-1.374l-.372-.215-3.874 1.015 1.036-3.767-.234-.382A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Continue on WhatsApp
                  </a>
                  <p style={{ color: '#64748b', fontSize: '0.68rem', margin: '0.6rem 0 0', textAlign: 'center' }}>
                    A real person will reply shortly.
                  </p>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {!handoff && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderTop: '1px solid rgba(249,115,22,0.1)',
                  display: 'flex', gap: 8, alignItems: 'center',
                  background: 'rgba(0,0,0,0.2)',
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type your message…"
                  disabled={loading}
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(249,115,22,0.2)',
                    borderRadius: 999, padding: '0.55rem 1rem',
                    color: '#fff', fontSize: '0.825rem', outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(249,115,22,0.2)')}
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  style={{
                    width: 36, height: 36, borderRadius: '50%', border: 'none',
                    background: input.trim() ? '#F97316' : 'rgba(249,115,22,0.2)',
                    color: '#fff', cursor: input.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'background 0.2s',
                  }}
                  aria-label="Send"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            )}

            {/* Footer */}
            <p style={{ color: '#334155', fontSize: '0.6rem', textAlign: 'center', padding: '0.4rem 0', margin: 0 }}>
              Powered by Coding2U · AI by GPT-4o
            </p>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Open chat"
          style={{
            width: 56, height: 56, borderRadius: '50%', border: 'none',
            background: open
              ? 'linear-gradient(135deg, #1E3A5F, #0B1628)'
              : 'linear-gradient(135deg, #F97316, #c2410c)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: open
              ? '0 8px 24px rgba(0,0,0,0.5)'
              : '0 8px 32px rgba(249,115,22,0.5)',
            transition: 'all 0.3s ease',
            position: 'relative',
          }}
        >
          {/* Notification badge */}
          {badge && !open && (
            <span
              style={{
                position: 'absolute', top: -4, right: -4,
                width: 18, height: 18, borderRadius: '50%',
                background: '#22c55e', color: '#fff',
                fontSize: '0.65rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #0B1628',
              }}
            >
              1
            </span>
          )}

          {open ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4C2.897 2 2 2.897 2 4v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 12H5.586L4 15.586V4h16v10z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Bounce keyframe for typing dots */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
