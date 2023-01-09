import React from 'react'

const Footer = () => {
    const today = new Date();
    return (
        <div id="layoutAuthentication_footer">
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                    <div style={{ "textAlign": "right" }}>
                        <div className="text-muted">© {today.getFullYear()} Patient Management System. All Rights Reserved.</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer