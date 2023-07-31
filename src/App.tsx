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
