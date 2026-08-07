import { Navbar, Welcome, Dock, Windows } from "#components";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Windows />
    </main>
  );
};

export default App;