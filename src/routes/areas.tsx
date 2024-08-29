import { Hono } from "hono";
import { Base } from "../components/layouts/Base";
import { css, Style } from "hono/css";

const app = new Hono();

app.get("/", (c) => {
  const importMap = {
    imports: {
      ol: "https://esm.sh/ol@^10.1.0",
      "ol/": "https://esm.sh/ol@^10.1.0/",
      proj4: "https://esm.sh/proj4@^2.12.0",
    },
  };

  const mapClass = css`
    height: 100%;
  `;

  return c.html(
    <Base
      title="Areas"
      headChildren={
        <>
          <Style />
          <link rel="stylesheet" href="/static/map.css" />
          <script
            type="importmap"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(importMap) }}
          ></script>
          <script type="module" src="/static/map.js"></script>
        </>
      }
    >
      <div id="map" class={mapClass}></div>
    </Base>
  );
});

export default app;
