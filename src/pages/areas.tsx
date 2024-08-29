import { Hono } from "hono";
import { Base } from "../components/layouts/Base";
import { css, Style } from "hono/css";

const app = new Hono();

const mapClass = css`
  width: 100%;
  height: 100%;
  position: relative;
`;

const drawAreaButtonClass = css`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1;
`;

app.get("/", (c) => {
  const importMap = {
    imports: {
      ol: "https://esm.sh/ol@^10.1.0",
      "ol/": "https://esm.sh/ol@^10.1.0/",
      proj4: "https://esm.sh/proj4@^2.12.0",
    },
  };

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
      <button id="draw-new-area-btn" type="button" class={drawAreaButtonClass}>
        Draw new area
      </button>
      <button
        id="cancel-draw-new-area-btn"
        type="button"
        class={drawAreaButtonClass}
        style="display: none"
      >
        Cancel
      </button>
    </Base>
  );
});

export default app;
