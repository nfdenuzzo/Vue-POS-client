import Callback from "../components/Callback.vue";
import MenuOptions from "../views/menuSelectionView.vue";

import { requireAuth } from "../utils/auth";

const routes = [
  {
    path: "/",
    name: "App",
    meta: {
      title: "Franco's",
      auth: false
    },
    component: () => import("../Views/MainLayout/mainLayout.vue"),
    children: [
      {
        path: "",
        name: "HomePage",
        component: () => import("../Views/HomePage.vue"),
      },
      {
        path: "/menu-options",
        name: "MenuOptions",
        meta: {
          title: "Franco's - Menu Options",
          // dispatchMethod: { name: "retrieveMenuItems", payload: "" },
          auth: false
        },
        component: MenuOptions
      },
      {
        path: "/menu-option-starters",
        name: "MenuOptionStarters",
        meta: {
          title: "Franco's - Starters Menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "starters", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOption.vue")
      },
      {
        path: "/menu-option-pizza",
        name: "MenuOptionPizza",
        meta: {
          title: "Franco's - Pizza Menu",
          dispatchMethod: { name: "retrieveMenuItems", payload: "" },
          auth: false
        },
        component: () => import("../views/Menu/menuOptionChildren.vue"),
        children: [
          {
            path: "/",
            name: "signature-pizzas",
            component: () => import("../views/Menu/menuOption.vue"),
            meta: {
              title: "Franco's - Signature Pizza Menu",
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
            component: () => import("../views/Menu/menuOption.vue"),
            meta: {
              title: "Franco's - Classic Pizza Menu",
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
            component: () => import("../views/Menu/menuOption.vue"),
            meta: {
              title: "Franco's - Pizza Bread Menu",
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
          title: "Franco's - Pasta Menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "pasta", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOption.vue")
      },
      {
        path: "/menu-option-chef-specials",
        name: "MenuOptionChefSpecial",
        meta: {
          title: "Franco's - Chef Specials Menu",
          dispatchMethod: { name: "retrieveMenuItems", payload: "" },
          auth: false
        },
        component: () => import("../views/Menu/menuOptionChildren.vue"),
        children: [
          {
            path: "/",
            name: "meat-dishes",
            component: () => import("../views/Menu/menuOption.vue"),
            meta: {
              title: "Franco's - Meat Dishes Menu",
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
            component: () => import("../views/Menu/menuOption.vue"),
            meta: {
              title: "Franco's - Chicken Dishes Menu",
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
            component: () => import("../views/Menu/menuOption.vue"),
            meta: {
              title: "Franco's - Pork Dishes Menu",
              dispatchMethod: {
                name: "retrieveMenuItems",
                payload: { value: "chef-special-pork", forceRefresh: false }
              },
              auth: false
            }
          },
          // {
          //   path: "other-dishes",
          //   name: "other-dishes",
          //   component: () => import("../views/Menu/menuOption.vue"),
          //   meta: {
          //     title: "Franco's - Other Dishes Menu",
          //     dispatchMethod: {
          //       name: "retrieveMenuItems",
          //       payload: { value: "chef-special-other", forceRefresh: false }
          //     },
          //     auth: false
          //   }
          // },
          {
            path: "burgers",
            name: "burgers",
            component: () => import("../views/Menu/menuOption.vue"),
            meta: {
              title: "Franco's - Burgers Menu",
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
          title: "Franco's - Seafood Menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "seafood", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOption.vue")
      },
      {
        path: "/menu-option-kids-menu",
        name: "MenuOptionKids",
        meta: {
          title: "Franco's - Kids Menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "kids-menu", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOption.vue")
      },
      // {
      //   path: "/menu-option-desserts",
      //   name: "MenuOptionDesserts",
      //   meta: {
      //     title: "Franco's - Desserts Menu",
      //     dispatchMethod: {
      //       name: "retrieveMenuItems",
      //       payload: { value: "desserts", forceRefresh: false }
      //     },
      //     auth: false
      //   },
      //   component: () => import("../views/Menu/menuOption.vue")
      // },
      {
        path: "/menu-option-extras",
        name: "MenuOptionExtra",
        meta: {
          title: "Franco's - Extras menu",
          dispatchMethod: {
            name: "retrieveMenuItems",
            payload: { value: "extras", forceRefresh: false }
          },
          auth: false
        },
        component: () => import("../views/Menu/menuOption.vue")
      },
      {
        path: "/view-menu-categories",
        name: "menuCategories",
        meta: {
          title: "Franco's - Menu Categories",
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
          title: "Franco's - Create Side Option",
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
          title: "Franco's - Create Add-on Category",
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
          title: "Franco's - Create Menu Item",
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
          title: "Franco's - Current Users",
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
          title: "Franco's - My Profile",
          dispatchMethod: { name: "retrieveMyProfile", payload: "" },
          auth: true
        },
        component: () => import("../views/Profile/viewMyProfile.vue")
      },
      {
        path: "/view-my-active-orders",
        name: "activeOrders",
        meta: {
          title: "Franco's - Active Orders",
          dispatchMethod: { name: "retrieveActiveOrders", payload: "" },
          auth: true
        },
        component: () => import("../views/Orders/viewMyActiveOders.vue")
      },
      {
        path: "/current-orders",
        name: "currentActiveOrders",
        meta: {
          title: "Franco's - Current Orders",
          dispatchMethod: { name: "retrieveActiveOrders", payload: "" },
          auth: true
        },
        component: () => import("../views/Orders/viewAllActiveOrders.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/order-history",
        name: "orderHistory",
        meta: {
          title: "Franco's - Order History",
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
          title: "Franco's - Admin Settings",
          dispatchMethod: { name: "retrieveAdminGeneralSettings", payload: "" },
          auth: true
        },
        component: () => import("../views/Admin/viewGeneralSettings.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/system-statistics",
        name: "systemStatistics",
        meta: {
          title: "Franco's - Admin System Statistics",
          dispatchMethod: { name: "retrieveSystemStatistics", payload: "" },
          auth: true
        },
        component: () => import("../views/Admin/viewSystemStatistics.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/campaigns",
        name: "campaigns",
        meta: {
          title: "Franco's - Admin Campaigns",
          dispatchMethod: { name: "retrieveRules", payload: "" },
          auth: true
        },
        component: () => import("../views/Admin/viewSpecialsCampaign.vue"),
        beforeEnter: requireAuth
      },
      {
        path: "/current-special/:special",
        name: "currentSpecial",
        meta: {
          title: "Franco's - Current Special"
        },
        component: () => import("../views/Specials/viewCurrentSpecial.vue")
      },
      {
        path: "/callback",
        name: "Callback",
        component: Callback
      },
      {
        path: "*",
        name: "404",
        component: () => import("pages/Error404.vue")
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    name: "404",
    component: () => import("pages/Error404.vue")
  }
];
export default routes;
