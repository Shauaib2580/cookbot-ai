"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Image, Paperclip, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ModelSelector } from "@/components/model-selector";
import { ChatMessage } from "@/components/chat-message";

export function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response after a delay
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!input.trim()) return;
    
      // Add user message
      const userMessage = {
        role: "user",
        content: input,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
    
      try {
        const response = await fetch("http://localhost:5000/get_recipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: input }),
        });
    
        const data = await response.json();
        const aiMessage = {
          role: "assistant",
          content: data.response || "No response from the model.",
          timestamp: new Date(),
        };
    
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setMessages((prev) => [...prev, { role: "assistant", content: "Error: Could not get a response.", timestamp: new Date() }]);
      } finally {
        setIsLoading(false);
      }
    };
    
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Chat</h1>
        <ModelSelector />
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col p-4 overflow-hidden">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 mb-4">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>AI is thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="min-h-[80px] resize-none pr-20 pb-12"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="absolute right-4 bottom-4 flex items-center gap-2">
                  <Button type="button" size="icon" variant="ghost">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button type="button" size="icon" variant="ghost">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button type="button" size="icon" variant="ghost">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="flex-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Chat Settings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium mb-2">Model Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Temperature</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      defaultValue="0.7"
                      className="w-full" 
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Precise</span>
                      <span>Creative</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Length</label>
                    <input 
                      type="range" 
                      min="100" 
                      max="4000" 
                      step="100" 
                      defaultValue="2000"
                      className="w-full" 
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Shorter</span>
                      <span>Longer</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Advanced Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Stream Responses</label>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Save Chat History</label>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Enable Web Search</label>
                    <input type="checkbox" className="toggle" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">LLM Integration</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Configure your LLM model connection settings here. You'll need to provide API keys and endpoint information.
                </p>
                <div className="space-y-2">
                  <label className="text-sm">API Endpoint</label>
                  <input 
                    type="text" 
                    placeholder="https://api.example.com/v1/completions" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2 mt-2">
                  <label className="text-sm">API Key</label>
                  <input 
                    type="password" 
                    placeholder="sk-..." 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}