// components/MessageForm.js
import { useState, useEffect } from 'react';

const MessageForm = ({ onSubmit, initialData, templates }) => {
  const [title, setTitle] = useState(initialData?.title || 'Nanterre Dom');
  const [content, setContent] = useState(initialData?.content || '');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || 'Nanterre Dom');
      setContent(initialData.content || '');
    }
  }, [initialData]);

  const handleTemplateChange = (e) => {
    const template = templates.find(t => t.id === parseInt(e.target.value));
    if (template) {
      setTitle('Nanterre Dom');
      setContent(template.content);
      setSelectedTemplate(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <label htmlFor="template" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Choose Template
      </label>
      <select
        id="template"
        value={selectedTemplate}
        onChange={handleTemplateChange}
        className="block w-full mb-4 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
      >
        <option value="">Select a template</option>
        {templates.map(template => (
          <option key={template.id} value={template.id}>{template.title}</option>
        ))}
      </select>
      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Title
      </label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-4 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
      />
      <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default MessageForm;
