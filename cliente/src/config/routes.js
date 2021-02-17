// Layouts
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

// Admin Pages
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';
import AdminUsers from '../pages/Admin/Users/Users'; 
import AdminCourses from '../pages/Admin/Courses';
import AdminBlog from '../pages/Admin/Blog';

//Basic Pages
import BasicHome from '../pages/Home';
import Contact from '../pages/Contact';
import MenuWeb  from '../pages/Admin/MenuWeb/MenuWeb'
import Courses from '../pages/Courses';
import Blog from '../pages/Blog';

// Other
import Error404 from '../pages/Error404'

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/menu",
                component: MenuWeb,
                exact: true
            },
            {
                path: "/admin/courses",
                component: AdminCourses,
                exact: true
            },
            {
                path: "/admin/blogs",
                component: AdminBlog,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes:[
            {
                path: "/",
                component: BasicHome,
                exact: true
            },
            {
                path: "/contacto",
                component: Contact,
                exact: true
            },
            {
                path: "/courses",
                component: Courses,
                exact: true
            },
            {
                path: "/blog",
                component: Blog,
                exact: true
            },
            {
                path: "/blog/:url",
                component: Blog,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
];

export default routes;