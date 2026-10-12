
export async function onRequest() {
  return Response.json({
    ok: true,
    service: "Flab2Fit API",
    message: "Backend is running"
  });
}
