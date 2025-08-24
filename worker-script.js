addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  //constants 
  const redirectUrl = "https://developers.cloudflare.com/workers/about/";
  const redirectStatusCode = 302;

  // Get the User-Agent and Cookie headers from the request.
  const userAgent = request.headers.get('user-agent') || "";
  const cookie = request.headers.get('cookie') || "";

  // Define the bypass cookie name and value.
  const bypassCookieName = "cf-noredir";
  const bypassCookieValue = "true";
  const hasBypassCookie = cookie.includes(`${bypassCookieName}=${bypassCookieValue}`);

  // Check if the User-Agent is cURL AND the bypass cookie is not present.
  if (userAgent.toLowerCase().includes('curl') && !hasBypassCookie) {
    // If the condition is met, perform a redirect.
    console.log(`cURL request detected without bypass cookie. Redirecting to: ${redirectUrl}`);
    return Response.redirect(redirectUrl, redirectStatusCode);
  }

  // If redirect is not needed (the conditions for redirect are not met), fetch the original request with a **proxy to the tunnel**
  const url = new URL(request.url);
  url.hostname = 'tunnel.niv-headers-demo.online';
  
  // Create a new request with the modified URL
  const modifiedRequest = new Request(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: request.redirect
  });
  
  return fetch(modifiedRequest);
}
