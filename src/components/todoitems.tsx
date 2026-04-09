import { Checkbox } from './ui/checkbox';
import { MdDelete } from "react-icons/md";
const TodoItems = ({item, onDelete , onComplete, onInComplete}) => {
    const handleComplete = (checked: any, id: string) => {
        if (checked) {
            onComplete(id);
        } else {
            onInComplete(id);
        }
        console.log(id);
    }
    
    return (
        <div className='flex items-center gap-2'>
            <Checkbox checked={item.completed} onCheckedChange={(checked) => handleComplete(checked, item.id)}/>
            <p className={item.completed ? 'line-through': ''}>{item.task}</p>
            {item.completed && <MdDelete className='text-red-500' onClick={() => onDelete ? onDelete(item.id): null} />}
        </div>
    );
};

export default TodoItems;