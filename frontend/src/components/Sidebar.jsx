import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Sidebar = ({ categories, selectedCategory, setSelectedCategory, activeTab, setActiveTab, setCurrentPage }) => {

    const handleTabToggle = () => {
        const nextTab = activeTab === 'India & States' ? 'Global Indicators' : 'India & States';
        setActiveTab(nextTab);
        setSelectedCategory('All');
        setCurrentPage(1);
    };

    const handleCategorySelect = (cat) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    return (
        <aside className="w-64 bg-[#f8f9fa] flex flex-col shrink-0 border-r border-gray-100">
            <nav className="flex-1 overflow-y-auto px-4 py-6">

                {/* Source Switcher Box */}
                <div
                    className="flex flex-col w-full text-left px-4 py-3 bg-[#e8f0fe] rounded-sm text-blue-700 text-xs font-bold cursor-pointer hover:bg-blue-100 transition-colors border border-blue-100 mb-2"
                    onClick={handleTabToggle}
                >
                    <div className='text-gray-500 font-semibold mb-0.5 uppercase tracking-tighter'>Category</div>
                    <div className='flex items-center justify-between text-[#1d268f] text-[15px]'>
                        {activeTab} <ChevronDown size={14} />
                    </div>
                </div>

                {/* Homepage Button */}
                <button
                    onClick={() => handleCategorySelect('All')}
                    className={`w-full text-left mt-2 px-6 py-3 text-sm font-bold shadow-sm border rounded-sm mb-6 transition-colors ${selectedCategory === 'All' ? 'text-blue-700 border-blue-500 bg-white' : 'text-gray-800 bg-white border-gray-100'}`}
                >
                    Homepage
                </button>

                {/* Categories List */}
                <div className="space-y-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategorySelect(cat)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-[13px] hover:bg-white transition-all group ${selectedCategory === cat ? 'text-blue-600 font-bold bg-white shadow-sm' : 'text-gray-500'}`}
                        >
                            <div className="flex items-center gap-3">
                                <ChevronRight size={12} className={`${selectedCategory === cat ? 'text-blue-600' : 'text-gray-300'} group-hover:text-blue-600`} />
                                <span className="truncate">{cat}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;