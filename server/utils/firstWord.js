function getFirstWord(str) {
  // Trim the string to remove leading and trailing spaces
  const trimmedStr = str.trim();

  // Split the string into an array of words
  const words = trimmedStr.split(" ");

  // Return the first word
  return words[0];
}
module.exports = getFirstWord;
