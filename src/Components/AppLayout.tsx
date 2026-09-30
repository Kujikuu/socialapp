import AppNavbar from './AppNavbar'
import { Outlet } from 'react-router'

export default function AppLayout() {
    return (
        <main>
            <AppNavbar />
            <Outlet />
        </main>
    )
}
