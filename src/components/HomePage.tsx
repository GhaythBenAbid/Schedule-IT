import React, { useState, useEffect } from 'react';
import useUserStore from '../store/User';
import { useNavigate } from 'react-router-dom';
import useTaskStore from '../store/Task';


function HomePage() {
    const [data, setData] = useState([] as any[]);
    const user = useUserStore(state => state.user);
    const removeUser = useUserStore(state => state.removeUser);
    const isAuthenticated = useUserStore(state => state.isAuthenticated);
    const storeTasks = useTaskStore(state => state.storeTasks);
    const getListTasks = useTaskStore(state => state.getListTasks);
    const ListTasks = useTaskStore(state => state.ListTasks);
    const navigate = useNavigate();


    function logout() {
        removeUser();
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        getListTasks(user.uid);
        console.log(ListTasks);
    }, [user]);


    async function submitTasks() {
        storeTasks(user.uid, data);
    }


    function showFile(e: any) {
        const reader = new FileReader();
        //read file and convert content to json
        reader.readAsText(e.target.files[0]);
        reader.onload = (e) => {
            const file = JSON.parse(e.target?.result as string).schedule;


            setData(prevData => {
                const newData = [...prevData];

                file.forEach((item: any) => {
                    newData.push(item);
                });

                return newData;
            });
        }
    }




    return (
        <div>
            <div className="w-full flex justify-center h-full">
                <aside className="sticky sidebar h-screen justify-start">
                    <section className="sidebar-title items-center p-4">
                        <svg fill="none" height="42" viewBox="0 0 32 32" width="42" xmlns="http://www.w3.org/2000/svg">
                            <rect height="100%" rx="16" width="100%"></rect>
                            <path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                        <div className="flex flex-col">
                            <span>Schedule IT</span>
                            <span className="text-xs font-normal text-content2">Team Plan</span>
                        </div>
                    </section>
                    <section className="sidebar-content h-fit min-h-[20rem] overflow-visible">
                        <nav className="menu rounded-md">
                            <section className="menu-section px-4">
                                <span className="menu-title">Main menu</span>
                                <ul className="menu-items">
                                    <li className="menu-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>HomePage</span>
                                    </li>
                                    



                                    <li className="menu-item menu-active" onClick={() => { logout() }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span>logout</span>
                                    </li>


                                </ul>
                            </section>
                        </nav>
                    </section>
                    <section className="sidebar-footer h-full justify-end bg-gray-2 pt-2">
                        <div className="divider my-0"></div>
                        <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
                            <label className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4" >
                                <div className="flex flex-row gap-4 p-4">
                                    <div className="avatar avatar-md">
                                        <img src={user?.photoURL} alt="avatar" />
                                    </div>

                                    <div className="flex flex-col">
                                        <span>{user?.displayName}</span>
                                        <span className="text-xs font-normal text-content2">{user?.email}</span>
                                    </div>
                                </div>
                            </label>
                            <div className="dropdown-menu dropdown-menu-right-top ml-2">
                                <a className="dropdown-item text-sm">Profile</a>
                                <a className="dropdown-item text-sm">Account settings</a>
                                <a className="dropdown-item text-sm">Change email</a>
                                <a className="dropdown-item text-sm">Subscriptions</a>
                                <a className="dropdown-item text-sm">Change password</a>
                                <a className="dropdown-item text-sm">Refer a friend</a>
                                <a className="dropdown-item text-sm">Settings</a>
                            </div>
                        </div>
                    </section>
                </aside>
                <div className="w-11/12 flex items-center flex-col  mt-12">
                    <div className="w-11/12 my-8">
                        <div className='flex justify-between items-center my-5'>
                            <h1 className="text-3xl font-bold">Schedule</h1>
                            <a href="./template/template.json" download>
                                <button className="btn btn-primary">Download Template</button>
                            </a>
                        </div>
                        <label
                            className="flex justify-center w-full h-32 px-4 transition  border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                            <span className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="font-medium text-gray-400">
                                    Drop files to Attach, or <span className="text-blue-500 underline">browse</span>
                                </span>
                            </span>
                            <input type="file" name="file_upload" className="hidden" onChange={(e) => showFile(e)} />
                        </label>
                    </div>

                    <div className=" flex w-11/12 overflow-x-auto">
                        <table className="table-zebra table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Time</th>
                                    <th>Duration</th>
                                    <th>Important</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.event}</td>
                                            <td>{item.time}</td>
                                            <td>{item.duration}</td>
                                            <td>
                                                {item.important ? <span className="dot dot-success"></span> : <span className="dot dot-warning"></span>}
                                            </td>
                                        </tr>



                                    )

                                }
                                )}

                            </tbody>
                        </table>

                    </div>
                    <button className="w-11/12 btn btn-primary  my-8" onClick={() => { submitTasks() }}>Submit</button>

                </div>

            </div>
        </div>


    )



}

export default HomePage