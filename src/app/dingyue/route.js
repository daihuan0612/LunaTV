export async function GET() {
  const responseData = [
    "https://api.1080zyku.com",
    "https://360zy.com"
  ];
  
  return new Response(JSON.stringify(responseData), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}