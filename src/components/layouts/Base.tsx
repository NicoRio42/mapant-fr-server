import type { PropsWithChildren } from "hono/jsx";

type Props = {
  title: string;
};

export function Base({ title, children }: PropsWithChildren<Props>) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <script
          src="https://unpkg.com/htmx.org@2.0.2"
          integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ"
          crossorigin="anonymous"
          defer
        ></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
