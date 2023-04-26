import "./aboutus.css";

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

import footprint from "./pic/footprint.svg"
import cat from "./pic/cat.svg"
import animals from "./pic/animals.png"


export default function AboutUs(){
    
    return(

        <div className="flexCol aboutUs">
    
            <div className="contentBox flexRow aboutHeader">
                <div className="">
                    <h1>Welcome to PetHotel</h1>
                    <h2>A Place to share your loved ones</h2>
                </div>
                <div className="">
                    <img src={footprint} alt="Footprint"/>
                </div>
            </div>

            <div className="flexRow aboutContent">
                <div className="contentBox aboutBox">
                    <div className="boxHead"> 
                        <span> About Us </span>
                        <img src={cat} alt="Cat" className="headAvatar"/>
                    </div>
                    <p>
                        On PetHotel you can share Pictures of your Animals and interact with other users.
                        <br></br><br></br>
                        The PetFeed lists all new posts.
                    </p>
                </div>
                <div className="contentBox lineChart">
                    <div className="boxHead"> 
                        <span> A Growing Community </span>
                        <img src={animals} alt="AnimalGlobe" className="headAvatar"/>
                    </div>
                    <div style={{width:"100%",height:"85%"}}>
                        <Chart 
                            type='bar' 
                            data={chartData}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const chartData = {
    labels: ["2017","2018", "2019","2020","2021","2022", "2023"],
    datasets: [
      {
        label: 'Number of active Users',
        data: [1465,1843, 2354, 2203, 2634, 3745, 4634],
        backgroundColor: '#427358',
      },
    ],
}

