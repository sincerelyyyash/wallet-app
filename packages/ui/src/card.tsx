import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-6 bg-white rounded-xl"
    >
      <h1 className="text-2xl md:mt-0
            font-bold bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-50 to-neutral-400 p-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}
