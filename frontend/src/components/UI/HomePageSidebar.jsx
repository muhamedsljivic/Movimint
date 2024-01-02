import classes from "./HomePageSidebar.module.css";
import { LuPopcorn } from "react-icons/lu";

const HomePageSidebar = () => {
  return (
    <div className={classes.sidebar}>
      <h2>Browse</h2>
      <ul className={classes.browse}>
        <li>
          <LuPopcorn />
          <p>Movies</p>
        </li>
      </ul>
      <h2>Notifications</h2>
    </div>
  );
};

export default HomePageSidebar;
