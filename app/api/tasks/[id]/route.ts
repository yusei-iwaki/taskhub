import { prisma } from "@/lib/prisma";
import { updateTaskSchema } from "@/lib/validators/task";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const body = await req.json();
    const parsed = updateTaskSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.flatten() },
            { status: 400 }
        );
    }

    try {
        const task = await prisma.task.update({
            where: {
                id: Number(id),
            },
            data: parsed.data,
        });

        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json(
            { error: "Task not found" },
            { status: 404 }
        );
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        await prisma.task.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json({ message: "deleted" });
    } catch (error) {
        return NextResponse.json(
            { error: "Task not found" },
            { status: 404 }
        );
    }
}