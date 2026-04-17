"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';

interface UrlsProps {
    _id: string;
    originalUrl: string;
    shortUrl: string;
    clicks: number;
}


const Urls = () => {
    const [urls, setUrls] = useState<UrlsProps[]>([]);

    useEffect(() => {
        const fetchUrls = async () => {
            const res = await axios.get('/api/url');
            setUrls(res.data.urls);
        };
        fetchUrls();
    }, []);

    const deleteUrl = async (id: string) => {
        const res = await axios.delete(`/api/url/${id}`);
        setUrls(res.data.urls);
    };

    return (
        <main className="flex-1">
            <section className="container mx-auto px-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">Your URLs</h1>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold">Total URLs: {urls?.length ? urls.length : 0}</h2>
                    </div>
                    <section className="grid py-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {urls.map((url) => (
                            <div key={url.shortUrl} className="flex flex-col gap-4 border border-gray-300 rounded-lg p-4">
                                <div className="flex items-center gap-2">
                                    <label className="text-lg font-bold">Original URL</label>
                                    <h2 className="text-xs font-mono">{url.originalUrl}</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-lg font-bold">Short URL</label>
                                    <h2 className="text-xs font-mono">{url.shortUrl}</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-lg font-bold">Clicks</label>
                                    <h2 className="text-lg">{url.clicks}</h2>
                                </div>
                                <button onClick={() => copyToClipboard(url.shortUrl)} className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors duration-200 ">Copy</button>
                                <button onClick={() => deleteUrl(url._id)} className="px-4 py-2 rounded-lg cursor-pointer bg-red-500 hover:bg-red-700 text-white transition-colors duration-200 ">Delete</button>

                            </div>
                        ))}
                    </section>
                </div>
            </section>
        </main>
    )
}

export default Urls

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}