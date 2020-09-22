import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/dashboard.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import TicketService from "../services/ticket.service";
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BarChart, Bar,  XAxis, YAxis, Tooltip, ResponsiveContainer,PieChart, Pie, Sector, Cell } from 'recharts';

var lowCount = "0";
var mediumCount = "0";
var highCount = "0";
var noneCount = "0";
var openCount = "0";
var inProgressCount = "0";
var infoRequiredCount = "0";
var closedCount = "0";

//pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
//end of pie

export default class DashboardHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      ticketPriorityData:[],
      ticketStatusData: [],
      currentUser: AuthService.getCurrentUser(),
      tickets: [],
      projectName: "",
      description: ""
    };
  }

  componentDidMount(){
    TicketService.getAllTickets(this.state.currentUser.email).then(
      response => {
        this.setState({
          tickets: response.data
        });
        console.log(this.state.tickets);

        lowCount = "0";
        mediumCount = "0";
        highCount = "0";
        noneCount = "0";
        openCount = "0";
        inProgressCount = "0";
        infoRequiredCount = "0";
        closedCount = "0";

        response.data.map(ticket => {
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
              "status": "Additional Info Required",
              "tickets": infoRequiredCount
            },
            {
              "status": "Closed",
              "tickets": closedCount
            }
          ]

        });

      }
    ).catch((error) => {
      console.log(error);
   })}

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
     <div id="dashboard">
       <div className="row  pt-5">
        <div className="col-sm-12 col-md-6">
          <ResponsiveContainer  height={230}>
            <BarChart  data={this.state.ticketPriorityData}>
              <XAxis dataKey="priority" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tickets" fill="#8884d8">
               {
                  this.state.ticketPriorityData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
               }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-xs-12 col-lg-6">
            <PieChart width={500} height={400}>
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={data2}
                cx={250}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={this.onPieEnter}
             >
                {
                  data2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
            </PieChart>
        </div>
       </div>

       <div className="row ">
        <div className="col-sm-12 col-md-6">
          <ResponsiveContainer  height={230}>
            <BarChart  data={this.state.ticketStatusData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tickets" fill="#8884d8" >
                {
                  this.state.ticketStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
                </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-xs-12 col-lg-6">
            <PieChart width={500} height={400}>
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={data2}
                cx={250}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={this.onPieEnter}
             >
                {
                  data2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
            </PieChart>
        </div>
       </div>
   
    </div>
    );
  }
}