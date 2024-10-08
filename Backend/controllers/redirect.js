import shortenURL from "../database/models/shortenURLs.js";

export const redirectShortenURLs = async (req, res) => {
  const urlID = req.params[0];
  const lengthOfID = urlID.length;

  // Validation
  if (lengthOfID > 5 || lengthOfID < 5) {
    return res.status(400).send({ error: "Resource not found" });
  }

  // Update the visited
  await shortenURL.increment("accessCount", {
    by: 1,
    where: { shortCode: urlID },
  });

  try {
    const result = await shortenURL.findOne({
      where: { shortCode: urlID },
    });
    if (result !== null) {
      return res.status(200).send(result.dataValues);
    } else {
      return res.status(400);
    }
  } catch (error) {
    console.error("Error checking short code existence:", error);
  }
};
