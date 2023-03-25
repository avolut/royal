import { Request, Response } from "hyper-express";

export const apiFrm = (req: Request, res: Response) => {
  // TODO: whitelist origin
  const allowUrl = req.headers.origin || req.headers.referer;

  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "content-type rid");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (allowUrl) {
    res.setHeader("Access-Control-Allow-Origin", allowUrl);
  }

  res.send(`\
<script>
  window.addEventListener('message', async (e) => {
    let res;

    const msg = e.data;
    const init = Object.assign({}, msg.init)

    const url = new URL(msg.input);

    if (init && init.body && init.body instanceof File) {
      const body = new FormData();
      body.append("file", msg.init.body);
      init.body = body;
      res = await fetch(url.pathname, init)
    } else {
      res = await fetch(url.pathname, init)
    }

    if (res) {
      parent.postMessage({result: await res.json(), id: msg.id }, '*')
    }
  })
  parent.postMessage('initialized', '*')
</script>`);
};
