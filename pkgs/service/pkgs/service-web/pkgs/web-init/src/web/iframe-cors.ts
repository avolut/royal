import { waitUntil } from "web-utils";
import { createId } from "@paralleldrive/cuid2";
const cuid = createId;

export const createFrameCors = async (url: string, win?: any) => {
  let w = window;
  if (!!win) {
    w = win;
  }
  const document = w.document;

  const id = `__` + url.replace(/\W/g, "");
  if (!document.querySelector(`#${id}`)) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.id = id;

    const _url = new URL(url);
    _url.pathname = "/_api_frm";
    iframe.src = _url.toString();
    await new Promise<void>((resolve) => {
      const onInit = (e: any) => {
        if (e.data === "initialized") {
          iframe.setAttribute("loaded", "y");
          w.removeEventListener("message", onInit);
          resolve();
        }
      };
      w.addEventListener("message", onInit);

      document.body.appendChild(iframe);
    });
  }

  const wm = {} as Record<string, any>;

  const sendRaw = async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => {
    const iframe = w.document.querySelector(`#${id}`) as HTMLIFrameElement;

    if (
      !iframe ||
      !iframe.contentWindow ||
      (iframe && iframe.getAttribute("loaded") !== "y")
    ) {
      await waitUntil(
        () =>
          iframe &&
          iframe.contentWindow &&
          iframe.getAttribute("loaded") === "y"
      );
    }

    return new Promise((resolve) => {
      if (iframe && iframe.contentWindow) {
        const id = cuid();
        wm[id] = (e: any) => {
          if (id === e.data.id) {
            w.removeEventListener("message", wm[id]);
            delete wm[id];
            resolve(e.data.result);
          }
        };
        w.addEventListener("message", wm[id]);
        iframe.contentWindow.postMessage({ input, init, id }, "*");
      }
    });
  };

  return {
    async send(input: string | RequestInfo | URL, data?: any, _headers?: any) {
      const uri = input.toString();
      const headers = { ..._headers };

      if (!(data instanceof w.FormData || data instanceof w.File)) {
        headers["content-type"] = "application/json";
      } else {
        if (data instanceof w.File) {
          let ab = await new Promise<ArrayBuffer | undefined>((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
              resolve(e.target?.result as ArrayBuffer);
            });
            reader.readAsArrayBuffer(data);
          });
          if (ab) {
            data = new File([ab], data.name);
          }
        }
      }

      return sendRaw(
        `${url.endsWith("/") ? url : `${url}/`}${
          uri.startsWith("/") ? uri.substring(1) : uri
        }`,
        data
          ? {
              method: "post",
              headers,
              body:
                data instanceof w.FormData || data instanceof w.File
                  ? data
                  : JSON.stringify(data),
            }
          : {}
      );
    },
  };
};

export const fetchSendApi = async (
  _url: string,
  params: any,
  parentWindow?: any
) => {
  let w = window as any;
  const win = parentWindow || w;
  let url = _url;
  let frm: Awaited<ReturnType<typeof createFrameCors>>;
  if (!win.frmapi) {
    win.frmapi = {};
    win.frmapi[w.serverurl] = await createFrameCors(w.serverurl, win);
  }

  frm = win.frmapi[w.serverurl];

  if (url.startsWith("http")) {
    const purl = new URL(url);
    if (!win.frmapi[purl.host]) {
      win.frmapi[purl.host] = await createFrameCors(
        `${purl.protocol}//${purl.host}`
      );
    }

    frm = win.frmapi[purl.host];
    url = url.substring(`${purl.protocol}//${purl.host}`.length);
  }
  if (!win.apiHeaders) {
    win.apiHeaders = {};
  }

  if (!frm) {
    await waitUntil(() => {
      frm = win.frmapi[w.serverurl];
      return frm;
    });
  }
  return await frm.send(url, params, win.apiHeaders);
};
