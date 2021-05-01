import Header from "./components/header/Header";
import NewsLetter from "./components/newsletter/NewsLetter";
import Shop from "./components/shop/Shop";
import Footer from "./components/footer/Footer";
import "./index.css";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Shop />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default App;
