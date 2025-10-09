"use client";

import {
  Shell} from "lucide-react";
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
import { AIModels } from "@/utils/aiModels";
import { useAIModelStore } from "@/store/useAIModelStore";
import { useSession } from "next-auth/react";
import { getFirstName } from "@/utils/stringUtils";
import { Skeleton } from "@/components/ui/skeleton";
import Message from "@/components/markdown-message";

export default function Page() {
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const { model, setModel } = useAIModelStore() as {
    model: string;
    setModel: (model: string) => void;
  };
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
        <header className="flex h-16 shrink-0 items-center gap-2 fixed top-0 w-full bg-black/50 backdrop-blur z-10">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Select
              defaultValue={model}
              onValueChange={(value) => setModel(value)}
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
            <Separator
              orientation="vertical"
              className="ml-2mr-2 data-[orientation=vertical]:h-4 hidden md:flex"
            />
            <Select defaultValue="Default" onValueChange={(value) => setModel(value)}>
              <SelectTrigger className="w-[200px] cursor-pointer hidden md:flex">
                <SelectValue placeholder="Choose an Agent" />
              </SelectTrigger>
              <SelectContent className="bg-black text-primary-foreground ">
                <SelectGroup>
                  <SelectLabel className="text-muted-foreground">
                    Most Popular Agents
                  </SelectLabel>
                  <SelectItem
                    value="Default"
                  >
                    AI Assistant
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </header>
        <div className="flex flex-1 h-full flex-col gap-4 p-4 pt-0 mt-16">
          <div className="flex flex-col h-full bg-background">
            <div className="h-full max-h-full flex-1 overflow-y-auto px-4 py-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mx-auto mb-4">
                      <Shell className="w-8 h-8 text-secondary" />
                    </div>
                    <h2 className="font-sans font-semibold text-xl text-foreground mb-2">
                      Hey {getFirstName(session?.user?.name ?? "")}, How can I
                      help you today?
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
                    <Card
                      className={`px-[16px] py-[8px] text-base border-none ${
                        message.role === "user"
                          ? "bg-[#323232d9] text-white"
                          : "bg-transparent text-white w-full"
                      }`}
                    >
                      <div className={"text-base text-pretty"}>
                        {message.parts.map((part, index) => {
                          if (message.role !== "user") {
                            if(part.type === "text") {
                              return (
                                <Message key={index} content={part.text} />
                              )
                            }
                          }
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
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-16 shrink-0 items-center justify-center bottom-0 w-full bg-black/50 backdrop-blur z-10">
              <div className="w-full">
                <form onSubmit={handleSubmit} className="flex gap-3 max-w-1/3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="border-border focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
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
      </SidebarInset>
    </SidebarProvider>
  );
}
