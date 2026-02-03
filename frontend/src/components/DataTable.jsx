import React, { useState } from 'react';
import { Bookmark, PlusSquare, Download, MoreVertical } from 'lucide-react';

const DataTable = ({
    records,
    filteredLength,
    bookmarkedIds,
    selectedIds,
    onToggleBookmark,
    onToggleSelect,
    onDownload,
    onMore,
}) => {
    const [empty, setEmpty] = useState(null)
    // console.log(records, filteredLength)
    
    return (
        <>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                        <th className="py-3 px-4 text-left w-[40%] text-sm font-bold text-[#1d268f]">
                            New Releases <span className='text-[#952db5]'> ({filteredLength})</span>
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-bold text-[#1d268f]">Range</th>
                        <th className="py-3 px-4 text-left text-sm font-bold text-[#1d268f]">Unit</th>
                        <th className="py-3 px-4 text-left text-sm font-bold text-[#1d268f]">Coverage</th>
                        <th className="py-3 px-4 text-center text-sm font-bold text-[#1d268f]">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {records.map((item) => (

                        <tr key={item.id} className="hover:bg-blue-50/20 transition-colors group">
                            {/* {console.log("HJ -", item)} */}
                            {filteredLength===0 && setEmpty(item.cat)}
                            <td className="py-5 px-6">
                                <div className="text-[14px] font-bold text-gray-800 leading-snug group-hover:text-[#1d268f] transition-colors">{item.title}</div>
                                <div className="text-[12px] text-blue-500 font-medium mt-1 cursor-pointer hover:underline uppercase tracking-tighter">
                                    {item.region_name || item.region || item.cat} / {item.subCat || 'General'}
                                </div>
                            </td>
                            <td className="py-5 px-6">
                                <div className="text-[13px] text-gray-700 font-medium">{item.range || "Apr 2011 - Mar 2024"}</div>
                                <div className="text-[11px] text-gray-400 italic mt-0.5">{item.freq || 'Quarterly'}</div>
                            </td>
                            <td className="py-5 px-6 text-[13px] text-gray-600 font-medium">{item.unit || 'Index'}</td>
                            <td className="py-5 px-6">
                                <div className="flex gap-1.5">
                                    <span className="w-5 h-5 bg-red-50 text-red-600 border border-red-100 flex items-center justify-center text-[10px] font-bold shadow-sm">R</span>
                                    <span className="w-5 h-5 bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center text-[10px] font-bold shadow-sm">I</span>
                                </div>
                            </td>
                            <td className="py-5 px-6">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        title="Bookmark"
                                        aria-label="Bookmark"
                                        onClick={(e) => { e.stopPropagation(); onToggleBookmark?.(item); }}
                                        className={`w-9 h-9 inline-flex items-center justify-center rounded-full border transition-all ${bookmarkedIds?.has(item.id)
                                            ? 'bg-[#1d268f]/10 border-[#1d268f]/20 text-[#1d268f]'
                                            : 'bg-white border-gray-200 text-gray-400 hover:text-[#1d268f] hover:bg-[#1d268f]/5 hover:border-[#1d268f]/20'
                                            } active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1d268f]/30`}
                                    >
                                        <Bookmark size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        title={selectedIds?.has(item.id) ? 'Unselect' : 'Select'}
                                        aria-label={selectedIds?.has(item.id) ? 'Unselect' : 'Select'}
                                        onClick={(e) => { e.stopPropagation(); onToggleSelect?.(item); }}
                                        className={`w-9 h-9 inline-flex items-center justify-center rounded-full border transition-all ${selectedIds?.has(item.id)
                                            ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                            : 'bg-white border-gray-200 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200'
                                            } active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-200`}
                                    >
                                        <PlusSquare size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        title="Download"
                                        aria-label="Download"
                                        onClick={(e) => { e.stopPropagation(); onDownload?.(item); }}
                                        className="w-9 h-9 inline-flex items-center justify-center rounded-full border bg-white border-gray-200 text-gray-400 hover:text-[#1d268f] hover:bg-[#1d268f]/5 hover:border-[#1d268f]/20 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1d268f]/30"
                                    >
                                        <Download size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        title="More"
                                        aria-label="More"
                                        onClick={(e) => { e.stopPropagation(); onMore?.(item); }}
                                        className="w-9 h-9 inline-flex items-center justify-center rounded-full border bg-white border-gray-200 text-gray-400 hover:text-[#1d268f] hover:bg-[#1d268f]/5 hover:border-[#1d268f]/20 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1d268f]/30"
                                    >
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
            {filteredLength === 0 && (
                <div className="flex flex-col items-center justify-center py-24">
                    <h1 className="text-slate-900 font-bold"> {empty} Not contain any data. </h1>
                </div>
            )}
        </>

    );
};

export default DataTable;