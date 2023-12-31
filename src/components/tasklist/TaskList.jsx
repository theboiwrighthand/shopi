import { IndexTable, Text, Badge, Icon, Spinner, LegacyCard } from '@shopify/polaris';
import React, { memo } from 'react';
import './tasklist.css'
import moment from 'moment';
import {
    CodeMinor,
    EmbedMinor,
    MagicMinor,
    ConfettiMajor,
    ResourcesMajor,
    ThemeEditMajor
} from '@shopify/polaris-icons';

export default memo(function TaskList({ data }) {

    // const uniqueAges = data.map(obj => obj.type)
    //     .filter((value, index, self) => self.indexOf(value) === index);
    // console.log(uniqueAges); 

    const rowMarkup = data && data.map(
        (item, index) => (

            <IndexTable.Row id={item.id} key={item.id} position={index} loading={true} >
                <IndexTable.Cell >
                    <div style={{display:'flex',marginLeft:'10px'}}>
                    <Icon source={item.type == 'Developer' ? CodeMinor : item.type == 'Producer' ? MagicMinor : item.type == 'Manager' ? ConfettiMajor : item.type == 'Engineer' ? ResourcesMajor : item.type == 'Designer' ? ThemeEditMajor : EmbedMinor}
                        color="subdued" ></Icon>
                    <Badge >
                        <Text color='warning' variant="bodyMd" fontWeight="medium" as="span">
                            {item.type}
                        </Text>
                    </Badge>
                    </div>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="p" fontWeight="bold">
                        {`#${item.id}`}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell >
                    <p style={{ margin:'10px 0px'}}> <Text as="p" color="critical" fontWeight="bold"> {item.title} </Text></p>
                    
                    <p style={{ margin:'10px 0px', width: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</p>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Badge progress={`${item.status ? 'complete' : "incomplete"}`} status={`${item.status ? 'success' : "attention"}`}>
                        {`${item.status ? 'Completed' : "inCompleted"}`}
                    </Badge>
                </IndexTable.Cell>
                <IndexTable.Cell>{moment(item.first_deliverable).format('DD MMM YYYY')}</IndexTable.Cell>
                <IndexTable.Cell>{moment(item.close).format('DD MMM YYYY')}</IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    const content = data && data.length > 0
        ? (
            <LegacyCard >

            <IndexTable
                sectioned
                itemCount={data.length}
                headings={[
                    // { title: '' },
                    { title: 'TYPE' },
                    { title: 'Task ID' },
                    { title: 'Task Name' },
                    { title: 'Status' },
                    { title: 'First Deliverable' },
                    { title: 'Closed' },
                ]}
                selectable={false}
                
                
            >
                {rowMarkup}
            </IndexTable>
            </LegacyCard>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Spinner size="large" color="inkLightest" />
            </div>
        )

    return (
        <div style={{ padding: '10px 0px' }}>
            {content}
        </div>
    );
})