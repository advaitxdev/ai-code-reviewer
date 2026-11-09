import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import _Editor from "react-simple-code-editor";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

// Handles CJS/ESM interop in Vite
const Editor = _Editor.default || _Editor;

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    setReview("Reviewing code...");

    try {
      const res = await axios.post("http://localhost:3000/ai/get-review", {
        prompt: code,
      });
      setReview(res.data);
    } catch (err) {
      console.error("Review Request Failed:", err);
      setReview(
        err.response?.data?.error ||
          "Error generating review. Check backend terminal."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #444",
              borderRadius: "4px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <button
          type="button"
          onClick={reviewCode}
          disabled={loading}
          className="review"
        >
          {loading ? "Reviewing..." : "Review"}
        </button>
      </div>

      <div className="right">
        <pre className="review-content">
          <Markdown rehypePlugins={rehypeHighlight}>{review}</Markdown>
        </pre>
      </div>
    </main>
  );
}

export default App;
