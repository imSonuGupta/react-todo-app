import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import TodoItems from './components/todoitems';
import type { Item } from './models/items';
import todoservice from './components/todoservice';
import './App.css'

function App() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=> {
    const fetchTodoItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const id = String(Math.floor(Math.random() * 200) + 1);
        const data = await todoservice.getTodoItemById(id);
        setItems([data]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch todos');
      } finally {
        setLoading(false);
      }
    }
    fetchTodoItems();
  }, []);


  const handleAddTask = () => {
    if (value.trim()) {
      setItems([...items, {title:value, completed:false, id: Date.now().toString()}]);
      setValue('');
      console.log(items);
    }
  }
  
  const onComplete = (id: string) => {
    setItems([...items.map(ele => ele.id === id ? {...ele, completed:true} : ele)]);
  }

  const onInComplete = (id: string) => {
    setItems([...items.map(ele => ele.id === id ? {...ele, completed:false} : ele)]);
  }

  const onDelete = (id:string) => {
    setItems([...items.filter(ele => ele.id !== id)]);
  }

  return (
    <div className="flex w-[100vw] h-[100vh] justify-start items-start">
      <div className="p-7">
        <h2 className='text-2xl font-bold mb-4'>To-Do List</h2>
        <div className='flex gap-2'>
          <Input className='w-[50vw]' value={value} onChange={(e) => setValue(e.target.value)} placeholder='Type your task here...' />
          <Button disabled={value.trim() === ''} onClick={handleAddTask}>Add Task</Button>
        </div>

        <div className='mt-[2vh] max-w-2xl'>
          {loading && <p>Loading...</p>}
          {error && <p className='text-red-500'>{error}</p>}
          {items.map((item) => (
            <TodoItems item={item} onDelete={onDelete} key={item.id} onComplete={onComplete} onInComplete={onInComplete} />
          ))}
        </div>
      </div>
      
    </div>
    
  )
}

export default App
