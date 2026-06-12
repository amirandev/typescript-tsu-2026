import { useState } from "react";
import { translations } from "./core/translations";
import { student } from "./core/student";
import './assets/app.css';

function App() {
    const [lang, setLang] = useState('ge' as String);

    let label = lang == 'en' ? translations.en : translations.ge;

    return <div className="container mt-3">
        <h1>ინფორმაცია მოცემულია {lang}-ად</h1>
        <header>
            <button type="button" onClick={() => setLang('ge')} className={` ${lang == 'ge' && 'currentLanguage'} `}>
                ქართული
            </button>
            <span> | </span>
            <button type="button" onClick={() => setLang('en')} className={` ${lang == 'en' && 'currentLanguage'} `}>
                ინგლისური
            </button>
        </header>
        <h2>{label.student_info}</h2>
        <ul className="list-group">
            <li className="list-group-item">{label.firstname}: {student.firstname} {student.lastname}</li>
            <li className="list-group-item">{label.country}: {student.country}</li>
            <li className="list-group-item">{label.city}: {student.city}</li>
            <li className="list-group-item">{label.university}:  {student.university}</li>
            <li className="list-group-item">{label.acad_step}: {student.acad_step}</li>
            <li className="list-group-item">{label.email}: {student.email}</li>
            <li className="list-group-item">{label.phone}: {student.phone}</li>
            <li className="list-group-item">{label.is_active} {student.is_active ? 'აქტიური' : 'შეჩერებული'}</li>
        </ul>
    </div>
}

export default App