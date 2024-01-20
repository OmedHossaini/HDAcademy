// Importing the Outlet component from the 'react-router-dom' library
import { Outlet } from 'react-router-dom';

// Defining the Layout component
const Layout = () => {
    // Rendering the nested routes using Outlet
    return <Outlet />;
}

// Exporting the Layout component as the default export
export default Layout;
