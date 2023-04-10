import { Outlet } from 'react-router-dom'
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpIcon from '@mui/icons-material/Help';


export default function Defaultlayout() {
    return (
        <div>
            <div className='GitHubNavBarTMost'><GitHubNavBar /></div>
            <div><Outlet /></div>
        </div>
    )
}
export function GitHubNavBar() {
    const urlParams = new URLSearchParams(window.location.search);

    async function logout() {
        console.log("Logout click")
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("fullname");
        sessionStorage.removeItem("verificationToken");
        // Replace the current page in the history with the target URL
        window.history.replaceState(null, null, '/');
        // Redirect the user to the target URL
        window.location.href = '/';
    }

    return (
        <div className='GitHubNavBar'>
            <div className='GitHubNavBarF'>
                <AppsRoundedIcon />
                <div className='navsoptions'>Your Work </div>
                <div className='navsoptions'>Project</div>
                <div className='navsoptions'>Filters</div>
                <div className='navsoptions'>Dashboard</div>
                <div className='navsoptions'> Teams </div>
                <div className='navsoptions'>Apps</div>
                <button className='navbtn'> Create </button>
            </div>
            <div className='GitHubNavBarS'>
                <h4>{urlParams.get('name')}</h4>
                <input className='usercredentialInput' type="text" placeholder='Search' />
                <CircleNotificationsOutlinedIcon />
                <HelpIcon />
                <SettingsOutlinedIcon />
                <button onClick={logout} className="SearchBtn"> Signout </button>
            </div>
        </div>
    )
}
