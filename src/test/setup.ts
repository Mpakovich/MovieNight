console.log('Vitest setup loaded!');
import '@testing-library/jest-dom/vitest';
import React from 'react';
(globalThis as any).React = React;