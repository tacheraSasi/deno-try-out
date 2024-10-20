const handler = (req: Request): Response => {
    return new Response("Hello, Deno!", {
      headers: { "content-type": "text/plain" },
    });
  };
  
  const server = Deno.listen({ port: 8000 });
  console.log("HTTP server is running on http://localhost:8000");
  
  for await (const conn of server) {
    (async () => {
      const httpConn = Deno.serveHttp(conn);
      for await (const requestEvent of httpConn) {
        requestEvent.respondWith(handler(requestEvent.request));
      }
    })();
  }
  