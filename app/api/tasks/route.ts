import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks)
}

export async function POST(req: Request) {
    const body = await req.json()

    const task = await prisma.task.create({
        data: {
            title: body.title,
            content: body.content,
            status: Status.TODO
        },
    })

    return NextResponse.json(task)
}