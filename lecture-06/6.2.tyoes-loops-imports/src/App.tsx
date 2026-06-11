import {courses} from "./data/courses";

function App() {
    return <div className="container my-4">
        <h1>Lets learn anonymus functions and imports</h1>
        <ul className="list-group">
            {
                courses.map((course, index) => <>
                    <li className="list-group-item d-flex justify-content-between">
                        <strong>{index}.  {course.title} </strong>
                        <span className={`badge ${course.is_availble ? 'bg-success' : 'bg-danger'} `}>
                            { course.is_availble ? 'ხელკმისაწვდომია' : 'არ არის ხელმისაწვდომი' }
                        </span>
                    </li>
                </>)
            }
        </ul>
    </div>
}

export default App;