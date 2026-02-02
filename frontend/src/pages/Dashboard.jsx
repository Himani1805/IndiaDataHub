import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
    Search,
    Calendar,
    HelpCircle,
    ChevronDown,
    User,
    ChevronLeft,
    Bookmark,
    Filter,
    ShoppingCart,
    LineChart,
    Download,
    ExternalLink,
    Loader2,
    ChevronRight,
    PlusSquare,
    MoreVertical
} from 'lucide-react';
import Header from './Header';

const Dashboard = () => {
    // Data States
    const [indiaData, setIndiaData] = useState({ categories: {}, frequent: [] });
    const [globalData, setGlobalData] = useState({ categories: {}, frequent: [] });
    const [activeTab, setActiveTab] = useState('India & States');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllData = async () => {
            const token = localStorage.getItem('token');
            if (!token) { navigate('/login'); return; }

            try {
                setLoading(true);
                const [indiaRes, globalRes] = await Promise.all([
                    api.get('/catalog'),
                    api.get('/global')
                ]);
                if (indiaRes.data.success) setIndiaData(indiaRes.data);
                if (globalRes.data.success) setGlobalData(globalRes.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                } else {
                    setError("Data sync failed.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [navigate]);

    const currentData = activeTab === 'Global Indicators' ? globalData : indiaData;
    const filteredRecords = useMemo(() => {
        return currentData.frequent.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, currentData]);

    const categories = Object.keys(currentData.categories);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
            {/* TIER 1: HEADER */}
            <Header />

            {/* TIER 2: SUB-HEADER (Breadcrumb & Action Tools) */}
            <div className="h-14 px-8 flex items-center justify-between bg-white shrink-0  z-10">
                <div className="flex items-center gap-2 text-gray-800">
                    <ChevronLeft size={20} className="text-gray-400 cursor-pointer hover:text-blue-600 transition-colors" />
                    <span className="text-lg font-bold tracking-tight">Economic Monitor</span>
                </div>
                {/* Right: Toolset Icons with Square Box & Shadow Look */}
                <div className="flex items-center gap-4">
                    {/* Tool Group 1: Search, Bookmark, Filter */}
                    <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
                        <div className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm cursor-pointer hover:bg-gray-50 text-gray-500 hover:text-[#000040]"><Search size={15} /></div>
                        <div className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm cursor-pointer hover:bg-gray-50 text-gray-500 hover:text-[#000040]"><Bookmark size={15} /></div>
                        <div className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm cursor-pointer hover:bg-gray-50 text-gray-500 hover:text-[#000040]"><Filter size={15} /></div>
                    </div>

                    {/* Tool Group 2: Selected Count & Cart */}
                    <div className="flex items-center gap-3">
                        <span className="text-[12px] font-bold text-gray-500">Selected (0)</span>
                        <div className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm cursor-pointer hover:bg-gray-50 text-gray-500 hover:text-[#000040]"><ShoppingCart size={15} /></div>
                        {/* Box-styled icon as seen next to cart in image_15ccbe.png */}
                        <div className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm cursor-pointer hover:bg-gray-50 text-gray-500 hover:text-[#000040]"><LineChart size={15} className="rotate-90" /></div>
                    </div>
                    {/* View Graph Button - Exact Midnight Blue from Brand */}
                    <button className="flex items-center gap-2 bg-[#000040] text-white px-5 py-2 rounded-sm text-[12px] font-bold hover:bg-blue-900 transition-all shadow-md active:scale-95">
                        <LineChart size={14} /> View Graph
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* SIDEBAR */}
                <aside className="w-64 bg-[#f8f9fa] flex flex-col shrink-0">
                    <nav className="flex-1 overflow-y-auto px-4 py-6">
                        {/* Category Selector Box */}
                        <div className="flex flex-col w-full text-left px-4 py-3  bg-[#e8f0fe]  rounded-sm text-blue-700 text-xs font-bold  "> <div className='text-gray-500'>
                            Category
                        </div>
                            <div className='flex item-center justify-between  text-black text-[15px]'>
                                {activeTab} <ChevronDown size={14} />
                            </div>
                        </div>

                        {/* Homepage link - Positioned under Category as per Image 2 */}
                        <button className="w-full text-left mt-2 px-6 py-3  text-sm font-bold text-gray-800 bg-white shadow-sm border border-gray-100 rounded-sm mb-6 hover:bg-gray-50 transition-colors">
                            Homepage
                        </button>

                        {/* Categories List */}
                        <div className="space-y-1">
                            {categories.map((cat) => (
                                <button key={cat} className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-500 hover:text-blue-600 hover:bg-white transition-all group">
                                    <div className="flex items-center gap-3">
                                        <ChevronRight size={12} className="text-gray-300 group-hover:text-blue-600 transition-transform" />
                                        <span>{cat}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </nav>
                </aside>

                {/* MAIN CONTENT TABLE */}
                <main className="flex-1 flex flex-col min-w-0 bg-white">
                    <div className="flex-1 overflow-y-auto p-6">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                                    <th className="py-3 px-4 text-left w-2/5 text-sm font-bold text-[#1d268f]">New Releases <span className='text-[#952db5]'> ({filteredRecords.length})</span></th>
                                    <th className="py-3 px-4 text-left w-2/5 text-sm font-bold text-[#1d268f]">Range</th>
                                    <th className="py-3 px-4 text-left w-2/5 text-sm font-bold text-[#1d268f] ">Unit</th>
                                    <th className="py-3 px-4 text-left w-2/5 text-sm font-bold text-[#1d268f] ">Coverage</th>
                                    <th className="py-3 px-4 text-center text-sm font-bold text-[#1d268f] ">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredRecords.map((item) => (
                                    <tr key={item.id} className="hover:bg-blue-50/20 transition-colors group">
                                        <td className="py-5 px-6">
                                            <div className="text-[14px] font-bold text-gray-800 leading-snug group-hover:text-[#1d268f] transition-colors">{item.title}</div>
                                            <div className="text-[1px] text-blue-500 font-medium mt-1 cursor-pointer hover:underline">
                                                {item.cat} / {item.subCat}
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="text-[14px] text-gray-700 font-medium">{item.range || 'Jan 2011 - Apr 2024'}</div>
                                            <div className="text-[12px] text-gray-400 italic mt-0.5">{item.freq || 'Quarterly'}</div>
                                        </td>
                                        <td className="py-5 px-6 text-[14px] text-gray-500 font-medium">{item.unit || 'USD'}</td>
                                        <td className="py-5 px-6">
                                            <div className="flex gap-1.5">
                                                <span className="w-5 h-5 bg-red-50 text-red-600 border border-red-100 flex items-center justify-center text-[10px] font-bold shadow-sm">R</span>
                                                <span className="w-5 h-5 bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center text-[10px] font-bold shadow-sm">I</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center justify-center gap-4 text-gray-300">
                                                <Bookmark size={16} className="cursor-pointer hover:bg-[#1d268f] hover:text-white text-gray-500" />
                                                <PlusSquare size={16} className="cursor-pointer hover:bg-[#1d268f] hover:text-white text-gray-500" />
                                                <Download size={16} className="cursor-pointer hover:bg-[#1d268f] hover:text-white text-gray-500" />
                                                <MoreVertical size={16} className="cursor-pointer hover:bg-[#1d268f] hover:text-white text-gray-500" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;