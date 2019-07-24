import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getColorMap } from '../state/events/selectors';

import {
  getVisbleGroups,
  getGroups,
  getSelectedGroup,
} from '../state/groups/selectors';
import { startSetGroups, selectGroup } from '../state/groups/actions';

import {
  getError,
  getLocation,
  getDistance,
  getFilterBy,
  getFilterValue,
} from '../state/selections/selectors';
import * as selectionActions from '../state/selections/actions';

import GroupMapView from '../components/GroupMap';
import WebGlError from '../components/WebGlError';

import SideBar from './SideBar';
import SearchBar from './SearchBar';

class GroupsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.renderMap = this.renderMap.bind(this);

    this.state = {
      init: true,
    };
  }

  componentDidMount() {
    const {
      getInitalGroups,
    } = this.props;
    getInitalGroups()
      .then(() => {
        this.setState({ init: false });
      });
  }

  renderMap() {
    const {
      colorMap,
      distance,
      groups,
      center,
      filterBy,
      filterValue,
      resetSelections,
      searchByQueryString,
      selectedGroup,
      setLatLng,
    } = this.props;
    if (!mapboxgl.supported()) {
      return (<WebGlError mapType="group" />);
    }
    return (<GroupMapView
      center={center}
      type="groups"
      items={groups}
      colorMap={colorMap}
      filterByValue={{ [filterBy]: [filterValue] }}
      resetSelections={resetSelections}
      setLatLng={setLatLng}
      distance={distance}
      selectedItem={selectedGroup}
      searchByQueryString={searchByQueryString}
    />);
  }

  render() {
    const {
      allGroups,
      groups,
      center,
      error,
      filterBy,
      resetSelections,
      selectItem,
    } = this.props;
    if (this.state.init) {
      return null;
    }

    const containerClass = classNames({
      'full-width': ((!center.LAT) && (filterBy === 'all') && (!error)),
      'groups-container': true,
      'main-container': true,
    });
    return (
      <div className={containerClass}>
        <SearchBar items={groups} mapType="group" />
        <SideBar
          type="groups"
          items={groups}
          allItems={allGroups}
          resetHandler={resetSelections}
          selectItem={selectItem}
          filterBy={filterBy}
          location={center}
          error={error}
        />
        {this.renderMap()}
        <div className="footer" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allGroups: getGroups(state),
  center: getLocation(state),
  colorMap: getColorMap(state),
  distance: getDistance(state),
  error: getError(state),
  filterBy: getFilterBy(state),
  filterValue: getFilterValue(state),
  groups: getVisbleGroups(state),
  selectedGroup: getSelectedGroup(state),
});

const mapDispatchToProps = dispatch => ({
  getInitalGroups: () => dispatch(startSetGroups()),
  resetSelections: () => dispatch(selectionActions.resetSelections()),
  searchByQueryString: val => dispatch(selectionActions.searchByQueryString(val)),
  selectItem: val => dispatch(selectGroup(val)),
  setLatLng: val => dispatch(selectionActions.setLatLng(val)),
  setRefCode: code => dispatch(selectionActions.setRefCode(code)),
});

GroupsDashboard.propTypes = {
  allGroups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  center: PropTypes.shape({}).isRequired,
  colorMap: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  distance: PropTypes.number.isRequired,
  error: PropTypes.string,
  filterBy: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
  getInitalGroups: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  resetSelections: PropTypes.func.isRequired,
  searchByQueryString: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
  selectedGroup: PropTypes.shape({}),
  setLatLng: PropTypes.func.isRequired,
};

GroupsDashboard.defaultProps = {
  error: '',
  selectedGroup: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsDashboard);
