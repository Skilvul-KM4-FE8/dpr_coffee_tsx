import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = getAuth(req as NextRequest);
  const payload = await req.json();

  if (!auth?.userId) {
    return new Response(JSON.stringify({ message: "Unauthorized!" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const response = await prisma.transaction.create({
      data: {
        userId: auth.userId,
        receptionist: payload.receptionist,
        customer: payload.customer,
        totalPrice: payload.totalPrice,
        items: {
          create: payload.items.map((item: any) => ({
            quantity: item.quantity,
            menu: {
              connect: {
                id: item.id,
              },
            },
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // return new Response(JSON.stringify( response ), {
    //     status: 200,
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });
    return NextResponse.json(response, { status: 201 });
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
    return NextResponse.json({ message: "Unauthorized!", status: 401 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: auth.userId,
      },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
    });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
