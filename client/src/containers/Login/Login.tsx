import React, { BaseSyntheticEvent, useCallback, useEffect, useState } from 'react';
import { validEmail, validPassword } from '../../api/validation/validation';
import FormGroup from "../../components/common-components/FormGroup/FormGroup";
import Title from "../../components/common-components/Title/Title";
import Button from "../../components/common-components/Button/Button";
import { checkIsAuth, loginUser } from "../../redux/reducers/user/userSlice";
import { useAppDispatch, useAppSelectors } from "../../hooks/redux";
import { useNavigate} from "react-router-dom";
import { toast} from "react-toastify";
import { useSelector} from "react-redux";

interface ILogin {
    handleLogin: () => void
}

const Login = ({ handleLogin }: ILogin) => {

    const { status, token, currentUser } = useAppSelectors(state => state.userReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuth = Boolean(token)

    useEffect(() => {
        if(status) toast(status)
        if(isAuth && currentUser.role === 'USER') navigate('/home')
        if(isAuth && currentUser.role === 'ADMIN') navigate('/admin')
        if(isAuth && currentUser.role === 'MANAGER') navigate('/manage')
    }, [status, navigate, isAuth])

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
            case 'email':
                setEmail({...email, dirty: true})
                break
            case 'password':
                setPassword({...password, dirty: true})
                break
        }
    }

    const loginHandler = async () => {
        try {
            if(validPassword(password.password) && validEmail(email.email)){
                dispatch(loginUser({
                    email: email.email,
                    password: password.password
                }))
            }
        } catch (e) {
            console.log('err', e)
        }
    }

    return (
            <div className='w-[411px] m-auto border-2 border-solid border-primary rounded-[15px] p-[15px] mb-[20px]'>
            <form onSubmit={(e) => e.preventDefault()}>
                <Title className='mb-[15px]'>Авторизация</Title>
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
            </form>
                <div className='flex gap-x-[10px] justify-center'>
                    <Button
                        className={'bg-primary text-white'}
                        onClick={loginHandler}
                    >
                        Войти
                    </Button>
                    <Button
                        className={'bg-secondary text-white'}
                        onClick={handleLogin}
                    >
                        Регистрация
                    </Button>
                </div>
        </div>
    );
};

export default Login;