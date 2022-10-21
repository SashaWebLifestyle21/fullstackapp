import React, {BaseSyntheticEvent, useCallback, useEffect, useState} from 'react';
import Title from "../../components/common-components/Title/Title";
import FormGroup from "../../components/common-components/FormGroup/FormGroup";
import Button from "../../components/common-components/Button/Button";
import { validEmail, validOnlyLetter, validPassword } from '../../api/validation/validation';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelectors } from "../../hooks/redux";
import {checkIsAuth, registerUser} from '../../redux/reducers/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

interface IRegister {
    handleRegister: () => void
}

const Register = ({ handleRegister }: IRegister) => {

    const { status, isLoading, token } = useAppSelectors(state => state.userReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuth = Boolean(token)

    useEffect(() => {
        if(status) toast(status)
        if(isAuth) {
            navigate('/home')
        }
    }, [status, isAuth, navigate])

    const [username, setUsername] = useState({
        username: '',
        error: true,
        dirty: false
    })

    const [email, setEmail] = useState({
        email: '',
        error: true,
        dirty: false
    })

    const [password, setPassword] = useState({
        password: '',
        error: true,
        dirty: false
    })

    const handleUserName = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        !validOnlyLetter(event.currentTarget.value)
            ? setUsername({...username, username: event.currentTarget.value, error: true})
            : setUsername({...username, username: event.currentTarget.value, error: false})
    }, [username])

    const handleEmail = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        !validEmail(event.currentTarget.value)
            ? setEmail({...email, email: event.currentTarget.value, error: true})
            : setEmail({...email, email: event.currentTarget.value, error: false})
    },[email])

    const handlePassword = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        !validPassword(event.currentTarget.value)
            ? setPassword({...password, password: event.currentTarget.value, error: true})
            : setPassword({...password, password: event.currentTarget.value, error: false})
    },[password])

    const blurHandler = (e: BaseSyntheticEvent) => {
        switch (e.target.name) {
            case 'username':
                setUsername({...username, dirty: true})
                break
            case 'email':
                setEmail({...email, dirty: true})
                break
            case 'password':
                setPassword({...password, dirty: true})
                break
        }
    }

    const registerHandler = async () => {
        try {
            if(validPassword(password.password) && validEmail(email.email) && validOnlyLetter(username.username)){
                dispatch(registerUser({
                    username: username.username,
                    email: email.email,
                    password: password.password,
                    role: 'USER'
                }))
                setUsername({
                    username: '',
                    error: true,
                    dirty: false
                })
                setPassword({
                    password: '',
                    error: true,
                    dirty: false
                })
                setEmail({
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
        <div className='w-[411px] m-auto border-2 border-solid border-primary rounded-[15px] p-[15px] mb-[20px]'>
            <form onSubmit={(e) => e.preventDefault()}>
                <Title className='mb-[15px]'>Регистрация</Title>
                <FormGroup
                    labelName={'username'}
                    labelText={'Username'}
                    inputName={'username'}
                    inputType={'text'}
                    placeholder={'Alexandr'}
                    value={username.username}
                    error={'Username должно содержать только буквы'}
                    displayError={username.error && username.dirty}
                    onChange={handleUserName}
                    onBlur={blurHandler}
                />
                <FormGroup
                    labelName={'email'}
                    labelText={'Email'}
                    inputName={'email'}
                    inputType={'email'}
                    placeholder={'sasha.svetogor@gmail.com'}
                    value={email.email}
                    onChange={handleEmail}
                    onBlur={blurHandler}
                    error={'неккоректный email'}
                    displayError={email.error && email.dirty}
                />
                <FormGroup
                    labelName={'password'}
                    labelText={'Password'}
                    inputName={'password'}
                    inputType={'text'}
                    placeholder={'Password'}
                    value={password.password}
                    onChange={handlePassword}
                    onBlur={blurHandler}
                    error={'Минимальная длина пароля 6 символов'}
                    displayError={password.error && password.dirty}
                />
                <div className='flex gap-x-[10px] justify-center'>
                    <Button
                        className={`bg-primary text-white`}
                        onClick={registerHandler}

                    >
                        Подтвердить
                    </Button>
                    <Button
                        className={`bg-secondary text-white`}
                        onClick={handleRegister}
                        disabled={isLoading}
                    >
                        Авторизация
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Register;
