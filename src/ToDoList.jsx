import { useState, useEffect } from "react";
import { MdOutlineKeyboardDoubleArrowUp, MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import icon from "/src/assets/icon.svg";

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskTime, setTaskTime] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleDateChange(event) {
        setTaskDate(event.target.value);
    }

    function handleTimeChange(event) {
        setTaskTime(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "" && taskDate && taskTime) {
            const newTasks = [
                ...tasks,
                {
                    text: newTask,
                    date: taskDate,
                    time: taskTime,
                    completed: false,
                },
            ];
            setTasks(newTasks);
            setNewTask("");
            setTaskDate("");
            setTaskTime("");
        }
    }

    function deleteTask(taskToDelete) {
        const updatedTasks = tasks.filter((task) => task !== taskToDelete);
        setTasks(updatedTasks);
    }

    function toggleTaskCompletion(taskToToggle) {
        const updatedTasks = tasks.map((task) =>
            task === taskToToggle
                ? { ...task, completed: !task.completed }
                : task
        );
        setTasks(updatedTasks);
    }

    function moveTaskUp(taskToMove) {
        const index = tasks.findIndex((task) => task === taskToMove);
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [
                updatedTasks[index - 1],
                updatedTasks[index],
            ];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(taskToMove) {
        const index = tasks.findIndex((task) => task === taskToMove);
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [
                updatedTasks[index + 1],
                updatedTasks[index],
            ];
            setTasks(updatedTasks);
        }
    }

    function openGithub(event) {
        event.preventDefault();
        window.open("https://github.com/AE-Hertz", "_blank");
    }

    return (
        <>
            <div>
                <header>
                    <figure>
                        <img onClick={openGithub} src={icon} />
                    </figure>
                    <nav>
                        <ul>
                            <p>I</p>
                            <p>Am</p>
                            <p>Hertz</p>
                            <p> | </p>
                            <p>Abhinandan</p>
                        </ul>
                    </nav>
                </header>
            </div>
            <div className="to-do-list">
                <h1>To-Do List</h1>

                <div>
                    <input
                        type="text"
                        placeholder="Enter a Task..."
                        value={newTask}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        value={taskDate}
                        onChange={handleDateChange}
                    />
                    <input
                        type="time"
                        value={taskTime}
                        onChange={handleTimeChange}
                    />
                    <button className="add-button" onClick={addTask}>
                        ADD
                    </button>
                </div>

                <div className="task-columns">
                    <div className="pending-tasks">
                        <h2>Pending</h2>
                        <ol>
                            {tasks
                                .filter((task) => !task.completed)
                                .map((task) => (
                                    <li key={task.text}>
                                        <span className="text">
                                            {task.text}
                                        </span>
                                        <span className="date">
                                            {task.date} {task.time}
                                        </span>
                                        <button
                                            className="complete-button"
                                            onClick={() =>
                                                toggleTaskCompletion(task)
                                            }
                                        >
                                            ✔️
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteTask(task)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="move-button"
                                            onClick={() => moveTaskUp(task)}
                                        >
                                            <MdOutlineKeyboardDoubleArrowUp/>
                                        </button>
                                        <button
                                            className="move-button"
                                            onClick={() => moveTaskDown(task)}
                                        >
                                            <MdOutlineKeyboardDoubleArrowDown />
                                        </button>
                                    </li>
                                ))}
                        </ol>
                    </div>

                    <div className="completed-tasks">
                        <h2>Completed</h2>
                        <ol>
                            {tasks
                                .filter((task) => task.completed)
                                .map((task) => (
                                    <li key={task.text}>
                                        <span
                                            className="text"
                                            style={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            {task.text}
                                        </span>
                                        <span className="date">
                                            {task.date} {task.time}
                                        </span>
                                        <button
                                            className="complete-button"
                                            onClick={() =>
                                                toggleTaskCompletion(task)
                                            }
                                        >
                                            ❌
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteTask(task)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="move-button"
                                            onClick={() => moveTaskUp(task)}
                                        >
                                            <MdOutlineKeyboardDoubleArrowUp />
                                        </button>
                                        <button
                                            className="move-button"
                                            onClick={() => moveTaskDown(task)}
                                        >
                                            <MdOutlineKeyboardDoubleArrowDown />
                                        </button>
                                    </li>
                                ))}
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToDoList;
