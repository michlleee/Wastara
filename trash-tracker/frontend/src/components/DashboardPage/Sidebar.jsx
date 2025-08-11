import SidebarIcon from "./SidebarIcon";

const Sidebar = () => {
    return (
        <div className="flex flex-col w-18 bg-[#1B1E1B] p-4 items-center rounded-lg h-100% justify-between">
            
            {/* Top section */}
            <div className="flex flex-col space-y-6 items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-black rounded-full"></div>
                </div>
                
                <SidebarIcon
                    label="Report"
                    icon={
                        <svg className="w-6 h-6 text-black" fill="white" viewBox="0 0 24 24">
                            <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" />
                        </svg>
                    }
                />
                <SidebarIcon
                    label="History"
                    icon={
                        <svg className="w-6 h-6 text-black" fill="white" viewBox="0 0 24 24">
                            <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z"/>
                        </svg>
                    }
                />
            </div>

            {/* Bottom section */}
            <SidebarIcon
                label="Logout"
                icon={
                    <svg className="w-8 h-8 text-black" fill="white" viewBox="0 0 24 24">
                        <path d="M12 8C9.8 8 8 9.8 8 12S9.8 16 12 16 16 14.2 16 12 14.2 8 12 8M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                    </svg>
                }
            /> 
        </div>
    );
};

export default Sidebar;
