import { ItemCardList } from "@/components/item-card-list";

export default function Shop() {
  return (
    <div className="min-h-screen p-4 pattern-overlay">
      <div className="w-full max-w-8xl mx-auto">
        <ItemCardList />
      </div>
    </div>
  );
} 