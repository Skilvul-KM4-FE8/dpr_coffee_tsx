export async function POST(req: Request) {
    try {
        // Parse the JSON body from the request
        const payload = await req.json(); // Use await to parse the JSON

        console.log({ payload });

        // You can handle the payload here, e.g., save it to the database

        return new Response(JSON.stringify({ payload }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error parsing request body:', error);
        return new Response(JSON.stringify({ message: 'Failed to parse request' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
