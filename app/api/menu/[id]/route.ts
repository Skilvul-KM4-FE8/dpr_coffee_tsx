import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

type ParamsType = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: ParamsType) {
  const id = params.id;
  const auth = getAuth(req as NextRequest);

  if (!auth?.userId) {
    return new Response(JSON.stringify({ message: "Unauthorized!" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (!id) {
    return new Response(JSON.stringify({ message: "Transaction ID is required!" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // const menuRes = Prisma.validator<Prisma.MenuSelect>()({
    //     id: true,
    //     name: true
    // })

    const response = await prisma.menu.findFirst({
      where: {
        id: id,
      },
      // select: menuRes
    });

    if (!response) {
      return new Response(JSON.stringify({ message: "NOT FOUND" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log(response);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PATCH(req: Request, { params }: ParamsType) {
  const id = params.id;
  const auth = getAuth(req as NextRequest);
  const payload = await req.json();
  console.log(payload);
  console.log(id);

  if (!id) {
    return new Response(JSON.stringify({ message: "Transaction ID is required!" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!auth?.userId) {
    return new Response(JSON.stringify({ message: "Unauthorized!" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const response = await prisma.menu.update({
      where: {
        id: id,
      },
      data: {
        name: payload.name,
        price: payload.price,
        category: payload.category,
      },
    });
    if (!response) {
      return new Response(JSON.stringify({ message: "NOT FOUND" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log(response);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(req: Request, { params }: ParamsType) {
  const id = params.id;
  const auth = getAuth(req as NextRequest);

  if (!auth?.userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (!id) {
    return new Response(JSON.stringify({ message: "Transaction ID is required!" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await prisma.menu.delete({
      where: {
        id: id,
      },
    });
    console.log(response);
    return new Response(JSON.stringify({ message: "Success", response }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
