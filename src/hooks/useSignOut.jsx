import  useAuth  from "./useAuth";

const useSignOut = () => {
    const { setAuth } = useAuth();

    const signOut = () => {
        setAuth({role:"patient", loggedIn: false}); // Perform sign out logic here, if needed
        // Optionally, you can also clear tokens or call an API to sign out.
    };

    return signOut;
};

export default useSignOut;
