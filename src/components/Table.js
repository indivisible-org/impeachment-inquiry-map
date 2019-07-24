import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { find } from 'lodash';

import TableCell from './TableCell';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.getColor = this.getColor.bind(this);
    this.getIconName = this.getIconName.bind(this);
  }

  getColor(issueFocus) {
    const { colorMap } = this.props;
    const colorObj = find(colorMap, { filterBy: issueFocus });
    if (colorObj) {
      return colorObj.color;
    }
    return '';
  }

  getIconName(issueFocus) {
    const { colorMap } = this.props;
    const colorObj = find(colorMap, { filterBy: issueFocus });
    if (colorObj) {
      return colorObj.icon;
    }
    return '';
  }

  render() {
    const {
      items,
      urlParams,
      shouldRender,
      type,
      error,
      selectItem,
    } = this.props;

    if (error) {
      return (
        <div id="error-message">
          <p className="no-results">Sorry, something went wrong. {error}</p>
        </div>
      );
    }

    if (!shouldRender) {
      return (
        <div id="groups-list">
          <p>Search for groups near you</p>
        </div>
      );
    }
    if (items.length === 0 && type === 'events') {
      return (
        <div id="events-list">
          <p className="no-results">Looks like there are no events near you right now. You can create your own <a href="https://act.indivisible.org/event/local-actions/create/?source=eventmap">here</a>.
          </p>
        </div>
      );
    }

    return (
      <List
        id={`${type}-list`}
        itemLayout="vertical"
        dataSource={items}
        renderItem={item =>
          (
            <List.Item key={item.id}>
              <TableCell
                key={`${item.id}-cell`}
                item={item}
                urlParams={urlParams}
                type={type}
                color={this.getColor(item.issueFocus)}
                iconName={this.getIconName(item.issueFocus)}
                selectItem={selectItem}
              />
            </List.Item>
          )}
      />
    );
  }
}

Table.propTypes = {
  colorMap: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectItem: PropTypes.func,
  shouldRender: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  urlParams: PropTypes.string,
};

Table.defaultProps = {
  colorMap: [],
  error: '',
  selectItem: () => {},
  urlParams: '',
};

export default Table;
