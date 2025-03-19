// components/MessageSelectForm.js
import { useState, useEffect } from 'react';

const MessageSelectForm = ({ onSubmit, templates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [title, setTitle] = useState('Nanterre Dom');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Envoyer");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setButtonText("Envoi...");

    const success = await onSubmit({ title, content });

    setIsLoading(false);
    if(success){
      setError(false);
      setButtonText("C'est envoyé ! ✅");

    }else{
      setError(true);
      setButtonText('Erreur')
    }
  
    setTimeout(() => setButtonText("Envoyer"), 3000);
  };

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        setTitle(template.title);
        setContent(template.content);
      }
    }
  }, [selectedTemplate, templates]);

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <label htmlFor="template" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
        Choisir un template
      </label>
      <select
        id="template"
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        className="block w-full mb-4 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
      >
        <option value="">Templates...</option>
        {templates.map(template => (
          <option key={template.id} value={template.id}>{template.title}</option>
        ))}
      </select>
      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
        Titre
      </label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-4 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
        readOnly
      />
      <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
        Message
      </label>
      <textarea
        id="content"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
        placeholder="Enter message content..."
      ></textarea>
       <button
        type="submit"
        disabled={isLoading}  
        className={`mt-4 px-4 py-2 text-white rounded flex items-center justify-center w-full ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F44336] hover:bg-[#d32f2f]'
        }`}
      >
       {isLoading ? (  
          <>
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            {buttonText}
          </>
        ) : (
          buttonText
        )}
      </button>
      {error && (
          <p className="mt-2 text-sm text-red-500 text-center">
            Échec de l envoi, vérifiez les logs.
          </p>
        )}
    </form>
  );
};

export default MessageSelectForm;
