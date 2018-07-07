import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as DriveCollectionState from '../store/Drives';

// At runtime, Redux will merge together...
type DriveProps =
    DriveCollectionState.DriveCollectionState        // ... state we've requested from the Redux store
    & typeof DriveCollectionState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Monitor extends React.Component<DriveProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.loadDrives();
    }

    componentWillReceiveProps(nextProps: DriveProps) {
        // This method runs when incoming props (e.g., route params) change
        //this.props.loadDrives();
    }

    public render() {
        return <div>
            <h1>Drive overview</h1>
            <p>This component demonstrates the disk information on the client computer.</p>
            {this.renderDriveCollection()}
        </div>;
    }

    private renderDriveCollection() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Free space</th>
                    <th>Format</th>
                    <th>Type</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {this.props.drives.map(drive =>
                    <tr key={drive.name}>
                        <td>{drive.availableFreeSpace}</td>
                        <td>{drive.driveFormat}</td>
                        <td>{drive.driveType}</td>
                        <td>{drive.name}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }

  
}

export default connect(
    (state: ApplicationState) => state.drives, // Selects which state properties are merged into the component's props
    DriveCollectionState.actionCreators                 // Selects which action creators are merged into the component's props
)(Monitor) as typeof Monitor;
