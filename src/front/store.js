

export const initialStore = () => {
    return {
        user: null,
        token: null,
        actions: {} 
    };
};

const storeReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null
            };
        default:
            return state;
    }
};


export const createActions = (dispatch) => {
    return {
        login: async (email, password) => {
            try {
                const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                if (!resp.ok) return false;

                const data = await resp.json();

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        user: data.user,
                        token: data.token
                    }
                });

                
                localStorage.setItem("token", data.token);

                return true;
            } catch (error) {
                console.error("Error en login:", error);
                return false;
            }
        },
        logout: () => {
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("token");
        }
    };
};

export default storeReducer;