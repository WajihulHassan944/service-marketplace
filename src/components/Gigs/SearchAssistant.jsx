'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FiZap,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiRefreshCcw,
} from 'react-icons/fi';
import './SearchAssistant.css';

const SearchAssistant = ({ searchTerm, gigs, isLoading }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryReady, setSummaryReady] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [aiBrief, setAiBrief] = useState(null);
  const [aiError, setAiError] = useState(null);
  const [chatError, setChatError] = useState(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);

  const idCounterRef = useRef(0);
  const composerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const nextId = useCallback((prefix) => {
    idCounterRef.current += 1;
    return `${prefix}-${idCounterRef.current}`;
  }, []);

  const preparedSuggestions = useMemo(() => {
    if (!gigs?.length) return [];

    return gigs.slice(0, 3).map((gig) => ({
      id: gig._id,
      title: gig.gigTitle,
      seller: `${gig.userId?.firstName || ''} ${gig.userId?.lastName || ''}`.trim(),
      price: gig.packages?.basic?.price || gig.packages?.standard?.price || null,
      category: gig.category,
    }));
  }, [gigs]);

  const conversationHistory = useMemo(
    () =>
      messages.map((message) => ({
        role: message.role,
        content: message.text,
      })),
    [messages],
  );

  const tagsFromSearch = useMemo(() => {
    return searchTerm
      .split(/[,\s]+/)
      .filter(Boolean)
      .slice(0, 4)
      .map((word) => word.replace(/[^a-zA-Z0-9+#-]/g, ''));
  }, [searchTerm]);

  const fetchAssistantReply = useCallback(
    async (historyPayload) => {
      try {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            searchTerm,
            history: historyPayload,
          }),
        });

        const body = await response.json().catch(() => null);

        if (!response.ok) {
          const message = body?.message || 'Failed to contact the AI assistant.';
          throw new Error(message);
        }

        const replyText = body?.data?.reply || 'I had trouble generating a response.';

        setMessages((prev) => [
          ...prev,
          {
            id: nextId('assistant'),
            role: 'assistant',
            text: replyText,
          },
        ]);

        if (body?.data?.summaryReady) {
          setSummaryReady(true);
        }
      } catch (error) {
        console.error('AI chat error:', error);
        setChatError(error.message || 'Unable to continue the AI chat.');
      } finally {
        setIsProcessing(false);
      }
    },
    [nextId, searchTerm],
  );

  useEffect(() => {
    idCounterRef.current = 0;
    setMessages([]);
    setInputValue('');
    setIsProcessing(true);
    setSummaryReady(false);
    setConversationComplete(false);
    setAiBrief(null);
    setAiError(null);
    setChatError(null);
    setIsGeneratingBrief(false);

    const historyPayload = [];
    fetchAssistantReply(historyPayload);
    composerRef.current?.focus();
  }, [searchTerm, fetchAssistantReply]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendCurrentInput = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || isProcessing || summaryReady || conversationComplete) return;

    const userMessage = {
      id: nextId('user'),
      role: 'user',
      text: trimmed,
    };

    const updatedHistory = [...conversationHistory, { role: 'user', content: trimmed }];

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    setChatError(null);

    fetchAssistantReply(updatedHistory);
  }, [inputValue, isProcessing, summaryReady, conversationComplete, nextId, conversationHistory, fetchAssistantReply]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      sendCurrentInput();
    },
    [sendCurrentInput],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendCurrentInput();
      }
    },
    [sendCurrentInput],
  );

  const handleReset = useCallback(() => {
    idCounterRef.current = 0;
    setMessages([]);
    setInputValue('');
    setIsProcessing(true);
    setSummaryReady(false);
    setConversationComplete(false);
    setAiBrief(null);
    setAiError(null);
    setChatError(null);
    setIsGeneratingBrief(false);

    const historyPayload = [];
    fetchAssistantReply(historyPayload);
    composerRef.current?.focus();
  }, [fetchAssistantReply]);

  useEffect(() => {
    if (!summaryReady || isGeneratingBrief || aiBrief) {
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      setIsGeneratingBrief(true);
      setAiError(null);

      try {
        const response = await fetch('/api/ai/brief', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            searchTerm,
            conversation: conversationHistory,
            suggestions: preparedSuggestions,
          }),
          signal: controller.signal,
        });

        const body = await response.json().catch(() => null);

        if (!response.ok) {
          const message = body?.message || 'Failed to generate AI brief.';
          throw new Error(message);
        }

        setAiBrief(body?.data || null);
        setConversationComplete(true);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('AI brief generation failed:', error);
        setAiError(error.message || 'Unable to generate AI brief.');
      } finally {
        if (!controller.signal.aborted) {
          setIsGeneratingBrief(false);
        }
      }
    };

    run();

    return () => controller.abort();
  }, [summaryReady, isGeneratingBrief, aiBrief, searchTerm, conversationHistory, preparedSuggestions]);

  const inputDisabled = isProcessing || summaryReady || conversationComplete;

  const projectOverview = aiBrief?.projectOverview
    || (searchTerm ? `Focus: ${searchTerm}` : 'Project summary will appear here.');
  const keyNeeds = aiBrief?.keyNeeds?.length ? aiBrief.keyNeeds : [];
  const nextSteps = aiBrief?.nextSteps || [];
  const tagsToRender = aiBrief?.tags?.length ? aiBrief.tags : tagsFromSearch;
  const expertProfile = aiBrief?.idealExpertProfile || '';

  const showSummary = summaryReady || conversationComplete || Boolean(aiBrief);

  return (
    <section className="search-assistant" aria-live="polite">
      <header className="search-assistant__header">
        <span className="search-assistant__icon" aria-hidden>
          <FiZap />
        </span>
        <div>
          <p className="search-assistant__eyebrow">AI Match Assistant</p>
          <h2 className="search-assistant__title">Let me guide your search</h2>
          <p className="search-assistant__description">
            Chat with me about what you need — I will turn it into a usable project brief.
          </p>
          <p className="search-assistant__status">
            <FiClock aria-hidden />
            <span>
              {isLoading
                ? 'Syncing with the latest marketplace data...'
                : 'Pulling from the most recent marketplace listings.'}
            </span>
          </p>
        </div>
      </header>

      <div className="search-assistant__chat">
        <div className="search-assistant__messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message chat-message--${message.role}`}
            >
              <span>{message.text}</span>
            </div>
          ))}

          {chatError && (
            <div className="chat-message chat-message--assistant chat-message--error">
              <span>{chatError}</span>
            </div>
          )}

          {isProcessing && !conversationComplete && (
            <div className="chat-message chat-message--assistant chat-message--typing">
              <span className="typing-dots">
                <span />
                <span />
                <span />
              </span>
              <span>Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="search-assistant__composer" onSubmit={handleSubmit}>
          <textarea
            ref={composerRef}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              conversationComplete
                ? 'Reset to start a new brief.'
                : 'Type your reply and press Enter...'
            }
            rows={1}
            disabled={inputDisabled}
          />
          <button type="submit" disabled={inputDisabled || !inputValue.trim()}>
            {isProcessing ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

      {showSummary && (
        <div className="search-assistant__summary">
          <div className="search-assistant__summary-header">
            <FiCheckCircle aria-hidden />
            <div>
              <h3>Your working brief</h3>
              <p>Share this with talent or tweak it below.</p>
            </div>
          </div>

          {isGeneratingBrief && (
            <p className="search-assistant__progress">Generating AI-powered brief...</p>
          )}

          {aiError && (
            <p className="search-assistant__error">{aiError}</p>
          )}

          <div className="search-assistant__summary-body">
            <p>{projectOverview}</p>

            {expertProfile && (
              <div className="search-assistant__summary-section">
                <h4>Ideal expert</h4>
                <p>{expertProfile}</p>
              </div>
            )}

            {keyNeeds.length > 0 && (
              <div className="search-assistant__summary-section">
                <h4>Key needs</h4>
                <ul>
                  {keyNeeds.map((item) => (
                    <li key={item}>
                      <FiCheckCircle aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {nextSteps.length > 0 && (
              <div className="search-assistant__summary-section">
                <h4>Next steps</h4>
                <ul className="search-assistant__summary-next">
                  {nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {tagsToRender.length > 0 && (
            <div className="search-assistant__tags">
              {tagsToRender.map((tag) => (
                <span key={tag} className="search-assistant__tag">
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
          )}

          <div className="search-assistant__actions">
            <button
              type="button"
              className="search-assistant__reset"
              onClick={handleReset}
            >
              <FiRefreshCcw aria-hidden />
              <span>Start over</span>
            </button>
          </div>
        </div>
      )}

      {conversationComplete && preparedSuggestions.length > 0 && (
        <div className="search-assistant__suggestions">
          <div className="search-assistant__suggestions-header">
            <FiTrendingUp aria-hidden />
            <div>
              <h3>Smart matches to explore</h3>
              <p>
                Based on your answers, these services align with what you need right now.
              </p>
            </div>
          </div>

          <div className="search-assistant__suggestion-grid">
            {preparedSuggestions.map((suggestion) => (
              <article key={suggestion.id} className="search-assistant__suggestion">
                <h4>{suggestion.title}</h4>
                {suggestion.seller && (
                  <p className="search-assistant__seller">By {suggestion.seller}</p>
                )}
                <p className="search-assistant__meta">
                  {suggestion.category ? suggestion.category : 'General services'}
                  {suggestion.price ? ` | Starting at $${suggestion.price}` : ''}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchAssistant;
