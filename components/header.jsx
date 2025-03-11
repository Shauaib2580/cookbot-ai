"use client";

import { useState } from "react";
import { MoonIcon, SunIcon, Menu, X, Settings, Bot } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-2 px-2">
                  <Bot className="h-6 w-6" />
                  <span className="text-lg font-semibold">AI Assistant</span>
                </div>
                <nav className="flex flex-col gap-2">
                  <Button variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                    Home
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                    Models
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                    History
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                    Settings
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <span className="text-lg font-semibold hidden md:inline-block">AI Assistant</span>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <Button variant="ghost" className="text-sm font-medium">
            Home
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Models
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            History
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Settings
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  );
}