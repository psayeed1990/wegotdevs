const showMenu = () => {
  if (process.browser) {
    const userMenu = document.getElementById("nav").style;
    if (userMenu.visibility === "") {
      userMenu.opacity = 1;
      return (userMenu.visibility = "visible");
    }
    if (userMenu.visibility === "hidden") {
      userMenu.visibility = "visible";
      return (userMenu.opacity = 1);
    }

    if (userMenu.visibility === "visible") {
      userMenu.visibility = "hidden";
      return (userMenu.opacity = 0);
    }
  } else {
    return;
  }
};

export default showMenu;
