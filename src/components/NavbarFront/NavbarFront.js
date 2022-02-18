import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import _ from "lodash";
import {
  AiFillAppstore,
  AiOutlineUserSwitch,
  AiOutlineSchedule,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
  AiOutlineTeam,
} from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import "./NavbarFront.css";
import { useDispatch } from "react-redux";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";
import { getOffice } from "../../redux/actions/office/office.actions";
import { PersonSharp } from "@material-ui/icons";
import { addStaff } from "../../redux/actions/staff/staff.auth.action";

const NavbarFront = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = React.useState(false);
  const [searchResult, setSearch] = React.useState([]);
  const [item, setItem] = React.useState("");
  const [office, setOffice] = React.useState([]);

  const [fullname, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const btnRef = React.useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const logoutHandler = () => {};

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { office: item, fullname, email, password, mobile };
    dispatch(addStaff(data, toast, setLoading));
    setEmail("");
    setFullName("");
    setPassword("");
    setMobile("");
    setItem("");
  };

  React.useEffect(() => {
    const filteredSearch = searchResult.map(({ office, _id }) => {
      return (
        <div key={_id}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setItem(office);
            }}
            style={{
              backgroundColor: "#f17230",
              width: "100%",
              padding: "10px",
              margin: "3px 0px",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {office.toUpperCase()}
          </button>
        </div>
      );
    });
    setOffice(filteredSearch);

    return () => {
      setOffice([]);
    };
  }, [searchResult]);

  const onChangeHandler = (e) => {
    setItem(e.target.value);
    dispatch(getOffice(e.target.value, setSearch, _));
  };

  return (
    <>
      <div className="navbar__container">
        <div className="navbar__logo">
          <img src={logo} alt="ACA" />
        </div>
        <div className="navbar__links">
          <Link to="/frontdesk/dashboard" className="links__dashboard">
            <div className="link">
              <AiFillAppstore />
              <h3>Dashboard</h3>
            </div>
          </Link>
          <Link to="/frontdesk/guest" className="links__guest">
            <div className="link">
              <AiOutlineUserSwitch />
              <h3>Guest</h3>
            </div>
          </Link>

          <Link to="/admin/logs" className="links__logs">
            <div className="link">
              <AiOutlineSchedule />
              <h3>Logs</h3>
            </div>
          </Link>
          <Link to="/admin/register" className="links__add__admin">
            <div className="link">
              <AiOutlineUserAdd />
              <h3>Add Admin</h3>
            </div>
          </Link>
          <button onClick={onOpen} className="links__add__staff">
            <div className="link">
              <AiOutlineUsergroupAdd />
              <h3>Add Staff</h3>
            </div>
          </button>
          <button onClick={logoutHandler} className="links__logout">
            <div className="link">
              <FaSignOutAlt />
              <h3>Logout</h3>
            </div>
          </button>
        </div>
      </div>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a staff</DrawerHeader>

          <DrawerBody>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="">Staff Full Name</label>
                <Input
                  placeholder="Type fullname..."
                  value={fullname}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Staff Email Address</label>
                <Input
                  placeholder="Type email address..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Staff Mobile Number</label>
                <Input
                  placeholder="Type mobile number..."
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Login Password</label>
                <Input
                  placeholder="Type password..."
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Office</label>
                <Input
                  placeholder="Choose office..."
                  value={item}
                  onChange={onChangeHandler}
                />
                {office}
              </div>
              <div style={{ marginTop: "10px" }}>
                <Button
                  rightIcon={<PersonSharp />}
                  colorScheme="green"
                  variant="solid"
                  type="submit"
                  isLoading={loading}
                  loadingText="Adding..."
                >
                  Add Staff
                </Button>
              </div>
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarFront;
