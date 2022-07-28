import * as React from 'react';
import Tree from './Tree';

import './style.css';

export default function App() {
  return (
    <div>
      <Tree points={12} center={false} rotate={180} />
    </div>
  );
}
