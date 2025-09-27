"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type React from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const AIModels = [
  {
    label: "ChatGPT",
    models: [
      { label: "ChatGPT 5", value: "gpt-5", disabled: true },
      { label: "ChatGPT 4.1 Mini", value: "gpt-4.1-mini" },
    ],
  },
];

export default function Page() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status !== "streaming") {
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
            <Select
              defaultValue="gpt-4.1-mini"
              onValueChange={(value) => console.log(value)}
            >
              <SelectTrigger className="w-[200px] cursor-pointer">
                <SelectValue placeholder="AI Model" />
              </SelectTrigger>
              <SelectContent className="bg-black text-primary-foreground ">
                {AIModels.map((group, index) => (
                  <SelectGroup key={index}>
                    <SelectLabel className="text-muted-foreground">
                      {group.label}
                    </SelectLabel>
                    {group.models.map((model) => (
                      <SelectItem
                        disabled={model.disabled}
                        key={model.value}
                        value={model.value}
                      >
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
        </header>
        <div className="flex flex-1 h-full flex-col gap-4 p-4 pt-0">
          <div className="flex flex-col h-full bg-background">
            <div className="h-full max-h-full flex-1 overflow-y-auto px-4 py-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mx-auto mb-4">
                      <Bot className="w-8 h-8 text-secondary" />
                    </div>
                    <h2 className="font-sans font-semibold text-xl text-foreground mb-2">
                      How can I help you today?
                    </h2>
                    <p className="text-muted-foreground">
                      Start a conversation by typing a message below.
                    </p>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}

                    <Card
                      className={`max-w-[80%] p-2 ${
                        message.role === "user"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-card text-card-foreground"
                      }`}
                    >
                      <div className="font-sans text-sm leading-relaxed text-pretty">
                        {message.parts.map((part, index) => {
                          if (part.type === "text") {
                            return (
                              <div key={index} className="whitespace-pre-wrap">
                                {part.text}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </Card>

                    {message.role === "user" && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {status === "streaming" && (
                  <div className="flex gap-4 justify-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <Card className="max-w-[80%] p-4 bg-card text-card-foreground">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Thinking...
                        </span>
                      </div>
                    </Card>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Form */}
            <div className="px-4 py-4">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 border-border focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                    disabled={status === "streaming"}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || status === "streaming"}
                    className="bg-white hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
