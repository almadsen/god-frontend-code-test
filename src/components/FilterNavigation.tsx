import React, { useState, useEffect, useCallback, createRef } from 'react';
import { TabNav, TabNavItem } from 'vcc-ui';

type FilterNavigationPropsType = {
  filterCars: Function;
  getLength: Function;
};

const FilterNavigation: React.FC<FilterNavigationPropsType> = (props) => {
  const { filterCars, getLength } = props;

  return (
    <TabNav enableLineTransition>
      <TabNavItem
        className='nav-item'
        isActive
        onClick={() => {
          filterCars('');
        }}
      >All ({getLength('')})
      </TabNavItem>
      <TabNavItem
        className='nav-item'
        onClick={() => {
          filterCars('suv');
        }}
      >SUV ({getLength('suv')})
      </TabNavItem>
      <TabNavItem
        className='nav-item'
        onClick={() => {
          filterCars('estate');
        }}
      >Estate ({getLength('estate')})
      </TabNavItem>
      <TabNavItem
        className='nav-item'
        onClick={() => {
          filterCars('sedan');
        }}
      >Sedan ({getLength('sedan')})
      </TabNavItem>
    </TabNav>
  );
};

export default FilterNavigation;
