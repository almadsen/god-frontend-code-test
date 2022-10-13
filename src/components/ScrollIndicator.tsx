import { Flex } from 'vcc-ui';
import { Dot } from './Dot';

type ScrollIndicatorPropsType = {
  scrollProgress: number;
  count: number;
};

const ScrollIndicator: React.FC<ScrollIndicatorPropsType> = (props) => {
  const { scrollProgress, count } = props;
  const selectedDotValue = (scrollProgress * count) / 100;

  return (
    <Flex
      extend={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '16px',
        fromM: {
          display: 'none',
        },
      }}
    >
      {[...Array(count).keys()].map((index) => {
        const isActive = selectedDotValue >= index && selectedDotValue <= index + 1;
        return <Dot key={index} active={isActive} />
      })}
    </Flex>
  );
};

export default ScrollIndicator;
