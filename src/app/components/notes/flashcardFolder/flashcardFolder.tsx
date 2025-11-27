"use client";
import { Flashcard, flashcardsApi, Note } from "@/app/api/contentRoutes";
import Button from "../../ui/buttons/button/button";
import { useEffect, useState } from "react";

interface FlashcardFolderProps {
  note: Note;
}

const FlashcardFolder = ({ note }: FlashcardFolderProps) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const data: Flashcard[] = await flashcardsApi.getByNoteId(note.id);
      setCards(data);
    };

    fetchCards();
  }, [note.id]);

  return (
    <div className="h-12 flex items-center w-full">
      <div className="p-3 w-fit bg-neutral grid place-items-center border border-neutral border-r-0 rounded-l">
        <i className="material-symbols-rounded">folder</i>
      </div>
      <div className="grow border border-neutral border-l-0 h-full flex items-center px-2 gap-2 rounded-r justify-between pr-1s">
        <span>{note.title}</span>
        <div>
          <Button
            variant="secondary"
            label={`Practicar ${cards.length}`}
            icon="cards_star"
          />
        </div>
      </div>
    </div>
  );
};

export default FlashcardFolder;
