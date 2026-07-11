import { useState, useRef, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

const HISTORY_KEY = "code-review-history"

function App() {
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const controllerRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  async function reviewCode() {
    setLoading(true)
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code },
        { signal: controller.signal }
      );
      setReview(response.data.review);
      setHistory(prev => [
        {
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          code,
          review: response.data.review,
        },
        ...prev,
      ].slice(0, 20)) // keep the most recent 20
    } catch (error) {
      if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
        setReview("Review cancelled.");
      } else {
        console.error(error);
        setReview("**Something went wrong.** The review couldn't be generated — check that the backend is running and try again.");
      }
    } finally {
      setLoading(false)
      controllerRef.current = null
    }
  }

  function cancelReview() {
    controllerRef.current?.abort()
  }

  function loadFromHistory(entry) {
    setCode(entry.code)
    setReview(entry.review)
    setShowHistory(false)
  }

  function clearHistory() {
    setHistory([])
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">{'</>'}</span>
          <span className="brand-name">Code Review</span>
        </div>
        <div className="header-actions">
          <button
            className="history-toggle"
            onClick={() => setShowHistory(prev => !prev)}
          >
            history{history.length > 0 && <span className="history-count">{history.length}</span>}
          </button>
          <span className="status-badge">gemini-flash-latest</span>
        </div>
      </header>

      <main className="app-main">
        <section className="pane pane-left">
          <div className="editor-frame">
            <div className="editor-tab">
              <span className="tab-dot" />
              <span>index.js</span>
            </div>
            <div className="code-editor-wrapper">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                padding={16}
                style={{
                  fontFamily: '"Fira Code", "Fira Mono", monospace',
                  fontSize: 15,
                  minHeight: "100%",
                }}
              />
            </div>
          </div>

          <div className="action-row">
            {loading && (
              <button onClick={cancelReview} className="cancel-btn">
                ✕ cancel
              </button>
            )}
            <button
              onClick={reviewCode}
              disabled={loading}
              className="review-btn"
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  reviewing
                </>
              ) : (
                <>▸ review</>
              )}
            </button>
          </div>
        </section>

        <section className="pane pane-right">
          <div className="review-panel">
            <div className="review-header">
              <span>Review</span>
            </div>
            <div className="review-content">
              {review ? (
                <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
              ) : (
                <div className="review-empty">
                  <span className="empty-glyph">▸</span>
                  <p>Write or paste some code on the left, then run a review to see it here.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {showHistory && (
        <div className="history-overlay" onClick={() => setShowHistory(false)}>
          <div className="history-drawer" onClick={e => e.stopPropagation()}>
            <div className="history-drawer-header">
              <span>History</span>
              <div className="history-drawer-actions">
                {history.length > 0 && (
                  <button className="clear-history-btn" onClick={clearHistory}>clear</button>
                )}
                <button className="close-history-btn" onClick={() => setShowHistory(false)}>✕</button>
              </div>
            </div>
            <div className="history-list">
              {history.length === 0 ? (
                <p className="history-empty">No reviews yet.</p>
              ) : (
                history.map(entry => (
                  <button
                    key={entry.id}
                    className="history-item"
                    onClick={() => loadFromHistory(entry)}
                  >
                    <span className="history-time">{entry.timestamp}</span>
                    <span className="history-snippet">{entry.code.trim().slice(0, 60)}{entry.code.trim().length > 60 ? "…" : ""}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App