"use client";

import { useRef, useEffect, useState, FormEventHandler } from "react";
import { Bot, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ChatMessage, ChatMessageProps } from "@/components/chat-message";

export function Chat() {
  //const { messages, input, handleInputChange, handleSubmit, isLoading }
  const [isLoading, setIsloading] = useState(false); //Responisble for toggling loading state
  const [messages, setMessages] = useState<Array<ChatMessageProps>>([]); //Stores Messages
  const [input, setInput] = useState<string>(""); //Stores user query to be sent to the backend
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsloading(true); //Toogle loading state to queue loading visual elements to user

    setMessages([...messages, { message: input, role: "user" }]); //append message to state before query submission
    const formData = new FormData();
    formData.append("query", input);
    const req = await fetch("http://127.0.0.1:8000/ask", {
      body: formData,
      method: "POST",
    }); //query backend for prompt answer from gemini api
    const data = await req.json();
    console.log(data);
    setIsloading(false);

    setMessages([...messages, { message: data, role: "bot" }]); //Append query answer to message array
    setInput("");
    console.log("submitted");
  }
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-focus the input field on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <Card className="flex flex-col h-[600px] md:h-[700px]">
        <div className="flex-1 overflow-hidden">
          <ScrollArea ref={scrollAreaRef} className="h-full p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Bot className="h-12 w-12 text-muted-foreground" />
                  <p className="text-xl font-medium">
                    How can I help you today?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ask a question to start the conversation
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    role={message.role}
                    message={message.message}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <Textarea
              ref={inputRef}
              tabIndex={0}
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  //treat Enter key press as form submission queue
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              className="min-h-12 resize-none"
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || input?.trim() === ""}
            >
              {isLoading ? ( //display spinner during loading
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
