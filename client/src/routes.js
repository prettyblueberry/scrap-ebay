/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React layouts
import Settings from "layouts/pages/account/settings";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";

// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images

//customized components
import SellerList from "layouts/sellers/analytics";
import ItemList from "layouts/items/list";
import LoadManage from "layouts/load";
import LoadStore from "layouts/loadStore";
import SellersManage from "layouts/sellers/manage";
import UsersManage from "layouts/users";
import authController from "./controllers/auth";
import SignOut from "./layouts/authentication/sign-out";
import {useEffect, useState} from "react";
import SoldItems from "./layouts/items/sold";

const Username = ()=>{
  const [name, setName] = useState("");
  useEffect(()=>{
    const auth = authController.getAuth();
    setName(auth.user.name);
  });
  return name;
}
const routes = [
  {
    type: "collapse",
    name: <Username />,
    key: "brooklyn-alice",
    icon: <MDAvatar alt={""} size="sm" />,
    collapse: [
      // {
      //   name: "My Profile",
      //   key: "my-profile",
      //   route: "/pages/profile/profile-overview",
      //   component: <ProfileOverview />,
      // },
      {
        name: "Change Password",
        key: "settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
      {
        name: "Sign Out",
        key: "logout",
        route: "/sign-out",
        component: <SignOut />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  { type: "title", title: "Analytics", key: "title-analytics" },
  {
    type: "collapse",
    name: "Analytics by Days",
    key: "analytics",
    icon: <Icon fontSize="medium">analytics</Icon>,
    noCollapse: true,
    route:"/analytics",
    component: <SellerList />,
  },
  { type: "title", title: "Browse Items", key: "title-items" },
  {
    type: "collapse",
    name: "All Items",
    key: "items",
    icon: <Icon fontSize="medium">apps</Icon>,
    noCollapse: true,
    route: "/items",
    component: <ItemList filter={{loadDatetime: "latest"}}/>,
  },
  {
    type: "collapse",
    name: "Items Sold",
    key: "sold-items",
    icon: <Icon fontSize="medium">shopping cart</Icon>,
    noCollapse: true,
    route: "/sold-items",
    component: <SoldItems/>,
  },

  { type: "divider", key: "divider-1" },
  { type: "title", title: "Manage", key: "title-manage" },
  {
    type: "collapse",
    name: "Load from eBay",
    key: "load",
    icon: <Icon fontSize="medium">download</Icon>,
    noCollapse: true,
    route: "/load",
    component: <LoadManage />,
  },
  {
    type: "collapse",
    name: "Load Store from eBay",
    key: "load-store",
    icon: <Icon fontSize="medium">download</Icon>,
    noCollapse: true,
    route: "/load-store",
    component: <LoadStore />,
  },
  {
    type: "collapse",
    name: "Manage Sellers",
    key: "sellers",
    icon: <Icon fontSize="medium">sellers</Icon>,
    noCollapse: true,
    route: "/sellers/manage",
    component: <SellersManage />,
  },
  {
    type: "collapse",
    name: "Manage Users",
    key: "users",
    icon: <Icon fontSize="medium">manage</Icon>,
    noCollapse: true,
    route: "/users/manage",
    component: <UsersManage />,
  },
  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    hidden: true,
    icon: <Icon fontSize="medium">content_paste</Icon>,
    collapse: [
      {
        name: "Sign In",
        key: "sign-in",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/sign-in",
            component: <SignInBasic />,
          },
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/sign-in/basic",
            component: <SignInBasic />,
          },
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-in/cover",
            component: <SignInCover />,
          },
          {
            name: "Illustration",
            key: "illustration",
            route: "/authentication/sign-in/illustration",
            component: <SignInIllustration />,
          },
        ],
      },
      {
        name: "Sign Up",
        key: "sign-up",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-up/cover",
            component: <SignUpCover />,
          },
        ],
      },
      {
        name: "Reset Password",
        key: "reset-password",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/reset-password/cover",
            component: <ResetCover />,
          },
        ],
      },
    ],
  },
];

export default routes;
