import React, { useEffect, useState } from 'react';
import apiURL from '../api';

export const Page = ({ page, onBack }) => {
  const [pageDetails, setPageDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPageDetails() {
      try {
        const response = await fetch(`${apiURL}/wiki/${page.slug}`);
        const data = await response.json();
        setPageDetails(data);
      } catch (error) {
        console.error("Error fetching page details:", error);
        setPageDetails(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPageDetails();
  }, [page.slug]);

  if (loading) return <div>Loading...</div>;
  if (!pageDetails) return <div>No page details found.</div>;

  return (
    <div>
      <h2>{pageDetails.title}</h2>
      <p><strong>Author:</strong> {pageDetails.author?.name || 'Unknown'}</p>
      <p><strong>Content:</strong> {pageDetails.content}</p>
      <p><strong>Status:</strong> {pageDetails.status}</p>
      <p><strong>Tags:</strong> {pageDetails.tags && pageDetails.tags.map(tag => tag.name).join(', ')}</p>
      <p><strong>Date:</strong> {new Date(pageDetails.createdAt).toLocaleDateString()}</p>
      <button onClick={onBack}>Back to Wiki List</button>
    </div>
  );
};
