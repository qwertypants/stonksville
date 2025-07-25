/** Chat box using the `ai-sdk` hooks for conversation. */
"use client";
import { useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/retroui/Button";
import { ChatProps } from "@/lib/types";
import { prompt } from "@/lib/constants";

/**
 * Interactive chat panel summarizing analytics context.
 *
 * @param props - Contains the context string used to seed the model.
 */
export default function Chat(props: ChatProps) {
  const { context } = props;
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/chat",
    });

  // Whenever the context changes start a new conversation seeded with it
  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "system",
        content: prompt(context as unknown as string),
      },
      ...messages,
    ]);
  }, [context]);

  if (!context) return null;

  return (
    <div className="flex flex-col max-h-[25vh] w-full  border bg-white">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message) => {
          if (message.role === "system") return null;
          return (
            <div
              key={message.id}
              className={`p-4 flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%]  px-4 py-2 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-accent text-gray-800"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2 w-full justify-between">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="w-full px-2"
            placeholder="Type your message..."
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
}
