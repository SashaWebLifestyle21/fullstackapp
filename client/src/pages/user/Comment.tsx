import React, {useState} from 'react';
import Header from "../../containers/Header/Header";
import {Link} from "react-router-dom";
import { IManager } from '../../redux/reducers/Manager/managerSlice';
import Title from "../../components/common-components/Title/Title";
import CardManager from "../../components/common-components/CardManager/CardManager";

interface IComment {
    managers: IManager[]
}

const Comment = ({ managers }: IComment) => {

    const [managersList, setManagersList] = useState<IManager[]>(managers)

    return (
        <div>
            <Header img={'../Images/headerback.jpg'} title={`Оставить комментарий менеджеру`} />
            <Title className='mb-[50px]'>Выбирите кому хотите оставить отзыв</Title>
            <div className='max-w-[1200px] m-auto mb-[20px] flex items-center justify-center gap-x-[20px] mb-[50px]'>
                {managersList.map(manager => {
                    return (<Link to={manager._id} key={manager._id}>
                            <CardManager managerName={manager.user.username} managerEmail={manager.user.email} managerCount={manager.count} />
                    </Link>)})}
            </div>
        </div>
    );
};

export default Comment;