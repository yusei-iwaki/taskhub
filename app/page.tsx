'use client';

import { BASE_URL } from "@/lib/constants";
import { useMemo, useState } from "react";

type Tasks = {
  id: number,
  title: string,
  content?: string,
}

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [tasks, setTasks] = useState<Array<Tasks>>([]);

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

  useMemo(() => {
    getTasks();
  }, [])

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={createTask}>追加する</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
