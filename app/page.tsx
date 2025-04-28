import { Chat } from "@/components/chat" 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">AI Chat Assistant</h1>
        <p className="mb-8 text-muted-foreground">
          Ask any question and get real-time responses from our AI assistant.
        </p>
        <Chat />
      </div>
    </main>
  )
}
