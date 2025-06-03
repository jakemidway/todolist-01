import {Button} from "./Button.tsx";
import {FilterValue} from "./App.tsx";
import {useRef} from "react";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (task: string) => void
    changeFilter: (filterValue: FilterValue) => void
    createTask: (title: string) => void
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
                             createTask
                         }: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const tasksList = tasks.length === 0
        ? <span>Your tasklist is empty</span>
        : <ul>
            {
                tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type='checkbox' checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button onClickHandler={() => {
                                deleteTask(task.id)
                            }} title={'x'}/>
                        </li>
                    )
                })
            }
        </ul>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input ref={inputRef}/>
                <Button title={'+'} onClickHandler={() => {
                   if (inputRef.current){
                       createTask(inputRef.current.value)
                       inputRef.current.value = ''
                   }
                }}/>
            </div>
            {tasksList}
            <div>
                <Button title={"All"} onClickHandler={() => changeFilter('all')}/>
                <Button title={"Active"} onClickHandler={() => changeFilter('active')}/>
                <Button title={"Completed"} onClickHandler={() => changeFilter('completed')}/>

            </div>
        </div>
    );
};

