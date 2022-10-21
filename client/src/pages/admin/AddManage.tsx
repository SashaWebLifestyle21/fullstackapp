import React from 'react';
import Header from '../../containers/Header/Header';
import Title from '../../components/common-components/Title/Title';
import FormGroup from '../../components/common-components/FormGroup/FormGroup';
import { useState, useCallback } from 'react';
import Button from '../../components/common-components/Button/Button';
import { validOnlyLetter,validEmail, validPassword } from '../../api/validation/validation';
import { BaseSyntheticEvent } from 'react';
import { registerUser } from '../../redux/reducers/user/userSlice';
import { useAppDispatch } from '../../hooks/redux';

const AddManage: React.FC = () => {

    const dispatch = useAppDispatch()

    const [manageName, setManageName] = useState({
        name: '',
        error: true,
        dirty: false
    })

    const [manageEmail, setManageEmail] = useState({
        email: '',
        error: true,
        dirty: false
    })

    const [managePassword, setManagePassword] = useState({
        password: '',
        error: true,
        dirty: false
    })

    const handleUserName = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        !validOnlyLetter(event.currentTarget.value)
            ? setManageName({...manageName, name: event.currentTarget.value, error: true})
            : setManageName({...manageName, name: event.currentTarget.value, error: false})
    }, [manageName])

    const handleEmail = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        !validEmail(event.currentTarget.value)
            ? setManageEmail({...manageEmail, email: event.currentTarget.value, error: true})
            : setManageEmail({...manageEmail, email: event.currentTarget.value, error: false})
    },[manageEmail])

    const handlePassword = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        !validPassword(event.currentTarget.value)
            ? setManagePassword({...managePassword, password: event.currentTarget.value, error: true})
            : setManagePassword({...managePassword, password: event.currentTarget.value, error: false})
    },[managePassword])

    const blurHandler = (e: BaseSyntheticEvent) => {
        switch (e.target.name) {
            case 'username':
                setManageName({...manageName, dirty: true})
                break
            case 'email':
                setManageEmail({...manageEmail, dirty: true})
                break
            case 'password':
                setManagePassword({...managePassword, dirty: true})
                break
        }
    }

    const addManageHandler = async () => {
        try {
            if(validPassword(managePassword.password) && validEmail(manageEmail.email) && validOnlyLetter(manageName.name)){
                dispatch(registerUser({
                    username: manageName.name,
                    email: manageEmail.email,
                    password: managePassword.password,
                    role: 'MANAGER'
                }))
                setManageName({
                    name: '',
                    error: true,
                    dirty: false
                })
                setManagePassword({
                    password: '',
                    error: true,
                    dirty: false
                })
                setManageEmail({
                    email: '',
                    error: true,
                    dirty: false
                })
            }
        } catch (e) {
            console.log('err register ', e)
        }
    }

    return (
        <div>
            <Header img={'../Images/headerback.jpg'} title='Добавить менеджера' />
            <div className='max-w-[1200px] m-auto flex justify-between items-center flex-wrap gap-x-[64px] gap-y-[80px] mb-[20px]'>
            <div className='w-[411px] m-auto border-2 border-solid border-primary rounded-[15px] p-[15px] mb-[20px]'>
            <form onSubmit={(e) => e.preventDefault()}>
                <Title className='mb-[15px]'>Добавить менеджера</Title>
                <FormGroup
                    labelName={'username'}
                    labelText={'Username'}
                    inputName={'username'}
                    inputType={'text'}
                    placeholder={'Alexandr'}
                    value={manageName.name}
                    error={'Username должно содержать только буквы'}
                    displayError={manageName.error && manageName.dirty}
                    onChange={handleUserName}
                    onBlur={blurHandler}
                />
                <FormGroup
                    labelName={'email'}
                    labelText={'Email'}
                    inputName={'email'}
                    inputType={'email'}
                    placeholder={'sasha.svetogor@gmail.com'}
                    value={manageEmail.email}
                    displayError={manageEmail.error && manageEmail.dirty}
                    error={'неккоректный email'}
                    onChange={handleEmail}
                    onBlur={blurHandler}
                />
                <FormGroup
                    labelName={'password'}
                    labelText={'Password'}
                    inputName={'password'}
                    inputType={'text'}
                    placeholder={'Password'}
                    value={managePassword.password}
                    error={'Минимальная длина пароля 6 символов'}
                    displayError={managePassword.error && managePassword.dirty}
                    onChange={handlePassword}
                    onBlur={blurHandler}
                />
                <Button
                    className={`bg-primary text-white block m-auto`}
                    onClick={addManageHandler}
                >
                    Добавить
                </Button>
            </form>
        </div>
            </div>
        </div>
    );
};

export default AddManage;