import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import './App.css'
import TodoItems from './components/todoitems';
import type { Item } from './models/items';

function App() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState<Item[]>(()=> {
    const items = sessionStorage.getItem('items');
    if(items) {
      return JSON.parse(items) as Item[];
    } else {
      return [];
    }
  });

  useEffect(()=> {
    sessionStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleAddTask = () => {
    if (value.trim()) {
      setItems([...items, {task:value, completed:false, id: Date.now().toString()}]);
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
    <div className="flex w-[100vw] h-[100vh] justify-center items-start">
      <div className="pt-8">
        <div className='flex gap-2'>
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Type your task here...' />
          <Button disabled={value.trim() === ''} onClick={handleAddTask}>Add Task</Button>
        </div>

        <div className='mt-[1vh]'>
          {items.map((item) => (
            <TodoItems item={item} onDelete={onDelete} key={item.id} onComplete={onComplete} onInComplete={onInComplete} />
          ))}
        </div>
      </div>
      
    </div>
    
  )
}

export default App
