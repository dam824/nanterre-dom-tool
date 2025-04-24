'use client';

import {useState} from 'react';

const AvatarForm = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!file){
            setMessage("Veuillez selectionner un fichier");
            return;
        }

        const formData = new FormData();
        formData.append('avatar', file);

        const res = await fetch('/api/user/upload-avatar', {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if(res.ok){
            setMessage('Avatar mis à jour');
        }else{
            setMessage(data.error || "Erreur lors de l'upload");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded-lg bg-white shadow">
            <input
            type="file"
            accept= "image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className='mb-4'
            />
            <button type="submit" className="px-4 py-2 bg-[var(--main-color)] text-white rounded">
                Upload
            </button>
            {message && <p className="mt-2 text-sm">{message}</p>}
        </form>
    );
};

export default AvatarForm;