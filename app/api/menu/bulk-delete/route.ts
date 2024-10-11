import { prisma } from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest } from "next/server"

export async function POST(req: Request) {
    const ids: string[] = await req.json()
    const auth = getAuth(req as NextRequest)

    if(!auth?.userId) {
        return new Response(JSON.stringify({ message: "Unauthorized!"}), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    try {
        const response = await prisma.menu.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        console.log(response)
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error")
        return new Response(JSON.stringify({ message: 'Failed to bulk delete!' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}