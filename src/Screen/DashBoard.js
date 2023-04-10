 import Image from "./images.jpg"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import RssFeedSharpIcon from '@mui/icons-material/RssFeedSharp';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CachedSharpIcon from '@mui/icons-material/CachedSharp';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
import CropFreeSharpIcon from '@mui/icons-material/CropFreeSharp';
import CloseFullscreenSharpIcon from '@mui/icons-material/CloseFullscreenSharp';
import { dashboardmaindivPSItemButtonICON, dashbaordicon } from '../Style/style'
import { useState, useEffect } from 'react';
import { DashBoardData, GetAuthenication } from '../ServerMethod/Servermethods';


export default function DashBaord() {

    let [state, setstate] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const hastoken = await GetAuthenication()
            if (hastoken) {
                let searchresults = await DashBoardData();
                setstate(searchresults)
            }
        }
        fetchData()
    }, []);

    return (
        <div className="dashboard">
            <div className='dashboardmaindivP'>
                <div className='dashboardmaindivPF'><h2>Default dashboard</h2></div>
                <div className='dashboardmaindivPS'>
                    <div className='dashboardmaindivPSItem'><StarBorderSharpIcon /></div>
                    <div className='dashboardmaindivPSItem'><button className='dashboardmaindivPSItemButton'>Refresh <CachedSharpIcon style={dashboardmaindivPSItemButtonICON} /></button></div>
                    <div className='dashboardmaindivPSItem'><button className='dashboardmaindivPSItemButton'>Edit <EditSharpIcon style={dashboardmaindivPSItemButtonICON} /></button></div>
                    <div className='dashboardmaindivPSItem'><button className='dashboardmaindivPSItemButton'>...</button></div>
                </div>
            </div>
            <div className="dashboardmaindiv" >
                <div className="dashboardmaindivF">
                    <div className="dashboardmaindivFSubA"><HeaderIntro headername={"Introduction"} /></div>
                    <div className="dashboardmaindivFSubB"><HeaderProject headername={"Projects"} /></div>
                </div>
                <div className="dashboardmaindivS">
                    <div className="dashboardmaindivSSubA"><HeaderAssign headername={"Assign to me"} /></div>
                    <div className="dashboardmaindivSSubB"><HeaderDIV headername={"Activity Streams"} /></div>
                </div>
            </div>
            <EmailDisplay />
        </div>
    )

    function EmailDisplay() {
        return (
            <h4 className="displayEmail">{sessionStorage.getItem("email")}</h4>
        )
    }

    function HeaderIntro(props) {
        return (
            <div>
                <div><NavComp headername={props.headername} mini={<CloseFullscreenSharpIcon style={dashbaordicon} />} extend={<CropFreeSharpIcon style={dashbaordicon} />} refresh={<CachedSharpIcon style={dashbaordicon} />} /></div>
                <div>
                    <h3>{(state.Introduction ? state.Introduction.title : "Loading...")}</h3>
                    <div className='wrapper'>
                        <div className='Intro'>
                            <img className='Introimg' src={Image} />
                        </div>
                        <div className='Introbody'>{(state.Introduction ? state.Introduction.body : "Loading...")}</div>
                    </div>
                </div>
            </div>
        )
    }
    function HeaderProject(props) {
        return (
            <div>
                <div><NavComp headername={props.headername} mini={<CloseFullscreenSharpIcon style={dashbaordicon} />} extend={<CropFreeSharpIcon style={dashbaordicon} />} refresh={<CachedSharpIcon style={dashbaordicon} />} /></div>
                {
                    (state.Projects ?
                        state.Projects.map((data, index) => {
                            return <ProjectDetail projectname={data.projectname} leadname={data.leadname} key={index} />
                        })
                        :
                        "Loading ... "
                    )
                }
            </div>
        )
    }
    function ProjectIcon(props) {
        return (
            <div className='NacIcon'> {props.iconA} {props.iconB} {props.iconC ? props.iconC : null}</div>
        )
    }
    function ProjectDetail(props) {
        return (
            <div>
                <div className='wrapper'>
                    <div className='ProjectName'>{props.projectname}</div>
                    <div className='ProjectIcons'> <ProjectIcon iconA={<InsertChartOutlinedTwoToneIcon style={dashbaordicon} />} iconB={<FilterAltOutlinedIcon style={dashbaordicon} />} /></div>
                </div>
                <div className='ProjectLead'><h5>Lead</h5>{props.leadname}</div>
            </div>
        )
    }

    function HeaderAssign(props) {
        return (
            <div>
                <div><NavComp headername={props.headername} mini={<CloseFullscreenSharpIcon style={dashbaordicon} />} extend={<CropFreeSharpIcon style={dashbaordicon} />} refresh={<CachedSharpIcon style={dashbaordicon} />} /></div>
                <div className='AssignBody'>{(state.AssignedMe ? state.AssignedMe.body : "Loading...")}</div>
            </div>

        )
    }
    function HeaderDIV(props) {
        return (
            <div>
                <div><NavComp headername={props.headername} mini={<CloseFullscreenSharpIcon style={dashbaordicon} />} extend={<CropFreeSharpIcon style={dashbaordicon} />} refresh={<CachedSharpIcon style={dashbaordicon} />} /></div>
                {
                    (state.ActivityStream ?
                        state.ActivityStream.map((data, index) => {
                            return <ActivityMainCom ComapnyName={data.companyname} created={data.created} key={index} />
                        })
                        :
                        "Loading ... "
                    )
                }
            </div>

        )
    }

    function ActivityMainCom(props) {
        let create = props.created.split('T')
        let dateStr = create[0].split('-')
        dateStr = dateStr.reverse().join("-")
        const [day, month] = new Date(dateStr.split('-').reverse().join('-')).toLocaleString('en-US', { day: 'numeric', month: 'long' }).split(' ');

        console.log(`${month} ${day}`);
        return (
            <>
                <div className='wrapper'>
                    <div className='ComapnyName'>Company {props.ComapnyName}</div>
                    <div className='ProjectIcons'> <ProjectIcon iconA={<FeaturedPlayListOutlinedIcon style={dashbaordicon}/>} iconB={<ListAltOutlinedIcon style={dashbaordicon}/>} iconC={<RssFeedSharpIcon style={dashbaordicon}/>} /></div>
                </div>
                <div className='ActivityDate'>{` ${day} ${month}`}</div>
                <ActivityComponent />
            </>
        )
    }

    function ActivityComponent() {
        let name = sessionStorage.getItem("fullname").charAt(0).toUpperCase()
        return (
            <div className='wrapper1'>
                <div className='ActivityProject'>{name}</div>
                <div>
                    <div className='ProjectDetails'>{sessionStorage.getItem('fullname')}</div>
                    <div>This is the random Information</div>
                </div>
            </div>
        )
    }

    function NavComp(props) {

        return (
            <div className="NavCom">
                <div><h5 className="h5">{props.headername}</h5></div>
                <div className="NavS">
                    <div className="NacIcon">{props.mini}</div>
                    <>
                        {
                            (props.headername === "Projects" ? null : <div className="NacIcon">{props.extend}</div>)
                        }
                    </>
                    <div className="NacIcon">{props.refresh}</div>
                </div>
            </div>
        )
    }


}