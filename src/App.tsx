import MainBanner from './components/MainBanner';

function App() {
  return (
    <main className="bg-gray-200">
      <div className="max-w-md m-auto  bg-white">
        <MainBanner />
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
    </main>
  );
}

export default App;
