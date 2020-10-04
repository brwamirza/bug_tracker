import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/dashboard.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import TicketService from "../services/ticket.service";
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BarChart, Bar,  XAxis, YAxis, Tooltip, ResponsiveContainer,PieChart, Pie, Sector, Cell, CartesianGrid } from 'recharts';

var lowCount = "0";
var mediumCount = "0";
var highCount = "0";
var noneCount = "0";
var openCount = "0";
var inProgressCount = "0";
var infoRequiredCount = "0";
var closedCount = "0";
var noneTypeCount = "0";
var bugsCount = "0";
var featureRequestsCount = "0";
var trainingCount = "0";
var otherCount = "0";

//pie chart
const priorityChartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const typeChartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#8884d8'];
const statusChartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data2 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 8) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.type}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Tickets: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
//end of pie

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      ticketPriorityData:[],
      ticketStatusData: [],
      ticketTypeData: [],
      currentUser: AuthService.getCurrentUser(),
      tickets: [],
      projectName: "",
      description: "",
      innerRadius: 75,
      outerRadius: 95
    };
  }

  componentDidMount(){
    TicketService.getAllTickets(this.state.currentUser.email).then(
      response => {
        this.setState({
          tickets: response.data
        });

        lowCount = "0";
        mediumCount = "0";
        highCount = "0";
        noneCount = "0";
        openCount = "0";
        inProgressCount = "0";
        infoRequiredCount = "0";
        closedCount = "0";
        noneTypeCount = "0";
        bugsCount = "0";
        featureRequestsCount = "0";
        trainingCount = "0";
        otherCount = "0";

        response.data.map(ticket => {
          // for ticket priority data array
          if(ticket.priority==="Low"){
            lowCount++
          }
          if(ticket.priority==="Medium"){
            mediumCount++
          }
          if(ticket.priority==="High"){
            highCount++
          }
          if(ticket.priority==="None"){
            noneCount++
          }
          // for ticket status data array
          if(ticket.status==="Open"){
            openCount++
          }
          if(ticket.status==="In progress"){
            inProgressCount++
          }
          if(ticket.status==="Additional Info Required"){
            infoRequiredCount++
          }
          if(ticket.status==="Closed"){
            closedCount++
          }
          // for ticket type data array
          if(ticket.type==="None"){
            noneTypeCount++
          }
          if(ticket.type==="Bugs/Errors"){
            bugsCount++
          }
          if(ticket.type==="Feature Requests"){
            featureRequestsCount++
          }
          if(ticket.type==="Training/Document Requests"){
            trainingCount++
          }
          if(ticket.type==="Other Comments"){
            otherCount++
          }
        });
        this.setState({
          ticketPriorityData: [
            {
              "priority": "None",
              "tickets": noneCount
            },
            {
              "priority": "Low",
              "tickets": lowCount
            },
            {
              "priority": "Medium",
              "tickets": mediumCount
            },
            {
              "priority": "High",
              "tickets": highCount
            }
          ],

          ticketStatusData: [
            {
              "status": "Open",
              "tickets": openCount
            },
            {
              "status": "In Progress",
              "tickets": inProgressCount
            },
            {
              "status": "More Info Required",
              "tickets": infoRequiredCount
            },
            {
              "status": "Closed",
              "tickets": closedCount
            }
          ],

          ticketTypeData: [
            {
              "type": "None",
              "tickets": noneTypeCount
            },
            {
              "type": "Bugs/Errors",
              "tickets": bugsCount
            },
            {
              "type": "Feature Request",
              "tickets": featureRequestsCount
            },
            {
              "type": "Training/Document",
              "tickets": trainingCount
            },
            {
              "type": "Other Comments",
              "tickets": otherCount
            }
          ]

        });

      }
    ).catch((error) => {
      console.log(error);
   })

   //to check screen size
   window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    if(window.innerWidth > 1199){
      this.setState({
        innerRadius: 75,
        outerRadius: 95
      });
    }
    if(window.innerWidth <= 1150){
      this.setState({
        innerRadius: 60,
        outerRadius: 80
      });
    }
    if(window.innerWidth <= 670){
      this.setState({
        innerRadius: 55,
        outerRadius: 75
      });
    }
    // if(window.innerWidth <= 430){
    //   this.setState({
    //     innerRadius: 45,
    //     outerRadius: 65
    //   });
    // }
    if(window.innerWidth <= 350){
      this.setState({
        innerRadius: 35,
        outerRadius: 55
      });
    }
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.resize.bind(this));
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
     <div id="dashboard">
       <div className="row pt-3">
        <div className="col-xs-12 col-lg-6">
          <div className="box">
            <div className="chart-label">
              <strong>Tickets by Priority</strong>
            </div>
            <div style={{padding:"10px"}}>
            <ResponsiveContainer  height={300} style={{paddingTop:"10px"}}>
              <BarChart  data={this.state.ticketPriorityData} className="bar-container">
                <XAxis dataKey="priority" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="tickets" fill="#8884d8">
                {
                    this.state.ticketPriorityData.map((entry, index) => <Cell key={`cell-${index}`} fill={priorityChartColors[index % priorityChartColors.length]} />)
                }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>
         
        </div>
        <div className="col-xs-12 col-lg-6 pie-chart">
          <div className="box">
            <div className="chart-label">
              <strong>Tickets by Type</strong>
            </div>
            <div style={{padding:"10px"}}>
            <ResponsiveContainer  height={300} style={{padding:"10px"}}>
              <PieChart >
                  <Pie
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape}
                    data={this.state.ticketTypeData}
                    innerRadius={this.state.innerRadius}
                    outerRadius={this.state.outerRadius}
                    fill="#8884d8"
                    dataKey="tickets"
                    onMouseEnter={this.onPieEnter}
                  >
                    {
                      this.state.ticketTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={typeChartColors[index % typeChartColors.length]} />)
                    }
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              </div>

          </div>
        </div>
       </div>

       <div className="row pt-3 pb-5">
        <div className="col-xs-12 col-lg-6 pb-3">
          <div className="box">
            <div className="chart-label">
              <strong>Tickets by Status</strong>
            </div>
            <div style={{paddingTop:"10px"}}>
              <ResponsiveContainer  height={300}>
                <BarChart  data={this.state.ticketStatusData} className="bar-container">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tickets" fill="#8884d8" >
                    {
                      this.state.ticketStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={statusChartColors[index % statusChartColors.length]} />)
                    }
                    </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
        
           
          </div>
        </div>
       </div>
   
    </div>
    );
  }
}