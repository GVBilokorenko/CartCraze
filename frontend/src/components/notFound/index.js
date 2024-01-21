import './notFound.scss';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-neutral text-neutral-content">
      <div className="text-center">
        <h1 className="text-8xl font-bold animate-pulse">404</h1>
        <p className="text-lg mb-8">Sorry, the page you're looking for cannot be found.</p>
        <button className="btn btn-primary" onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default NotFound;
