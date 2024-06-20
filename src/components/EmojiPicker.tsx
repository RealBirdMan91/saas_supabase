"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiPickerProps {
  value: string;
  onValueChange: (value: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ value, onValueChange }) => {
  const Picker = dynamic(() => import("emoji-picker-react"));
  const [isOpen, setIsOpen] = useState(false);

  function onEmojiClick(emoji: string) {
    onValueChange(emoji);
    setIsOpen(false);
  }

  return (
    <div className="flex items-center">
      <Popover open={isOpen}>
        <PopoverTrigger
          className="cursor-pointe text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value || "🐦"}
        </PopoverTrigger>
        <PopoverContent
          className="p-0
          border-none
        "
        >
          <Picker onEmojiClick={(val) => onEmojiClick(val.emoji)} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmojiPicker;
