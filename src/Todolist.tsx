import {Button} from "./Button.tsx";
import {FilterValue} from "./App.tsx";
import {useState} from "react";

type Props = {
    title: string
    tasks: Task[]
    filter: FilterValue
    deleteTask: (taskId: Task['id']) => void
    changeFilter: (filterValue: FilterValue) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: Task['id'], newStatus: Task['isDone']) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({
                             title,
                             tasks,
                             deleteTask,
                             changeFilter,
                             createTask,
                             changeTaskStatus,
                             filter,
                         }: Props) => {

    // const inputRef = useRef<HTMLInputElement>(null);

    const [taskTitle, setTaskTitle] = useState("")

    const tasksList = tasks.length === 0
        ? <span>Your task list is empty</span>
        : <ul>
            {
                tasks.map(task => {
                    return (
                        <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                            <input
                                type='checkbox'
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
                            />
                            <span>{task.title}</span>
                            <Button onClickHandler={() => {
                                deleteTask(task.id)
                            }} title={'x'}/>
                        </li>
                    )
                })
            }
        </ul>

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={e => setTaskTitle(e.currentTarget.value)}
                    onKeyDown={e => e.key === 'Enter' && createTaskHandler()}
                    placeholder={"max 15 charters"}
                />
                <Button
                    title={'+'}
                    disabled={taskTitle === '' || taskTitle.length >= 15}
                    onClickHandler={() => {
                        createTaskHandler()
                    }}
                />
                {taskTitle && taskTitle.length <= 15 && <div>max 15 charters</div>}
                {taskTitle.length > 15 && <div style={{color: 'red'}}> 15 charters</div>}

            </div>
            {tasksList}
            <div>
                <Button title={"All"} onClickHandler={() => changeFilter('all')}
                        className={filter === 'all' ? 'btn-filter-active' : undefined}
                />
                <Button title={"Active"} onClickHandler={() => changeFilter('active')}
                        className={filter === 'active' ? 'btn-filter-active' : undefined}/>
                <Button title={"Completed"} onClickHandler={() => changeFilter('completed')}
                        className={filter === 'completed' ? 'btn-filter-active' : undefined}
                />

            </div>
        </div>
    );
};

