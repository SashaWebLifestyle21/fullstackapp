import React, {useState} from 'react';
import Header from "../../containers/Header/Header";
import FormGroup from "./FormGroup/FormGroup";
import { IManager } from '../../redux/reducers/Manager/managerSlice';
import Button from "./Button/Button";
import {useAppDispatch} from "../../hooks/redux";
import {createComment} from "../../redux/reducers/Comment/commentSlice";

interface IItemComment {
    manager: IManager
}

const ItemComment = ({ manager }: IItemComment) => {

    const dispatch = useAppDispatch()

    const [comment, setComment] = useState('')

    const handleSubmit = () => {
        dispatch(createComment({managerId: manager._id, comment}))
    }

    return (
        <div>
            <Header img={'../Images/headerback.jpg'} title={`Оставить комментарий менеджеру`} />
            <div className='max-w-[1200px] m-auto mb-[20px]'>
                <div className='flex items-center justify-center gap-x-[40px] mb-[20px]'>
                    <p className='text-primary text-lg font-semiBold'>{`Имя: ${manager.user.username}`}</p>
                    <p className='text-primary text-lg font-semiBold'>{`Email: ${manager.user.email}`}</p>
                </div>
                <form action=""
                      onSubmit={event => event.preventDefault()}
                    className='w-1/2 m-auto border-2 border-primary rounded-[15px] p-[20px]'
                >
                    <FormGroup
                        labelName={'comment'}
                        labelText={'Коментарий'}
                        inputName={'comment'}
                        inputType={'text'}
                        value={comment}
                        onChange={e => setComment(e.currentTarget.value)}
                    />
                    <Button
                        className='bg-primary text-white flex items-center justify-center'
                        onClick={handleSubmit}
                    >
                        Отправить
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ItemComment;