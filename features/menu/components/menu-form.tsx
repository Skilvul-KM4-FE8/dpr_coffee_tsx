"use client"

import { z } from "zod"

const formSchma = z.object({
    menu: z.string(),
    price: z.number(),
})