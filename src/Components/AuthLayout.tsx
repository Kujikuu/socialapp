import { TabItem, Tabs } from 'flowbite-react'
import LoginPage from '../Pages/Auth/Login'
import RegisterPage from '../Pages/Auth/Register'
import { useAuth } from '../hooks/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AuthLayout() {
    const { isLogged, isLoading, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isLogged) {
            navigate("/main");
        }
    }, [isLogged, isLoading, navigate]);

    return (
        <div className='min-h-screen bg-gray-100 px-4 py-5 sm:py-12 lg:flex lg:items-center'>
            <div className='mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between'>
                <section className='order-2 w-full max-w-xl text-center lg:order-1 lg:text-left flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='hidden text-5xl font-extrabold tracking-tight text-blue-800 sm:text-6xl lg:block'>Route Posts</h1>
                        <p className='hidden text-2xl font-medium leading-snug text-slate-800 lg:block'>Connect with friends and the world around you on Route Posts.</p>
                    </div>

                    {/* <div className='rounded-2xl bg-white p-4 sm:p-6'>

                    </div> */}
                </section>

                <div className='order-1 w-full max-w-[430px] lg:order-2'>
                    <div className='rounded-2xl bg-white p-4 sm:p-6'>
                        <Tabs variant="fullWidth">
                            <TabItem active title="Login">
                                <LoginPage />
                            </TabItem>
                            <TabItem title="Register">
                                <RegisterPage />
                            </TabItem>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
