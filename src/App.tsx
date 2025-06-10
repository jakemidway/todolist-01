import './App.css'
import {Task, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";


export type FilterValue = 'all' | 'active' | 'completed'

export const App = () => {



    const todolistTitle1 = "What to learn"

    const [tasks, setTask] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (tid: Task["id"]) => {
        //1. Иммутабельно
        // 2. Для обновления state использовать setState

        const nextState = tasks.filter((task: Task) => task.id !== tid)
        setTask(nextState)
    }

    const createTask = (nameTask: string) => {
        //1. Иммутабельно
        // 2. Для обновления state использовать setState

        const newTask: Task ={
            id: v1(),
            title: nameTask,
            isDone: false
        }
        const nextState: Task[] = [...tasks, newTask]
        setTask(nextState)
    }

    const changeTaskStatus = (taskId: Task["id"]) => {
        const nextState: Task[] = tasks.map(t => t.id === taskId ? {...t, isDone: !t.isDone}: t)
        setTask(nextState)
    }

    // UI

    const [filter, setFilter] = useState<FilterValue>('all')

    let filteredTasks: Task[] = tasks
    if(filter==='active'){
        filteredTasks = filteredTasks.filter(task => !task.isDone)
    }
    if(filter==='completed'){
        filteredTasks = filteredTasks.filter(task => task.isDone)
    }

    const changeFilter = (filterValue: FilterValue): void => {
        setFilter(filterValue)
    }

    return (
        <div className="app">
            <Todolist
                title={todolistTitle1}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}


