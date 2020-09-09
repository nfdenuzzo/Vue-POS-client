import Callback from "../components/Callback";
import MenuOptions from "../views/menuSelectionView";

import { requireAuth } from "../utils/auth";

const routes = [
  {
    path: "/",
    name: "App",
    meta: {
      title: "Black Forest Grill",
      auth: false
    },
    component: () => import("../Views/MainLayout/mainLayout.vue"),
    children: [
      {
        path: "",
        name: "HomePage",
        component: () => import("../Views/HomePage.vue")
      },
      {
        path: "/menu-options",
        name: "MenuOptions",
        meta: {
          title: "Black Forest Grill - Menu Options",
          // dispatchMethod: { name: "retrieveMenuItems", payload: "" },
          auth: false
        },
        component: MenuOptions
      },
      {
        path: "/menu-option-starters",
        name: "MenuOptionStarters",
        meta: {
          title: "Black Forest Grill - Starters Menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "starters", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOptionStarters.vue")
      },
      {
        path: "/menu-option-pizza",
        name: "MenuOptionPizza",
        meta: {
          title: "Black Forest Grill - Pizza Menu",
          //  dispatchMethod: { name:  "retrieveMenuItems", payload: "" },
          auth: false
        },
        component: () => import("../views/Menu/menuOptionPizza.vue"),
        children: [
          {
            path: "/",
            name: "signature-pizzas",
            component: () =>
              import("../views/Menu/menuOptionPizzaSelected.vue"),
            meta: {
              title: "Black Forest Grill - Signature Pizza Menu",
              dispatchMethod: {
                name: "retrieveMenuItems",
                payload: { value: "signature-pizzas", forceRefresh: false }
              },
              auth: false
            }
          },
          {
            path: "classic-pizzas",
            name: "classic-pizzas",
            component: () =>
              import("../views/Menu/menuOptionPizzaSelected.vue"),
            meta: {
              title: "Black Forest Grill - Classic Pizza Menu",
              dispatchMethod: {
                name: "retrieveMenuItems",
                payload: { value: "classic-pizzas", forceRefresh: false }
              },
              auth: false
            }
          },
          {
            path: "pizza-breads",
            name: "pizza-breads",
            component: () =>
              import("../views/Menu/menuOptionPizzaSelected.vue"),
            meta: {
              title: "Black Forest Grill - Pizza Bread Menu",
              dispatchMethod: {
                name: "retrieveMenuItems",
                payload: { value: "pizza-breads", forceRefresh: false }
              },
              auth: false
            }
          }
        ]
      },
      {
        path: "/menu-option-pasta",
        name: "MenuOptionPasta",
        meta: {
          title: "Black Forest Grill - Pasta Menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "pasta", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOptionPasta.vue")
      },
      {
        path: "/menu-option-chef-specials",
        name: "MenuOptionChefSpecial",
        meta: {
          title: "Black Forest Grill - Chef Specials Menu",
          //  dispatchMethod: { name:  "retrieveMenuItems", payload: "" },
          auth: false
        },
        component: () => import("../views/Menu/menuOptionChefSpecials.vue"),
        children: [
          {
            path: "/",
            name: "meat-dishes",
            component: () =>
              import("../views/Menu/menuOptionChefSpecialsSelected.vue"),
            meta: {
              title: "Black Forest Grill - Meat Dishes Menu",
              dispatchMethod: {
                name: "retrieveMenuItems",
                payload: { value: "chef-special-meat", forceRefresh: false }
              },
              auth: false
            }
          },
          {
            path: "chicken-dishes",
            name: "chicken-dishes",
            component: () =>
              import("../views/Menu/menuOptionChefSpecialsSelected.vue"),
            meta: {
              title: "Black Forest Grill - Chicken Dishes Menu",
              dispatchMethod: {
                name: "retrieveMenuItems",
                payload: { value: "chef-special-chicken", forceRefresh: false }
              },
              auth: false
            }
          },
          {
            path: "pork-dishes",
            name: "pork-dishes",
            component: () =>
              import("../views/Menu/menuOptionChefSpecialsSelected.vue"),
            meta: {
              title: "Black Forest Grill - Pork Dishes Menu",
              dispatchMethod: {
                name: "retrieveMenuItems",
                payload: { value: "chef-special-pork", forceRefresh: false }
              },
              auth: false
            }
          },
          {
            path: "other-dishes",
            name: "other-dishes",
            component: () =>
              import("../views/Menu/menuOptionChefSpecialsSelected.vue"),
            meta: {
              title: "Black Forest Grill - Other Dishes Menu",
              dispatchMethod: {
                name: "retrieveMenuItems",
                payload: { value: "chef-special-other", forceRefresh: false }
              },
              auth: false
            }
          },
          {
            path: "burgers",
            name: "burgers",
            component: () =>
              import("../views/Menu/menuOptionChefSpecialsSelected.vue"),
            meta: {
              title: "Black Forest Grill - Burgers Menu",
              dispatchMethod: {
                name: "retrieveMenuItems",
                payload: { value: "chef-special-burgers", forceRefresh: false }
              },
              auth: false
            }
          }
        ]
      },
      {
        path: "/menu-option-seafood",
        name: "MenuOptionSeafood",
        meta: {
          title: "Black Forest Grill - Seafood Menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "seafood", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOptionSeafood.vue")
      },
      {
        path: "/menu-option-kids-menu",
        name: "MenuOptionKids",
        meta: {
          title: "Black Forest Grill - Kids Menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "kids-menu", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOptionKids.vue")
      },
      {
        path: "/menu-option-desserts",
        name: "MenuOptionDesserts",
        meta: {
          title: "Black Forest Grill - Desserts Menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "desserts", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOptionDesserts.vue")
      },
      {
        path: "/menu-option-extras",
        name: "MenuOptionExtra",
        meta: {
          title: "Black Forest Grill - Extras menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "extras", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOptionExtra.vue")
      },
      {
        path: "/view-menu-categories",
        name: "menuCategories",
        meta: {
          title: "Black Forest Grill - Menu Categories",
          dispatchMethod: { name: "retrieveMenuCategories", payload: "" },
          auth: true
        },
        component: () => import("../views/Admin/viewMenuCategories.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/create-side-item",
        name: "addSide",
        meta: {
          title: "Black Forest Grill - Create Side Option",
          dispatchMethod: { name: "retrieveAdminSideItem", payload: "" },
          auth: true
        },
        component: () => import("../views/Admin/viewSideItems.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/create-addon-category",
        name: "addCategory",
        meta: {
          title: "Black Forest Grill - Create Add-on Category",
          dispatchMethod: { name: "retrieveAdminAddonCategories", payload: "" },
          auth: true
        },
        component: () => import("../views/Admin/viewAddonCategories.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/create-menu-item",
        name: "addMenuItem",
        meta: {
          title: "Black Forest Grill - Create Menu Item",
          dispatchMethod: { name: "retrieveAdminMenuItems", payload: "" },
          auth: true
        },
        component: () => import("../views/Admin/viewMenuItems.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/current-users",
        name: "currentUsers",
        meta: {
          title: "Black Forest Grill - Current Users",
          dispatchMethod: { name: "retrieveUsersList", payload: "" },
          auth: true
        },
        component: () => import("../views/Admin/viewUsers.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/view-my-profile",
        name: "myProfile",
        meta: {
          title: "Black Forest Grill - My Profile",
          dispatchMethod: { name: "retrieveMyProfile", payload: "" },
          auth: true
        },
        component: () => import("../views/Profile/viewMyProfile.vue")
      },
      {
        path: "/view-my-active-orders",
        name: "activeOrders",
        meta: {
          title: "Black Forest Grill - Active Orders",
          dispatchMethod: { name: "retrieveActiveOrders", payload: "" },
          auth: true
        },
        component: () => import("../views/Orders/viewMyActiveOders.vue")
      },
      {
        path: "/current-orders",
        name: "currentActiveOrders",
        meta: {
          title: "Black Forest Grill - Current Orders",
          dispatchMethod: { name: "", payload: "" },
          auth: true
        },
        component: () => import("../views/Orders/viewAllActiveOrders.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/order-history",
        name: "orderHistory",
        meta: {
          title: "Black Forest Grill - Order History",
          dispatchMethod: { name: "retrieveOrderHistory", payload: "" },
          auth: true
        },
        component: () => import("../views/Orders/viewMyOrderHistory.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/general-settings",
        name: "generalSettings",
        meta: {
          title: "Black Forest Grill - Admin Settings",
          dispatchMethod: { name: "retrieveAdminGeneralSettings", payload: "" },
          auth: true
        },
        component: () => import("../views/Admin/viewGeneralSettings.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/callback",
        name: "Callback",
        component: Callback
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];
export default routes;
