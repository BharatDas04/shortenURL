import shortenURL from "../database/models/shortenURLs.js";

export const statsURL = async (req, res) => {
  const urlID = req.params.code;
  const lengthOfID = urlID.length;

  // Validation
  if (lengthOfID > 5 || lengthOfID < 5) {
    return res.status(404).send({ error: "URL doesn't exist" });
  }
  console.log("IN STATS");
  // Searching Database
  const result = await shortenURL.findAll({
    where: { shortCode: urlID },
  });

  if (!result) {
    return res.status(404);
  }

  // Return Data
  res.status(200).send(result);
};
