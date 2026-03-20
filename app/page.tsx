'use client';

import { BASE_URL } from "@/lib/constants";
import { createTaskSchema, updateTaskSchema } from "@/lib/validators/task";
import { Status } from "@prisma/client";
import { useEffect, useState } from "react";
import { z } from "zod";

type Task = {
  id: number,
  title: string,
  content?: string,
  status: Status,
}

// 👇 zodから型生成
type CreateTask = z.infer<typeof createTaskSchema>
type UpdateTask = z.infer<typeof updateTaskSchema>

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [error, setError] = useState<any>(null);

  const getTasks = async () => {
    const res = await fetch(`${BASE_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  }

  const createTask = async (task: CreateTask) => {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })

    if (!res.ok) {
      const errorData = await res.json()
      setError(errorData.error)
      return
    }

    setError(null)
    setTitle('')
    getTasks();
  };

  const updateTask = async (id: number, input: UpdateTask) => {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })

    if (!res.ok) {
      const errorData = await res.json()
      setError(errorData.error)
      return
    }

    setError(null)
    getTasks();
  }

  const deleteTask = async (id: number) => {
    await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    })

    getTasks()
  }

  useEffect(() => {
    getTasks();
  }, [])

  return (
    <div>
      <input type="text" value={title} onChange={(e) => {
        setTitle(e.target.value);
        setError(null)
      }} />
      <button onClick={() => createTask({ title })}>追加する</button>

      {/* 👇 エラーメッセージ表示 */}
      {error?.fieldErrors?.title && (
        <p style={{ color: 'red' }}>
          {error.fieldErrors.title[0]}
        </p>
      )}

      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            <li>{task.title}<span>{task.status}</span></li>
            <select onChange={(e) => updateTask(task.id, { status: e.target.value as Status })}>
              <option value={Status.TODO}>TODO</option>
              <option value={Status.DOING}>DOING</option>
              <option value={Status.DONE}>DONE</option>

            </select>
            <button onClick={() => deleteTask(task.id)}>削除</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
