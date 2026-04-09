import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import './App.css'
import TodoItems from './components/todoitems';
import type { Item } from './models/items';

function App() {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState<Item[]>(()=> {
    const tasks = sessionStorage.getItem('tasks');
    if(tasks) {
      return JSON.parse(tasks) as Item[];
    } else {
      return [];
    }
  });

  useEffect(()=> {
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (value.trim()) {
      setTasks([...tasks, {task:value, completed:false, id: Date.now().toString()}]);
      setValue('');
      console.log(tasks);
    }
  }
  
  const onComplete = (id: string) => {
    setTasks([...tasks.map(ele => ele.id === id ? {...ele, completed:true} : ele)]);
  }

  const onInComplete = (id: string) => {
    setTasks([...tasks.map(ele => ele.id === id ? {...ele, completed:false} : ele)]);
  }

  const onDelete = (id:string) => {
    setTasks([...tasks.filter(ele => ele.id !== id)]);
  }

  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <div>
        <div className='flex gap-2'>
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Type your task here...' />
          <Button disabled={value.trim() === ''} onClick={handleAddTask}>Add Task</Button>
        </div>

        <div className='mt-[1vh]'>
          {tasks.map((item) => (
            <TodoItems item={item} onDelete={onDelete} key={item.id} onComplete={onComplete} onInComplete={onInComplete} />
          ))}
        </div>
      </div>
      
    </div>
    
  )
}

export default App
