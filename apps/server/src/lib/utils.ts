export const JsonResponse = (
  message: string,
  body: any,
  status: number = 200
): Response => {
  return new Response(JSON.stringify({ message, body }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}
