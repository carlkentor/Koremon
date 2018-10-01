import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as DriveCollectionState from '../store/Drives';
import { Doughnut } from 'react-chartjs-2';

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
            <h1 className="text-center">Drive overview</h1>
            <p className="text-center">This component demonstrates the disk information on the client computer.</p>
            {this.renderDriveCollection()}
        </div>;
    }

    private renderDriveCollection() {

        return <div className="row">
            <div className="col-md-12">
                {this.props.drives.map((drive, index) => {
                    var pieChart = this.calcDrivePie(drive);
                    return pieChart;
                })
                }
            </div>
        </div>;
    }
    public calcDrivePie(DriveInfo: DriveCollectionState.DriveInfo) {
        var data = {
            labels: [
                'Available Space ' + DriveInfo.formattedAvailableFreeSpace,
                'Used Space ' + DriveInfo.formattedUsedSpace
            ],
            datasets: [{
                data: [DriveInfo.availableFreeSpace, DriveInfo.totalSize - DriveInfo.availableFreeSpace, 0],
                backgroundColor: [
                    'rgb(135,206,250)',
                    'rgb(220,20,60)'
                ],
                hoverBackgroundColor: [
                    '#87CEFA',
                    'rgb(220,20,60)'
                ]
            }]
        };
            return <div className="col-md-6"> <h3 className="text-center">{DriveInfo.name}</h3> <Doughnut data={data} /></div>;
    }
}

export default connect(
    (state: ApplicationState) => state.drives, // Selects which state properties are merged into the component's props
    DriveCollectionState.actionCreators                 // Selects which action creators are merged into the component's props
)(Monitor) as typeof Monitor;
