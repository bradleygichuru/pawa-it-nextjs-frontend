"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export interface ChatMessageProps {
  message: string;
  role: string;
}
//Component to display Chat messages based on role 
export function ChatMessage({message,role}:ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-lg p-4",
        role === "user" ? "bg-muted" : "bg-background border"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          role === "user"
            ? "bg-background"
            : "bg-primary text-primary-foreground"
        )}
      >
        {role === "user" ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="prose prose-sm dark:prose-invert break-words">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
