import React from "react";
import useLocalStorageState from "use-local-storage-state";
import { nanoid } from "nanoid";
import {
  Box,
  Drawer,
  CssBaseline,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Modal,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";

const drawerWidth = 240;

const useStyles = makeStyles({
  btn: {
    fontSize: 60,
    backgroundColor: "violet",
  },
  title: {
    marginTop: "80px",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyBooks = (props) => {
  const classes = useStyles();
  // add class to MUI component like <Button classnName={classes.btn} />
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [books, setBooks] = useLocalStorageState("books", { defaultValue: [] });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const addHandler = (event) => {
    event.preventDefault();
    setBooks((prevState) => [
      ...prevState,
      {
        title: event.target.titleInput.value,
        id: nanoid(),
        words: [],
        color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`,
      },
    ]);
    setModalOpen(false);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button key="key" onClick={() => setModalOpen(true)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Book" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {books.map((book, index) => (
          <ListItem button key={nanoid()}>
            <ListItemIcon>
              <CircleIcon
                sx={{
                  color: book.color,
                }}
              />
            </ListItemIcon>
            <ListItemText primary={book.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          className={classes.title}
          position="fixed"
          sx={{
            // width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            zIndex: "1",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              My Books
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            zIndex: "0",
          }}
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                marginTop: "90px",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Enter Book Title
              </Typography>
              <form onSubmit={addHandler}>
                <TextField
                  fullWidth
                  autoFocus
                  id="titleInput"
                  label="Title"
                  variant="outlined"
                  size="medium"
                  margin="normal"
                ></TextField>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  endIcon={<ArrowForwardIosIcon />}
                  sx={{ margin: "2em 0em" }}
                >
                  Add
                </Button>
              </form>
            </Box>
          </Modal>
          <Typography paragraph>Some text here 1</Typography>
          <Typography paragraph>Another para</Typography>
        </Box>
      </Box>
    </>
  );
};

export default MyBooks;
