import {prisma} from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest } from "next/server"

export async function GET(req: Request, {params}: {params: {id: string}}) {
    const id = params.id
    const auth = getAuth(req as NextRequest)

    if (!auth?.userId) {
        return new Response(JSON.stringify({ message: "Unauthorized!"}), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    try {
        const response = await prisma.menu.findFirst({
            where: {
                id: id
            }
        })

        if (!response) {
            return new Response(JSON.stringify({message: "NOT FOUND",}), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        
        console.log(response)
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            } 
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: error,}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}