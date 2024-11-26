import React, { useState } from "react";
import { Input } from "../../Atom";
import './login.scss';
import { Button } from "../../Atom";
import { Spin, notification } from "antd";
import loginImageone from '../.../../../Assets/images/login/login-img-1.jpg';
import loginImagetwo from '../.../../../Assets/images/login/login-img-2.png';
import { REGEX_CONSTANT } from "../../utils/common/constant";
import { useLoginMutation } from "../../redux/services";
import { Link, useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const [login, { isLoading, isError }] = useLoginMutation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });
    const [error, setError] = useState({
        userName: "",
        password: ""
    });

    const validateEmail = (value: string) => {
        const trimmedVal = value.trim();
        if (trimmedVal === "") {
            setError(prev => ({ ...prev, userName: "Enter User Name or Mail Id" }));
            return false;
        } else {
            setError(prev => ({ ...prev, userName: "" }));
            return true;
        }
    };

    const validatePassword = (value: string) => {
        if (value.trim() === "") {
            setError(prev => ({ ...prev, password: "Enter your password" }));
            return false;
        } else {
            setError(prev => ({ ...prev, password: "" }));
            return true;
        }
    };

    const changeHandler = (value: string, name: string) => {
        setFormData({ ...formData, [name]: value });
        if (name === "userName") validateEmail(value);
        if (name === "password") validatePassword(value);
    };

    const handleSubmit = async () => {
        const isUserNameValid = validateEmail(formData.userName);
        const isPasswordValid = validatePassword(formData.password);
        if (!isUserNameValid || !isPasswordValid) {
            return;
        }

        try {
            let res = await login({ email: formData.userName, password: formData.password });
            if (res.data) {
                notification.success({ message: 'Login successful!', description: 'You will be redirected shortly.' });
                console.log('login successful');
                navigate('/dashboard');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            notification.error({ message: 'Login failed', description: 'Please check your credentials and try again.' });
        }
    };

    return (
        <Spin spinning={isLoading}>
            <div className="container">
                <div className="conatiner-wrappe max-w-[1000px] flex gap-20 ">
                    <div className="left-section">
                        <div className="left-section-wrapper">
                            <div className="image-area flex max-w-[500px] gap-2">
                                <div className="img-1">
                                    <img src={loginImageone} alt="" className="w-[100%]" />
                                </div>
                                <div className="img-2 relative top-[80px]">
                                    <img src={loginImagetwo} alt="" className="w-[100%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-section w-[450px]">
                        <div className="right-section-wrapper max-w-[100%]">
                            <div className="title-area mb-[15px]">
                                <h1 className="text-center">Enter your credentials to Sign in. </h1>
                            </div>
                            <div className="login-form-container ">
                                <div className="login-form-container-wrapper ">
                                    <div className="internal-register-form-row-1 ">
                                        <div className="global-input-wrapper">
                                            <Input
                                                type="text"
                                                placeholder=""
                                                onChange={changeHandler}
                                                name="userName"
                                                label="User Name/Email"
                                                externalClassName="internal-input-userName"
                                                helperText={error['userName'] || ""}
                                                required={true}
                                                variant="outlined"
                                                error={!!error['userName']}
                                                value={formData['userName'] || ""}
                                            />
                                        </div>
                                        <div className="global-input-wrapper">
                                            <Input
                                                type="password"
                                                placeholder=""
                                                onChange={changeHandler}
                                                name="password"
                                                label="Password"
                                                externalClassName="internal-input-password"
                                                helperText={error['password'] || ""}
                                                required={true}
                                                variant="outlined"
                                                error={!!error['password']}
                                                value={formData['password'] || ""}
                                            />
                                        </div>
                                        <div className="forgot-password-wrapper">
                                            <Link to="/forgot-password">Forgot Password</Link>
                                        </div>
                                        <div className="global-button-wrapper">
                                            <Button
                                                buttonText="Login"
                                                externalClassName="custom-button"
                                                onClick={handleSubmit}
                                                type="submit"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="login-btns mt-[40px]">
                                <div className="no-acc-section text-center mt-[20px]">
                                    <p>Don't have an account? <a href="/signUp" className="link-text">Register</a></p>
                                </div>
                                <div className="separator-sso flex items-center justify-between w-full mt-4">
                                    <hr className="flex-grow border-t-2 border-gray-200" />
                                    <span className="mx-2 text-gray-500">Or</span>
                                    <hr className="flex-grow border-t-2 border-gray-200" />
                                </div>
                                <div className="sso-container mt-[20px]">
                                    <div className="sso-container-wrapper flex justify-center gap-14">
                                        {/* Add SSO icons here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
};
