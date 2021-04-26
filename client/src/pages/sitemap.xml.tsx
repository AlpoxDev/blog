import { GetServerSideProps } from 'next';
import React from 'react';

const Sitemap: React.FC = () => null;

const defaultSitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
</urlset>
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (!res) return { props: {} };

  const sitemap = defaultSitemap;
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
};

export default Sitemap;
