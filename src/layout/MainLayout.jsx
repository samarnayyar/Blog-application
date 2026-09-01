import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="mt-16 px-4">{children}</main>
    </div>
  );
};

export default MainLayout;
