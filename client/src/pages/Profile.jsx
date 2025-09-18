import MyOrdersPage from "./MyOrdersPage.jsx";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* left section */}
          <div className="w-full md:w-2/3 lg:w-1/3 xl:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Vandhan Murali Kavuri
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              vandhanchowdhary@gmail.com
            </p>
            <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-red-500 hover:text-black transition-colors duration-200">
              Log Out
            </button>
          </div>

          {/* right section, orders table */}
          <div className="w-full md:w-2/3 lg:3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
