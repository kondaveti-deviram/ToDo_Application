export function extractQueryString(url){
  const parsedURL = new URL(url);
  const params = parsedURL.search;
  const fixedparams = params.replace(/\$/g, "&");
  return new URLSearchParams(fixedparams);
}