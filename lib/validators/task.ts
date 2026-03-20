import { z } from 'zod'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export const statusEnum = z.enum(['TODO', 'DOING', 'DONE']).openapi({
    description: 'タスクのステータス',
})

export const createTaskSchema = z.object({
    title: z.string().min(1, 'タイトル必須').openapi({
        example: 'タスクタイトル',
    }),
    content: z.string().optional(),
    status: statusEnum.optional(),
}).openapi('CreateTask')

export const updateTaskSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    status: statusEnum.optional(),
}).openapi('UpdateTask')