"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Check, Copy } from "lucide-react";

type Props = {
  content: string;
};

export default function Message({ content }: Props) {
  return (
    <div
      className={`w-full prose`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({
    inline,
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { inline?: boolean; className?: string; children?: React.ReactNode }) {
            const code = String(children ?? "").replace(/\n$/, "");
            const language = className?.replace("language-", "") || "";

            if (!inline) {
            return (
                <CodeBlock
                    language={language}
                    code={children}
                    {...props}
                />
            );
            }

            return (
              <code
                className={
                  "bg-gray-200 text-red-600 rounded px-1 py-0.5 text-sm"
                }
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({ code, language}: { code: React.ReactNode; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      typeof code === "string" ? code : String(code)
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 border border-gray-700 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-800 text-gray-200 px-3 py-1 text-xs ">
        <span>{language || "text"}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition"
        >
          {copied ? `${<Check />} Copied` : `${<Copy />} Copy code`}
        </button>
      </div>

      <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}