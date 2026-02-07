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
    userType: number | null;
    isUserType: (type: number) => boolean;
    isAdmin: () => boolean;
    isInvestor: () => boolean;
    isConsumer: () => boolean;
}

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    saveAuth : () => {},
    currentUser : undefined,
    saveCurrentUser : () => {},
    logout: () => {},
    userType: null,
    isUserType: (type: number) => false,
    isAdmin: () => false,
    isInvestor: () => false,
    isConsumer: () => false,
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
    
    // Calculate user type based on current user
    const userType = currentUser?.userType || null;
    
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
    
    const isUserType = (type: number) => {
        return currentUser?.userType === type;
    };
    
    const isAdmin = () => {
        return isUserType(1);
    };
    
    const isInvestor = () => {
        return isUserType(2);
    };
    
    const isConsumer = () => {
        return isUserType(3);
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                saveAuth,
                currentUser,
                saveCurrentUser,
                logout,
                userType,
                isUserType,
                isAdmin,
                isInvestor,
                isConsumer
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