import React from 'react';
import { SkeletonPage, LegacyCard, SkeletonBodyText, } from '@shopify/polaris';

export default function Skeleton(props) {
    return <>
        <SkeletonPage title={props.title} > 
                    <LegacyCard sectioned >
                            <SkeletonBodyText lines={30} />
                    </LegacyCard>                 
        </SkeletonPage>
    </>
}
