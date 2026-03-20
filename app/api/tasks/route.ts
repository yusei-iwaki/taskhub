import { prisma } from "@/lib/prisma";
import { createTaskSchema } from "@/lib/validators/task";
import { NextResponse } from "next/server";

export async function GET() {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks)
}

export async function POST(req: Request) {
    const body = await req.json()
    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.flatten() },
            { status: 400 }

        )
    }
    const task = await prisma.task.create({
        data: parsed.data,
    })

    return NextResponse.json(task)
}