import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface DriveCollectionState {
    isCritical: boolean;
    drives: DriveInfo[];
}

export interface DriveInfo {
    availableFreeSpace: number;
    formattedAvailableFreeSpace: string;
    formattedUsedSpace: string;

    driveFormat: string;

    driveType: string;
    formattedDriveType: string;

    name: string;

    totalFreeSpace: number;
    formattedTotalFreeSpace: string;

    totalSize: number;
    formattedTotalSize: string;

    volumeLabel: string;
    rootDirectory: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestDrivesAction {
    type: 'REQUEST_DRIVES';
    isCritical: boolean;
}

interface ReceiveDrivesAction {
    type: 'RECEIVE_DRIVES';
    isCritical: boolean;
    drives: DriveInfo[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestDrivesAction | ReceiveDrivesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    loadDrives: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        let fetchTask = fetch(`api/Monitor/LoadDrives`).then(response => response.json() as Promise<DriveInfo[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_DRIVES', isCritical: true, drives: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_DRIVES', isCritical: true });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DriveCollectionState = { drives: [], isCritical: false };

export const reducer: Reducer<DriveCollectionState> = (state: DriveCollectionState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_DRIVES':
            return {
                isCritical: action.isCritical,
                drives: state.drives,
            };
        case 'RECEIVE_DRIVES':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                isCritical: action.isCritical,
                drives: action.drives,
                isLoading: false
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
