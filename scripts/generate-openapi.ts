import { z } from 'zod'
import {
    OpenAPIRegistry,
    OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi'
import { createTaskSchema, updateTaskSchema } from '../lib/validators/task'
import fs from 'fs'

const registry = new OpenAPIRegistry()

// schema登録
registry.register('CreateTask', createTaskSchema)
registry.register('UpdateTask', updateTaskSchema)

// paths定義
registry.registerPath({
    method: 'get',
    path: '/api/tasks',
    responses: {
        200: {
            description: 'タスク一覧取得',
        },
    },
})

registry.registerPath({
    method: 'post',
    path: '/api/tasks',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: createTaskSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: '作成成功',
        },
    },
})

registry.registerPath({
    method: 'put',
    path: '/api/tasks/{id}',
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            content: {
                'application/json': {
                    schema: updateTaskSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: '更新成功',
        },
    },
})

registry.registerPath({
    method: 'delete',
    path: '/api/tasks/{id}',
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: '削除成功',
        },
    },
})

const generator = new OpenApiGeneratorV3(registry.definitions)

const doc = generator.generateDocument({
    openapi: '3.0.0',
    info: {
        title: 'TaskHub API',
        version: '1.0.0',
    },
})

fs.mkdirSync('./public/openapi', { recursive: true })
fs.writeFileSync('./public/openapi/openapi.json', JSON.stringify(doc, null, 2))

console.log('✅ OpenAPI生成完了')