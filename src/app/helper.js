export default function getIdFromUrl(url) {
  const splitedUrl = url.split("/");
  const preLast = splitedUrl.length - 2;
  return splitedUrl[preLast];
}
