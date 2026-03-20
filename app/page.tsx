'use client';

import { BASE_URL } from "@/lib/constants";
import { Status } from "@prisma/client";
import { useEffect, useState } from "react";

type Task = {
  id: number,
  title: string,
  content?: string,
  status: Status,
}

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const getTasks = async () => {
    const res = await fetch(`${BASE_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  }

  const createTask = async () => {
    await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify({ title })
    })
    getTasks();
  };

  const updateTask = async (id: number, status: Status) => {
    await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: status
      })
    })

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
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={createTask}>追加する</button>

      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            <li>{task.title}<span>{task.status}</span></li>
            <select onChange={(e) => updateTask(task.id, e.target.value as Status)}>
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
