import {
    Search,
    Calendar,
    HelpCircle,
    ChevronDown,
    Database,
    User
} from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, userImage, onProfileUpload }) => {

    // Trigger for hidden file input
    const triggerUpload = () => {
        document.getElementById('profile-input').click();
    };

    // const handleLogout = () => {
    //     localStorage.clear();
    //     navigate('/login');
    // };

    return (
        <header className="w-full bg-[#000040] h-16 flex items-center justify-between px-6 shadow-md z-50">

            {/* LEFT: BRANDING */}
            <div className="flex items-center gap-2 min-w-fit">
                <div className="text-white flex items-center gap-2">
                    {/* Circular 'd' logo style from PDF */}
                    <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center font-bold text-[18px]">
                        d
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-md font-bold  tracking-widest">IndiaDataHub</span>
                        <span className="text-[8px] text-gray-400 uppercase tracking-tight">Data • Analytics • Intelligence</span>
                    </div>
                </div>
            </div>

            {/* CENTER: SEARCH BAR */}
            <div className="flex-1 max-w-2xl mx-10">
                <div className="relative group">
                    <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for datasets, indicators..."
                        className="w-full bg-white text-gray-800 text-sm h-8 pl-10 pr-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                    />
                </div>
            </div>
            {/* 
            <div className="flex-1 max-w-xl mx-10">
                <div className="relative">
                    <Search className="absolute left-3 top-1.5 h-3.5 w-3.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for datasets..."
                        className="w-full bg-white/10 text-white text-xs h-7 pl-9 pr-4 rounded-sm focus:bg-white focus:text-gray-800 transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div> */}

            {/* RIGHT: NAVIGATION & PROFILE */}
            <div className="flex items-center gap-8">

                {/* Functional Links from PDF */}
                <nav className="hidden xl:flex items-center gap-6">
                    <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-[14px] font-medium">
                        Database <ChevronDown size={14} className="mt-0.5" />
                    </button>
                    <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-[14px] font-medium">
                        <Calendar size={16} />
                        Calendar
                    </button>
                    <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-[14px] font-medium">
                        <HelpCircle size={16} />
                        Help
                    </button>
                </nav>

                {/* User Profile Section */}
                <div className="flex items-center gap-3 border-l border-white/10 pl-6 ml-2">
                    <div className="relative cursor-pointer group" onClick={triggerUpload}>
                        {userImage ? (
                            <img
                                src={userImage}
                                alt="Profile"
                                className="w-16 h-16 rounded-full border border-white/20 object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-white/15  flex items-center justify-center text-white/80 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <User size={16} />
                            </div>
                        )}

                        {/* Hidden Input for uploading image */}
                        <input
                            id="profile-input"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={onProfileUpload}
                        />
                    </div>
                </div>
                {/* <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button> */}
            </div>
        </header>
    );
};

export default Header;