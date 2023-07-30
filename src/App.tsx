// import './App.css';

// function App(): JSX.Element {
//   return <>Lucky Coders E-Commerce Application</>;
// }

// export default App;

interface SimpleComponentProps {
  name: string;
}

function App({ name }: SimpleComponentProps): JSX.Element {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>This is a simple React component.</p>
    </div>
  );
}

export default App;
