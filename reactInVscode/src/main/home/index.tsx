import React from 'react';
import * as ReactDOM from 'react-dom/client';

// types.ts
interface Article {
  id: number;
  title: string;
  body: string;
  author: string;
  date: string;
}

class App extends React.Component {
  render() {
    return (
      <div>你好</div>
    );
  }
}

// React 18
const container: HTMLElement | null = document.getElementById("root");

const root = ReactDOM.createRoot(container as HTMLElement);
root.render(<App />);
