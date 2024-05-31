import http from "node:http";
import formidable from "formidable";

export async function formdata(
  req: http.IncomingMessage,
  res: http.ServerResponse,
) {
  if (req.headers?.["content-type"]?.includes("multipart/form-data")) {
    const form = formidable({});
    let fields;
    let files;

    try {
      [fields, files] = await form.parse(req);
      req.files = files;
    } catch (err) {
      console.error(err);
      return res.writeHead(400).end(JSON.stringify(err));
    }
  }
}
