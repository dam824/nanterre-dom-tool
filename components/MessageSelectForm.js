// components/MessageSelectForm.js
import { useState, useEffect } from 'react';

const MessageSelectForm = ({ onSubmit, templates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [title, setTitle] = useState('Nanterre Dom');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ title, content });
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
        Choose Template
      </label>
      <select
        id="template"
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        className="block w-full mb-4 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
      >
        <option value="">Select a template</option>
        {templates.map(template => (
          <option key={template.id} value={template.id}>{template.title}</option>
        ))}
      </select>
      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
        Title
      </label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-4 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
        readOnly
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

export default MessageSelectForm;
