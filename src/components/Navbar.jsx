import useWindowStore from "#store/Window";
import { navLinks, navIcons } from "#constants/index.js";
import dayjs from "dayjs";

const Navbar = () => {
  const {openWindow} = useWindowStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">My Portfolio</p>

        <ul>
          {navLinks.map((item) => (
            <li key={item.id} onClick={() => openWindow(item.type)}>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className="icon-hover" />
            </li>
          ))}
        </ul>
        <time>
            {dayjs().format("ddd MMM D, h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;