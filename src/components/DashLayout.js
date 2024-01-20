// Importing the Outlet component from the 'react-router-dom' library
import { Outlet } from 'react-router-dom'

// Importing the DashHeader and DashFooter components
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

// Defining the DashLayout component
const DashLayout = () => {
    return (
        <>
            {/* Displaying the DashHeader component */}
            <DashHeader />

            {/* Main content container for dashboard */}
            <div className="dash-container">
                {/* Rendering the nested routes using Outlet */}
                <Outlet />
            </div>

            {/* Displaying the DashFooter component */}
            <DashFooter />
        </>
    )
}

// Exporting the DashLayout component as the default export
export default DashLayout
