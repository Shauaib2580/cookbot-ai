"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function ChatMessage({ message }) {
  const isUser = message.role === "user";
  
  return (
    <div className={cn("flex items-start gap-4", isUser ? "flex-row-reverse" : "")}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={cn(
        "flex flex-col gap-2 rounded-lg px-4 py-3 max-w-[80%]",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
        <div className="text-xs opacity-70">
          {format(new Date(message.timestamp), 'h:mm a')}
        </div>
      </div>
    </div>
  );
}