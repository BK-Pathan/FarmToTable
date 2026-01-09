import React from 'react';
import './blog.css';

const posts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1477436073742-6598af1e7d3e?auto=format&fit=crop&w=800&q=60',
    title: 'How to Choose Quality Ghee',
    excerpt: 'Ghee is a pantry staple — learn what to look for and how to store it.'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1484981184820-2e84ea0c3ad9?auto=format&fit=crop&w=800&q=60',
    title: 'Benefits of Raw Honey',
    excerpt: 'Discover the health benefits of incorporating raw honey into your diet.'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=800&q=60',
    title: 'Farm-to-Table Explained',
    excerpt: 'We explain how a farm-to-table supply chain helps keep food fresh and premium.'
  }
];

export default function Blog(){
  return (
    <section className="blog">
      <div className="container">
        <header className="blog-header">
          <h2>Latest News</h2>
          <p className="blog-sub">Read about our stories and product tips</p>
        </header>
        <div className="blog-grid">
          {posts.map((p) => (
            <article className="blog-card" key={p.id}>
              <img src={p.image} alt={p.title} className="blog-img" />
              <div className="blog-body">
                <h3 className="blog-title">{p.title}</h3>
                <p className="blog-excerpt">{p.excerpt}</p>
                <a href="#" className="read-more">Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
