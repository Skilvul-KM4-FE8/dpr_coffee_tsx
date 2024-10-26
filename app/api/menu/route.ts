import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const auth = getAuth(req as NextRequest);
  console.log(auth.userId);
  // console.log({ auth });
  if (!auth?.userId) {
    return new Response(JSON.stringify({ message: "Unauthorized!" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Parse the JSON body from the request
    const payload = await req.json(); // Use await to parse the JSON

    console.log({ payload });

    // You can handle the payload here, e.g., save it to the database

    const response = await prisma.menu.create({
      data: {
        name: payload.name,
        price: payload.price,
        category: payload.category,
        userId: auth.userId,
      },
    });

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(JSON.stringify({ message: "Failed to parse request" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function GET(req: Request) {
  const auth = getAuth(req as NextRequest);
  if (!auth?.userId) {
    return new Response(JSON.stringify({ message: "Unauthorized!" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const data = await prisma.menu.findMany({
      where: {
        userId: auth.userId,
      },
    });
    console.log({ data });

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(JSON.stringify({ message: "Failed to parse request" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
