import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from './../firebase';
import { Link } from 'react-router-dom';
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend)
function Departments() {
    const { depts } = useContext(AppContext)
    const [loading, setLoading] = useState(true)
    const [feedBacksUsersByDepts, setFeedBacksUsersByDepts] = useState({})
    async function getData() {
        const d = {};
        for (let i = 0; i < depts.length; i++) {
            const { abbr } = depts[i];
            const dd = [];
            const deptFeedBackDocs = await getDocs(query(collection(db, "feedbacksUsers"), where("department", "==", abbr)));
            for (let j = 0; j < deptFeedBackDocs.docs.length; j++) {
                const deptFeedBackDoc = deptFeedBackDocs.docs[j];
                dd.push({ ...deptFeedBackDoc.data(), id: deptFeedBackDoc.id });
            }
            d[abbr] = dd;
        }
        setFeedBacksUsersByDepts(d);
        setLoading(false)
    }
    useEffect(() => {
        getData();
        return () => {
        }
    }, [depts])

    return loading ? <div>Loading..</div> : (
        <div className="deptwise-view">
            {depts.map(dept => <ShowDept name={dept.name} courses={dept.courses} data={feedBacksUsersByDepts[dept.abbr]} key={dept.id} />)}
        </div>
    )
}

export default Admin
function Admin() {
    return <div className='view admin'>
        <ViewInDiagrams category={"college"} />
        <Departments />
        <Link to="/create"><button className='btn'>Create</button></Link>

    </div>
}
function ShowDept({ data = [], name, courses }) {
    return <Link className="dept">
        <p>{name} <span>({data.length})</span></p>
        <div className="dept-diagrams">
            {courses.map(course => <div key={course}>
                <ViewInDiagrams showLabel={false} width='200px' category={course} />
                <p>{course}</p>
            </div>
            )}
        </div>
        <p>
        </p>
    </Link>
}

function ViewInDiagrams({ category, width = "500px", showLabel = true }) {
    const [loading, setLoading] = useState(true)
    const options = ["Positive", "Neutral", "Negative"];
    const [data, setData] = useState([]);
    const [percView, setPercView] = useState(null)
    async function getData() {
        const d = [];
        const dd = {};
        for (let i = 0; i < options.length; i++) {
            const docs = await getDocs(query(collection(db, "feedbacks"), where("category", "==", category), where("answer", "==", options[i])));
            d.push(docs.docs.length);
            dd[options[i]] = docs.docs.length;
        }
        const sum = d.reduce((prev, c) => prev + c);
        setPercView({ ...dd, sum: sum === 0 ? 1 : sum });
        setData(d);
        setLoading(false)
    }
    useEffect(() => {
        getData();
    }, [])

    return loading ? <h2>Pie Chart Loading...</h2> : <div style={{ 'width': width }}>
        <ShowPieChart data={{
            labels: options, datasets: [
                {
                    normalized: true,
                    label: '# of Feedbacks',
                    data,
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(255, 206, 86)',
                    ],

                },
            ],
        }} />
        {percView && showLabel && <div style={{ 'textAlign': "center", "marginTop": ".5em" }}>
            {options.map(option => <span key={option}>{option}: {(Math.ceil(percView[option] / percView['sum'] * 100))}%  </span>)}
        </div>}
    </div>
}


function ShowPieChart({ data }) {
    return <Pie options={{ maintainAspectRatio: true }} className='chart' data={data} />
}