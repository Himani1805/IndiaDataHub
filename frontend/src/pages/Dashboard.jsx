import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Loader2, ChevronLeft, Search, Bookmark, Filter, ShoppingCart, LineChart } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable';
import { IMF_REGION_NAME_TO_CODE } from '../utils/countryCodes';

const Dashboard = () => {
    const [indiaData, setIndiaData] = useState({ categories: {}, frequent: [] });
    const [globalData, setGlobalData] = useState({ categories: {}, frequent: [] });
    const [activeTab, setActiveTab] = useState('India & States');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookmarkedIdList, setBookmarkedIdList] = useState(() => {
        try {
            const raw = localStorage.getItem('bookmarkedIds');
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    });
    const [selectedIdList, setSelectedIdList] = useState(() => {
        try {
            const raw = localStorage.getItem('selectedIds');
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    });
    const [modalTitle, setModalTitle] = useState('');
    const [modalItem, setModalItem] = useState(null);
    const recordsPerPage = 10;
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
                if (err.response?.status === 401) navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [navigate]);

    const currentData = activeTab === 'India & States' ? indiaData : globalData;

    const bookmarkedIds = useMemo(() => new Set(bookmarkedIdList), [bookmarkedIdList]);
    const selectedIds = useMemo(() => new Set(selectedIdList), [selectedIdList]);

    const persistList = (key, next) => {
        try {
            localStorage.setItem(key, JSON.stringify(next));
        } catch (e) {
            void e;
        }
    };

    const toggleIdInList = (list, id) => {
        const exists = list.includes(id);
        return exists ? list.filter((x) => x !== id) : [...list, id];
    };

    const handleToggleBookmark = (item) => {
        const id = item?.id;
        if (!id) return;
        setBookmarkedIdList((prev) => {
            const next = toggleIdInList(prev, id);
            persistList('bookmarkedIds', next);
            return next;
        });
    };

    const handleToggleSelect = (item) => {
        const id = item?.id;
        if (!id) return;
        setSelectedIdList((prev) => {
            const next = toggleIdInList(prev, id);
            persistList('selectedIds', next);
            return next;
        });
    };

    const downloadJson = (fileName, payload) => {
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const handleDownload = (item) => {
        const safeId = String(item?.id || 'dataset').replace(/[^a-zA-Z0-9._-]/g, '_');
        downloadJson(`${safeId}.json`, item);
    };

    const handleMore = (item) => {
        setModalTitle('Dataset Details');
        setModalItem(item);
    };

    const openSelectedModal = () => {
        const items = (filteredRecords || []).filter((x) => selectedIds.has(x.id));
        setModalTitle(`Selected (${items.length})`);
        setModalItem(items);
    };

    const openBookmarksModal = () => {
        const items = (filteredRecords || []).filter((x) => bookmarkedIds.has(x.id));
        setModalTitle(`Bookmarked (${items.length})`);
        setModalItem(items);
    };

    const handleHeaderDatabaseClick = () => {
        setActiveTab('India & States');
        setSelectedCategory('All');
        setSearchQuery('');
        setCurrentPage(1);
    };

    const handleHeaderCalendarClick = () => {
        setModalTitle('Calendar');
        setModalItem({ message: 'Calendar view coming soon.' });
    };

    const clearSelected = () => {
        setSelectedIdList(() => {
            persistList('selectedIds', []);
            return [];
        });
    };

 
const filteredRecords = useMemo(() => {
  let data = currentData.frequent || [];

  if (searchQuery) {
    data = data.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory !== 'All') {
    if (activeTab === 'India & States') {
      data = data.filter(item =>
        item.cat?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      );
    } else {
      const continentData = currentData.categories?.[selectedCategory] || {};
      const regionCodesInContinent = new Set(
        Object.keys(continentData)
          .map((name) => {
            const raw = String(name || '');
            const trimmed = raw.trim();
            const normalizedSpaces = trimmed.replace(/\s+/g, ' ');
            return (
              IMF_REGION_NAME_TO_CODE[raw] ||
              IMF_REGION_NAME_TO_CODE[trimmed] ||
              IMF_REGION_NAME_TO_CODE[normalizedSpaces]
            );
          })
          .filter(Boolean)
          .map((code) => String(code).trim().toUpperCase())
      );

      if (regionCodesInContinent.size > 0) {
        data = data.filter((item) =>
          regionCodesInContinent.has(String(item.region || '').trim().toUpperCase())
        );
      } else {
        const selected = selectedCategory.trim().toLowerCase();
        data = data.filter((item) => {
          const region = (item.region || '').trim().toLowerCase();
          const regionName = (item.region_name || '').trim().toLowerCase();
          return region === selected || regionName === selected;
        });
      }
    }
  }

  return data;
}, [searchQuery, currentData, selectedCategory, activeTab]);



    const currentRecords = filteredRecords.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
    // console.log("hinaaa", currentRecords)
    // console.log("2", currentData.categories)
    const categories = Object.keys(currentData.categories || {});
    // const subCateogries = Object.keys(currentData.categories)

    // console.log("hina", categories)

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <Loader2 className="h-10 w-10 animate-spin text-[#000040]" />
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onDatabaseClick={handleHeaderDatabaseClick}
                onCalendarClick={handleHeaderCalendarClick}
            />

            {/* TIER 2: ACTION BAR */}
            <div className="h-14 px-8 flex items-center justify-between bg-white shrink-0 border-b border-gray-100 z-10">
                <div className="flex items-center gap-2 text-gray-800">
                    <ChevronLeft size={20} className="text-gray-400 cursor-pointer" />
                    <span className="text-lg font-bold tracking-tight">Economic Monitor</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
                        <button type="button" className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm" onClick={() => { }} aria-label="Search">
                            <Search size={15} />
                        </button>
                        <button type="button" className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm" onClick={openBookmarksModal} aria-label="Bookmarks">
                            <Bookmark size={15} />
                        </button>
                        <button type="button" className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm" onClick={() => { }} aria-label="Filter">
                            <Filter size={15} />
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="button" className="text-[12px] font-bold text-gray-500" onClick={openSelectedModal}>
                            Selected ({selectedIdList.length})
                        </button>
                        <button type="button" className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm" onClick={clearSelected} aria-label="Clear selected">
                            <ShoppingCart size={15} />
                        </button>
                        <button type="button" className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm" onClick={() => { }} aria-label="Quick chart">
                            <LineChart size={15} className="rotate-90" />
                        </button>
                    </div>
                    <button className="flex items-center gap-2 bg-[#000040] text-white px-5 py-2 rounded-sm text-[12px] font-bold hover:bg-blue-900 transition-all">
                        <LineChart size={14} /> View Graph
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setCurrentPage={setCurrentPage}
                />

                <main className="flex-1 flex flex-col min-w-0 bg-white border-l border-gray-100">
                    <div className="flex-1 overflow-y-auto p-6">
                        <DataTable
                            records={currentRecords}
                            filteredLength={filteredRecords.length}
                            bookmarkedIds={bookmarkedIds}
                            selectedIds={selectedIds}
                            onToggleBookmark={handleToggleBookmark}
                            onToggleSelect={handleToggleSelect}
                            onDownload={handleDownload}
                            onMore={handleMore}
                        />

                        {/* Simple Pagination Footer */}
                        {filteredRecords.length > recordsPerPage && (
                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    className="px-3 py-1 border text-xs font-bold rounded"
                                >Prev</button>
                                <span className="px-3 py-1 bg-[#000040] text-white text-xs font-bold rounded">{currentPage}</span>
                                <button
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="px-3 py-1 border text-xs font-bold rounded"
                                    disabled={currentPage * recordsPerPage >= filteredRecords.length}
                                >Next</button>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {modalItem !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => { setModalItem(null); setModalTitle(''); }}>
                    <div className="bg-white w-[min(900px,92vw)] max-h-[85vh] overflow-hidden rounded-sm shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <div className="text-sm font-bold text-gray-800">{modalTitle}</div>
                            <button type="button" className="text-xs font-bold text-gray-500" onClick={() => { setModalItem(null); setModalTitle(''); }}>Close</button>
                        </div>
                        <div className="p-4 overflow-auto max-h-[calc(85vh-52px)]">
                            <pre className="text-xs text-gray-700 whitespace-pre-wrap">{JSON.stringify(modalItem, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;




















