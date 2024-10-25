import React, { useEffect, useState } from 'react';
import { PagesList } from './PagesList';
import { Page } from './Page';
import apiURL from '../api';

export const App = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    name: '',
    email: '',
    tags: ''
  });

  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch(`${apiURL}/wiki`);
        const pagesData = await response.json();
        setPages(pagesData);
      } catch (err) {
        console.log('Oh no, an error occurred: ', err);
      }
    }
    fetchPages();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const articleData = {
      title: formData.title,
      content: formData.content,
      name: formData.name,
      email: formData.email,
      tags: formData.tags
    };
    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData)
      });
      if (response.ok) {
        const newPage = await response.json();
        setPages([...pages, newPage]);
        setIsAddingArticle(false);
        setFormData({ title: '', content: '', name: '', email: '', tags: '' });
      } else {
        console.error("Failed to add article");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>

      <button onClick={() => setIsAddingArticle(true)}>Add New Article</button>

      {isAddingArticle ? (
        <form onSubmit={handleFormSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                style={{ display: 'block', width: '100%', marginTop: '5px' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Content:
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                style={{ display: 'block', width: '100%', marginTop: '5px' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Author Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{ display: 'block', width: '100%', marginTop: '5px' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Author Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ display: 'block', width: '100%', marginTop: '5px' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Tags (separate with spaces):
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                style={{ display: 'block', width: '100%', marginTop: '5px' }}
              />
            </label>
          </div>
          <button type="submit" style={{ marginRight: '10px' }}>Submit</button>
          <button type="button" onClick={() => setIsAddingArticle(false)}>Cancel</button>
        </form>
      ) : selectedPage ? (
        <Page page={selectedPage} onBack={() => setSelectedPage(null)} />
      ) : (
        <PagesList pages={pages} onPageClick={setSelectedPage} />
      )}
    </main>
  );
};