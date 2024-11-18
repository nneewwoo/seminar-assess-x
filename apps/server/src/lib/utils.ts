export const JsonResponse = (body: any, status: number = 200): Response => {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}
