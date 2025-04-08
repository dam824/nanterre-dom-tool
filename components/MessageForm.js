// components/MessageForm.js
import { useState, useEffect } from 'react';

const MessageForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || 'Nanterre Dom');
  const [content, setContent] = useState(initialData?.content || '');
  const [templateName, setTemplateName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ title, content, templateName });
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || 'Nanterre Dom');
      setContent(initialData.content || '');
      setTemplateName(initialData.templateName || '');
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <label htmlFor="templateName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
        Template Name
      </label>
      <input
        id="templateName"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        className="block w-full mb-4 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
        placeholder="Enter template name"
      />
      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
        Title
      </label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-4 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
      />
      <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
        Content
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
        className="mt-4 px-4 py-2 bg-[#F44336] text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default MessageForm;