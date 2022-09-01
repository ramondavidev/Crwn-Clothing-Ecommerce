import { AnyAction } from "redux";

// GET the type from the ReturnType of the AC and then it will create a new match function for it
type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
}

// ACTION CREATOR that has no params but it will receive a type as string
export function withMatcher <AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// ACTION CREATOR that can receive any numbers of arguments and it'll receive a type as string
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

// when payload is passed, we expect a type T and a payload P and return an object ActionWithPayload
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

// when is not passed the payload, we expect just type T and an object Action
export function createAction<T extends string>(type: T, payload: void): Action<T>;

//function to return the object with type and payload
export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload };
}

// the code above is the same as below (without TS)
// export const createAction = (type, payload) => ({ type, payload });

//obs: with arrow function
// const createAction = <T extends String, P>(type: T, payload: P) => {
//     return { type, payload };
// }


