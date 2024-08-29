import type { Child, PropsWithChildren } from "hono/jsx";

type Props = {
  title: string;
  headChildren?: Child;
};

export function Base({
  title,
  children,
  headChildren,
}: PropsWithChildren<Props>) {
  return (
    <html>
      <head>
        <title>{title}</title>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />

        {headChildren}
      </head>

      <body>{children}</body>
    </html>
  );
}
