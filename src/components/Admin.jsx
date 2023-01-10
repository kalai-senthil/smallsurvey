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
            {depts.map(dept => <ShowDept name={dept.name} data={feedBacksUsersByDepts[dept.abbr]} key={dept.id} />)}
        </div>
    )
}

export default Admin
function Admin() {
    return <div className='view admin'>
        <ViewInDiagrams />
        <Departments />
    </div>
}
function ShowDept({ data = [], name }) {
    return <Link className="dept">
        <p>{name}</p>
        <p>
            <span>
                {data.length}
            </span> feedbacks
        </p>
    </Link>
}

function ViewInDiagrams() {
    const [loading, setLoading] = useState(true)
    const options = ["Positive", "Neutral", "Negative"];
    const [data, setData] = useState([]);
    async function getData() {
        const d = [];
        for (let i = 0; i < options.length; i++) {
            const docs = await getDocs(query(collection(db, "feedbacks"), where("answer", "==", options[i])));
            d.push(docs.docs.length);
        }
        setData(d);
        setLoading(false)
    }
    useEffect(() => {
        getData();
    }, [])

    return loading ? "Pie Chart Loading..." : <div>

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
    </div>
}


function ShowPieChart({ data }) {
    return <Pie className='chart' data={data} />
}