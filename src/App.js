
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  const rows = [];
  for (let i = 0; i < 16; i++) {
    const cols = [];
    for (let j = 0; j < 16; j++) {
      cols.push(<Col key={j} className={`grid-col f-${j}-${i}`} />);
    }
    rows.push(<div key={i} className="grid-row"><Row>{cols}</Row></div>);
  }

  return (
      <div id='global'>

        <Container fluid className="grid-container">
          {rows}
        </Container>

      </div>
  );
}

export default App;