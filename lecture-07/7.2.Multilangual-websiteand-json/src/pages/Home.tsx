import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Multilingual Website</h1>
      <p>Choose your language / აირჩიეთ ენა:</p>
      <ul>
        <li><Link to="/en">English</Link></li>
        <li><Link to="/ge">ქართული</Link></li>
      </ul>
    </div>
  );
}

export default Home;
