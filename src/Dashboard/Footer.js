import React from 'react'

const Footer = () => {
    const today = new Date();
    return (
        
        <div id="layoutAuthentication_footer"><br></br>
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4 " >
                    <div style={{ "textAlign": "right" }}>
                        <div className="text-muted mt-100"><p style={{
        color: 'black'}}>© {today.getFullYear()} Patient Management System. All Rights Reserved.</p></div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer