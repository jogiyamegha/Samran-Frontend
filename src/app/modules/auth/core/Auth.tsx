import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react';
import { AuthModel, UserModel } from './_models';
import * as authHelper from './AuthHelpers'
import { WithChildren } from '../../../../_admin/helpers';
import { LayoutSplashScreen } from '../../../../_admin/layout/core';

type AuthContextProps = {
    auth: AuthModel | undefined;
    saveAuth : (auth: AuthModel | undefined) => void;
    currentUser : UserModel | undefined;
    saveCurrentUser : (auth: UserModel | undefined) => void;
    logout: () => void;
}

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    saveAuth : () => {},
    currentUser : undefined,
    saveCurrentUser : () => {},
    logout: () => {},
}

const AuthContext = createContext<AuthContextProps> (initAuthContextPropsState);

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
    const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
    const [currentUser, setCurrentUser] = useState<UserModel | undefined>(
        authHelper.getUser()
    );
    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth);
        if(auth) {
            authHelper.setAuth(auth);
        } else {
            authHelper.removeAuth();
        }
    };
    const saveCurrentUser = (auth: UserModel | undefined) => {
        setCurrentUser(auth);
        if(auth) {
            authHelper.setUser(auth);
        } else {
            authHelper.removeUser();
        }
    }
    const logout = () => {
        saveAuth(undefined);
        saveCurrentUser(undefined);
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                saveAuth,
                currentUser,
                saveCurrentUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
    const { auth, logout, saveCurrentUser, saveAuth } = useAuth();
    const didRequest = useRef(false);
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    useEffect(() => {
        let token = authHelper.getAuth();
        const requestUser = async (apiToken: AuthModel) => {
            try {
                if(!didRequest.current) {
                    saveAuth(token);
                    let user = authHelper.getUser();
                    saveCurrentUser(user);
                }
            } catch (error) {
                console.error(error);
                if(!didRequest.current) {
                    logout();
                }
            } finally {
                setShowSplashScreen(false);
            }
            return () => (didRequest.current = true);
        };
        if(token) {
            requestUser(token);
        } else {
            logout();
            setShowSplashScreen(false);
        }
    }, [])
    return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
};

export { AuthProvider, AuthInit, useAuth };