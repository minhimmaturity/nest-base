export default function getDomainFromUrl(url) {
  let sld = "";
  try {
    const urlObj = new URL(url);
    const hostnameParts = urlObj.hostname.split(".");
    sld = hostnameParts.slice(-2).join(".");
  } catch (error) {
    console.error("Error parsing the URL:", error);
  }
  return sld;
}
