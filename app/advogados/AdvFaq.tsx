"use client";

import { useRef, useState } from "react";

type QA = { q: string; a: React.ReactNode };

/**
 * Accordion do FAQ (Bloco E do branding). Perguntas reais de um advogado
 * cético — legalidade, cessão, deságio, independência do cliente.
 * Animação por max-height; acessível (button + aria-expanded/controls).
 */
export function AdvFaq({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="adv-faq__list">
      {items.map((it, i) => (
        <FaqItem
          key={i}
          index={i}
          item={it}
          open={open === i}
          onToggle={() => setOpen((cur) => (cur === i ? null : i))}
        />
      ))}
    </div>
  );
}

function FaqItem({
  index,
  item,
  open,
  onToggle,
}: {
  index: number;
  item: QA;
  open: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const panelId = `adv-faq-panel-${index}`;
  const btnId = `adv-faq-btn-${index}`;

  return (
    <div className="adv-faq__item">
      <button
        id={btnId}
        type="button"
        className="adv-faq__q"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {item.q}
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="adv-faq__a"
        ref={bodyRef}
        style={{ maxHeight: open ? `${bodyRef.current?.scrollHeight ?? 600}px` : 0 }}
      >
        <div>{item.a}</div>
      </div>
    </div>
  );
}
