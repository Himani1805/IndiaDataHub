import {
    Search,
    Calendar,
    HelpCircle,
    ChevronDown,
    Database,
    User,
    LogOut,
    LogIn
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Header = ({
    searchQuery = '',
    setSearchQuery = () => { },
    userImage,
    onProfileUpload,
    onDatabaseClick,
    onCalendarClick,
}) => {

    const navigate = useNavigate();
    const isAuthenticated = Boolean(localStorage.getItem('token'));

    // Trigger for hidden file input
    const triggerUpload = () => {
        const el = document.getElementById('profile-input');
        if (el) el.click();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleDatabase = () => {
        if (typeof onDatabaseClick === 'function') {
            onDatabaseClick();
            return;
        }
        navigate(isAuthenticated ? '/dashboard' : '/login');
    };

    const handleCalendar = () => {
        if (typeof onCalendarClick === 'function') {
            onCalendarClick();
            return;
        }
        navigate(isAuthenticated ? '/dashboard' : '/login');
    };

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

            {/* RIGHT: NAVIGATION & PROFILE */}
            <div className="flex items-center gap-8">

                {/* Functional Links from PDF */}
                <nav className="hidden xl:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-1">
                    <button
                        type="button"
                        onClick={handleDatabase}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors text-[13px] font-semibold"
                    >
                        Database <ChevronDown size={14} className="mt-0.5" />
                    </button>
                    <button
                        type="button"
                        onClick={handleCalendar}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors text-[13px] font-semibold"
                    >
                        <Calendar size={16} />
                        Calendar
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors text-[13px] font-semibold">
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
                {isAuthenticated ? (
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white/5 border border-white/15 text-white/85 hover:bg-red-500/15 hover:border-red-400/40 hover:text-white transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSignIn}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white/5 border border-white/15 text-white/85 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <LogIn className="h-4 w-4" />
                        Sign in
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;