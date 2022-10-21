import React from 'react';
import AdminMenu from '../../containers/AdminMenu/AdminMenu';
import Header from '../../containers/Header/Header';

const Admin: React.FC = () => {
    return (
        <div>
            <Header img={'../Images/headerback.jpg'} title='Admin page' />
            <div className='max-w-[1200px] m-auto flex justify-between items-center flex-wrap gap-x-[64px] gap-y-[80px] mb-[20px]'>
                <AdminMenu />
            </div>
        </div>
    );
};

export default Admin;