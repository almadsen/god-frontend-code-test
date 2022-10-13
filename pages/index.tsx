import React, { useState, useEffect, useCallback, createRef } from 'react';
import CarouselItem from '../src/components/CarouselItem';
import ScrollIndicator from '../src/components/ScrollIndicator';
import FilterNavigation from '../src/components/FilterNavigation';
import { IconButton, Block, Spacer, Flex } from 'vcc-ui';
import { Car } from '../src/types/Car';

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [cars, setAllCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const target = createRef<HTMLDivElement>();

  const fetchCars = async (): Promise<void> => {
    const response = await fetch('./api/cars.json');
    const promisedCars = response.json() as Promise<Car[]>;
    const result = await promisedCars;

    setAllCars(result);
    setFilteredCars(result);
  };

  useEffect(() => {
    void fetchCars();
  }, []);

  const filterCars = (bodyType: string): void => {
    const result = bodyType === '' ? cars : cars.filter(car => car.bodyType === bodyType);
    
    setFilteredCars(result);
    setActiveIndex(0);
  };

  const handleClickNext = (): void => {
    setActiveIndex(activeIndex + 1);
  };

  const handleClickPrev = (): void => {
    setActiveIndex(activeIndex - 1);
  };

  const getLength = (bodyType: string): number => {
    return bodyType === '' ? cars.length : cars.filter(car => car.bodyType === bodyType).length;
  };

  const scrollListener = useCallback(() => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const scrollFromLeft = element.scrollLeft;
    const totalWidth = element.scrollWidth - element.clientWidth;
    if (scrollFromLeft === 0) {
      return setScrollProgress(0);
    }

    if (scrollFromLeft > totalWidth) {
      return setScrollProgress(100);
    }

    setScrollProgress((scrollFromLeft / totalWidth) * 100);
  }, [target]);

  useEffect(() => {
    const targetCurrent = target.current;
    targetCurrent?.addEventListener('scroll', scrollListener);

    return () => {
      targetCurrent && targetCurrent.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener, target]);
  
  return (
    <>
      <Block
        extend={{
          marginBottom: '10px'
        }}
      >
        <FilterNavigation 
          filterCars={filterCars}
          getLength={getLength}
        />
      </Block>
      <Block
        extend={{
          overflowX: 'hidden',
          overflowY: 'hidden'
        }}
      >
        <Block
          extend={{
            paddingLeft: '20px',
            paddingRight: '20px'
          }}
        >
          <Flex>
            <Block
              extend={{
                width: '100%'
              }}
            >
              <Block
                ref={target}
                extend={{
                  fromM: {
                    overflowX: 'hidden',
                  },
                  untilM: {
                    scrollSnapType: 'x mandatory',
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    '::-webkit-scrollbar': {
                      display: 'none',
                    },
                  },
                  overflowY: 'hidden',
                  position: 'relative'
                }}
              >
                <Block
                  extend={{
                    width: '100%'
                  }}
                >
                  <Flex
                    extend={{
                      marginLeft: '-10px',
                      marginRight: '-10px'
                    }}
                  >
                    <Flex
                      extend={{
                        fromM: {
                          width: '25%'
                        },
                        untilM: {
                          width: '75%'
                        }
                      }}
                    >
                      <Block
                        extend={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'nowrap',
                          transition: 'transform 0.3s',
                          transform: `translateX(-${activeIndex * 100}%)`
                        }}
                      >
                        {filteredCars.map((car, index) => (
                          <CarouselItem car={car} key={index} />
                        ))}
                      </Block>
                    </Flex>
                  </Flex>
                </Block>
              </Block>
              <Flex
                extend={{
                  untilM: {
                    display: 'none'
                  },
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  marginTop: '10px',
                  flexDirection: 'row',
                }}
              >
                <IconButton
                  disabled={activeIndex === 0}
                  onClick={handleClickPrev}
                  aria-label="prev"
                  iconName="navigation-chevronback"
                  variant="outline"
                />
                <Spacer />
                <IconButton
                  disabled={activeIndex + 4 >= filteredCars.length}
                  onClick={handleClickNext}
                  aria-label="next"
                  iconName="navigation-chevronforward"
                  variant="outline"
                />
              </Flex>
              <Flex
                extend={{
                  fromM: {
                    display: 'none'
                  },
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  marginTop: '10px',
                  flexDirection: 'row',
                }}
              >
                <ScrollIndicator
                  scrollProgress={scrollProgress}
                  count={filteredCars.length}
                />
              </Flex>
            </Block>
          </Flex>
        </Block>
      </Block>
    </>
  );
};

export default Carousel;
