import shortenURL from "../database/models/shortenURLs.js";

function* uniqueCodeGenerator() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  while (true) {
    let code = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    yield code;
  }
}

function isValidURL(urlString) {
  var regex =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return regex.test(urlString);
}

export const createShortURL = async (req, res) => {
  const url = req.body.url;
  if (!isValidURL(url)) {
    return res.status(400).send({ error: "invalid URL" });
  }

  const exists = await shortenURL.findAll({
    where: { url: url },
  });

  if (exists.length > 0) {
    return res.status(400).send({ error: "URL Exists, Please use Update" });
  }

  let code = uniqueCodeGenerator().next();
  const stored = await shortenURL.create({
    url: url,
    shortCode: code.value,
    accessCount: 0,
  });
  return res.status(201).send(stored);
};
