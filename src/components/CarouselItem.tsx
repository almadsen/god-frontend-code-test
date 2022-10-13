import React from 'react';
import Image from 'next/image';
import {
  Block,
  Link,
  Spacer,
  Text,
  View,
  Flex,
  useTheme
} from 'vcc-ui';
import { Car } from '../types/Car';

type CarInfoPropsType = {
  car: Car;
};

const CarouselItem: React.FC<CarInfoPropsType> = (props) => {
  const theme = useTheme();
  const {
    car: { id, modelName, bodyType, modelType, imageUrl }
  } = props;

  return (
    <Block
      extend={{
        scrollSnapAlign: 'start',
        width: '100%',
        paddingLeft: '10px',
        paddingRight: '10px'
      }}
      style={{
        flex: '0 0 auto'
      }}
    >
      <Text
        variant='kelly'
        subStyle='emphasis'
        extend={{
          color: theme.color.foreground.secondary,
          textTransform: 'uppercase'
        }}
      >
        {bodyType}
      </Text>
      <Flex
        extend={{
          untilM: {
            flexDirection: 'column'
          },
          fromM: {
            flexDirection: 'row'
          },
          flexWrap: 'wrap',
          marginBottom: '12px'
        }}
      >
        <Text
          variant="columbus"
          subStyle="emphasis"
          extend={{
            '@media (min-width: 480px)': {
              marginRight: '5px',
            }
          }}
        >
          {modelName}
        </Text>
        <Text
          variant="columbus"
          extend={{
            color: theme.color.foreground.secondary,
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          {modelType}
        </Text>
      </Flex>
      <Spacer />
      <Image
        src={imageUrl}
        alt={modelName}
        width='400px'
        height='300px'
        layout='responsive'
        objectFit='contain'
      />
      <View
        extend={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '14px'
      }}
      >
        <Link href={`learn/${id}`} arrow='right'>
          Learn
        </Link>
        <Spacer size={4} />
        <Link href={`shop/${id}`} arrow='right'>
          Shop
        </Link>
      </View>
    </Block>
  )
};

export default CarouselItem;
