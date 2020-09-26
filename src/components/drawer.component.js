import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import  '../css/drawer.css'
import NotifyMe from 'react-notification-timeline';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ReorderIcon from '@material-ui/icons/Reorder';
import ListIcon from '@material-ui/icons/List';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function logOut() {
  AuthService.logout();
}

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const user = AuthService.getCurrentUser();

  const [isSubmiitter, setIsSubmitter] = React.useState(user.roles.includes("SUBMITTER"));
  const [isDeveloper, setIsDeveloper] = React.useState(user.roles.includes("DEVELOPER"));
  const [isProjectManager, setIsProjectManager] = React.useState(user.roles.includes("PROJECT-MANAGER"));
  const [isAdmin, setIsAdmin] = React.useState(user.roles.includes("ADMIN"));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [adminEmail, setAdminEmail] = React.useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const onChangeAdminEmail = (e) => {
    setAdminEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let currentUser = AuthService.getCurrentUser();
    UserService.joinUser(
      currentUser.id,
      adminEmail,
    )
  }

  const drawer = (
    <div>
      <div className="d-flex align-items-center justify-content-center align-self-center" >
        <div className={classes.toolbar} >
            <h6 style={{lineHeight: "70px" , marginBottom: "0", fontWeight: 400}} >WELCOME, {props.username}</h6>  
        </div>
      </div>
      
      <Divider />
      {/* <List>
        {['Dashboard Home', 'Manage Role Assignment', 'Manage Project Users', 'My Projects','My Tickets'].map((text, index) => (
          <ListItem >
            <ListItemLink button href={props.url+"/"+text.replace(/\s+/g,'')} className="list-item" key={text} >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemLink>
          </ListItem>
        ))}
      </List> */}
      <List>
        <ListItem key="Dashboard">
          <NavLink to="/Dashboard" button  className="list-item w-100" style={{display: "inline-flex"}}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </NavLink>
        </ListItem>

        {isAdmin && (
          <ListItem key="ManageRoleAssignment">
            <NavLink to={`/ManageRoleAssignment`}  className="list-item w-100" style={{display: "inline-flex"}}>
              <ListItemIcon><GroupAddIcon /></ListItemIcon>
              <ListItemText primary="Role Assignment" />
            </NavLink>
          </ListItem>
        )}

        {(isAdmin || isProjectManager)  && (
          <ListItem key="ManageProjectUsers">
            <NavLink to={`/ManageProjectUsers`} className="list-item w-100" style={{display: "inline-flex"}}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Project Users" />
            </NavLink>
          </ListItem>
        )}
        
        <ListItem key="MyProjects">
        <NavLink to={`/MyProjects`} className="list-item w-100" style={{display: "inline-flex"}}>
            <ListItemIcon><ReorderIcon /></ListItemIcon>
            <ListItemText primary="My Projects" />
          </NavLink>
        </ListItem>

        <ListItem key="MyTickets">
          <NavLink to={`/MyTickets`} className="list-item w-100" style={{display: "inline-flex"}}>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary="My Tickets" />
          </NavLink>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className="nav-text-left">
            Logged in as: <strong>{props.role}</strong>
          </Typography>
           <div className="dropdown nav-item-right pr-3">
           <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Join a User
           </a>

            <form className="dropdown-menu p-4" style={{minWidth: "19rem"}} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail2">Users Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="exampleDropdownFormEmail2" 
                  placeholder="email@example.com" 
                  required 
                  value={adminEmail}
                  onChange={onChangeAdminEmail}
                  />
              </div>
              <button type="submit" className="btn btn-primary">Send a Request</button>
            </form>
           </div>

            {/* notification feed */}
            <NotifyMe
              data={[
                {
                  "update":"70 new employees are shifted",
                  "timestamp":1596119688264
                },
                {
                  "update":"Time to take a Break, TADA!!!",
                  "timestamp":1596119686811
                }
              ]}
              storageKey='notific_key'
              notific_key='timestamp'
              notific_value='update'
              heading='Notifications'
              sortedByKey={false}
              showDate={false}
              size={22}
              color="#000"
            />

           <div className=" dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false">
                  User Actions
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Profile</a>
                <a className="dropdown-item" href="#">Settings</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/signin" onClick={logOut}>Log Out</a>
              </div>
            </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
      </main>
    </div>
  );
}

export default ResponsiveDrawer;