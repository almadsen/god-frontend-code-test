import React from 'react';
import { useRouter } from 'next/router';
import { Text, Link, View } from 'vcc-ui';

export default function LearnPage() {
    const router = useRouter();
    const { id } = router.query;
    
    return (
        <View
            extend={{
                alignItems: 'center',
            }}
        >
            <Text variant='hillary' extend={{textTransform: 'uppercase'}}>
                {id}
            </Text>
            <Link onClick={() => router.back()} arrow='left'>
                All Cars
            </Link>
        </View>
    );
};
