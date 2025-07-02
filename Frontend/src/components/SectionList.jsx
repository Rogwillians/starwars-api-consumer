import React from 'react';
import { Link } from 'react-router-dom';

export default function SectionList({ title, items, pathPrefix, labelKey }) {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {items.map(item => (
                    <Link key={item.id} to={`${pathPrefix}/${item.id}`}>
                        <div className="bg-gray-200 rounded p-2 hover:bg-gray-300 transition text-center">
                            {item[labelKey]}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
