const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const servicesDir = path.join(pagesDir, 'Services');

[pagesDir, servicesDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const template = (name) => `import React from 'react';
import { motion } from 'framer-motion';

export const ${name} = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container-custom section-padding min-h-[60vh] flex flex-col justify-center items-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-brand-950 mb-6">${name}</h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center">
        This is the ${name} page. Content is currently being built for this premium section.
      </p>
    </motion.div>
  );
};
`;

const pages = [
  { path: 'Home.tsx', name: 'Home' },
  { path: 'About.tsx', name: 'About' },
  { path: 'Projects.tsx', name: 'Projects' },
  { path: 'ProjectDetails.tsx', name: 'ProjectDetails' },
  { path: 'Equipment.tsx', name: 'Equipment' },
  { path: 'Gallery.tsx', name: 'Gallery' },
  { path: 'Contact.tsx', name: 'Contact' },
  { path: 'Services/ServicesLayout.tsx', name: 'ServicesLayout', custom: `import React from 'react';
import { Outlet } from 'react-router-dom';

export const ServicesLayout = () => {
  return (
    <div>
      <div className="bg-brand-50 py-12 border-b border-brand-100">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-950">Our Services</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Premium infrastructure solutions delivered with precision and expertise.</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
`},
  { path: 'Services/RoadConstruction.tsx', name: 'RoadConstruction' },
  { path: 'Services/AsphaltPaving.tsx', name: 'AsphaltPaving' },
  { path: 'Services/RoadMaintenance.tsx', name: 'RoadMaintenance' },
  { path: 'Services/Infrastructure.tsx', name: 'Infrastructure' },
];

pages.forEach(p => {
  fs.writeFileSync(path.join(pagesDir, p.path), p.custom || template(p.name));
});

console.log('Placeholder pages created.');
