
import { AuctionBody } from "./components/auctions/AuctionBody";
import { NavComp } from "./authentication/NavComp";
import AuthProvider from "./context/AuthContext";
import FireStoreDataProvider from "./context/FireStoreDataContext";


export const App = () => {
  return (
    <>
      <AuthProvider>
        <FireStoreDataProvider>
          <NavComp />
          <AuctionBody />
        </FireStoreDataProvider>
      </AuthProvider>
    </>

  );
};
