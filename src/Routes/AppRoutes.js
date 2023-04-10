import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCredentials from '../Screen/UserCredentials';
import DashBaord from '../Screen/DashBoard';
import Defaultlayout from '../AppLayout/Layout';
import NotFound from '../Screen/NotFound';


export default function AppRouting() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<UserCredentials />} />
                    </Route>
                    <Route path="/user/Dashbaord" element={<Defaultlayout />}>
                        <Route index element={<DashBaord />}></Route>
                    </Route>
                    <Route path={"/*"} element={<NotFound/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
