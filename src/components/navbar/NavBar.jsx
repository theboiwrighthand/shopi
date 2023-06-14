import React, { memo, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  HomeMinor, AppsMinor, GiftCardMajor,
  CirclePlusOutlineMinor,
  JobsMajor,
  MetafieldsMajor,
  PhoneMajor,
  QuestionMarkInverseMajor,
  TransferInMajor,
  DiscountsMinor,
  CustomerPlusMajor
} from '@shopify/polaris-icons';
import { Frame, Navigation, Text } from '@shopify/polaris';


export default memo(function NavBar() {
  const [tasks, setTasksList] = useState([])
  useEffect(() => {
    const getData = async () => {
      let response = await axios.get('https://6294640ba7203b3ed067f742.mockapi.io/api/shopify/tasks')
      setTasksList(response.data);
    }
    getData()
  }, [])
  const location = useLocation();
  const navigate = useNavigate();

  return <>
    <div className='navbar' style={{ width: '100%', height: 'calc(100% - 70px)' }}>
      <Frame>
        <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
          <Navigation location={location.pathname}>
            <Navigation.Section
              items={[
                {
                  url:'',
                  excludePaths: [],
                  label: 'Home',
                  icon: HomeMinor,
                  onClick: () => navigate('/'),
                },
                {
                  excludePaths: ["/"],
                  label: 'Tasks Catalog',
                  icon: AppsMinor,
                  badge: <span className="Polaris-Badge Polaris-Badge--statusInfo"><Text fontWeight="semibold" variant="bodySm" as="span">{tasks.length}</Text></span>,
                  onClick: () => navigate('/'),
                },
              ]}
            />
            <Navigation.Section
              title="MY PROJECTS"
              items={[
                {
                  excludePaths: ['#'],
                  label: 'Active',
                  icon: JobsMajor,
                  onClick: () => navigate('/active'),
                },
                {
                  excludePaths: ['#'],
                  label: 'Completed',
                  icon: MetafieldsMajor,
                  onClick: () => navigate('/complete'),
                },
                {
                  excludePaths: ['#'],
                  label: 'Closed',
                  icon: TransferInMajor,
                  onClick: () => navigate('/close'),
                },
              ]}
              action={{
                accessibilityLabel: 'Add sales channel',
                icon: CirclePlusOutlineMinor,
                onClick: () => { alert('hello') },
              }}
            />
            <Navigation.Section
              title="MY PLAN"
              items={[
                {
                  excludePaths: ['#'],
                  label: 'Subscribe',
                  icon: DiscountsMinor,
                  badge: <span className="Polaris-Badge Polaris-Badge--statusSuccess"> <Text fontWeight="semibold" variant="bodySm" as="span">Save 40%</Text></span>,
                  onClick: () => navigate('/sub'),
                },
              ]}
            />
            <Navigation.Section
              title="MORE"
              items={[
                {
                  excludePaths: ['#'],
                  label: 'Member Perks',
                  icon: GiftCardMajor,
                  onClick: () => navigate('/mem'),
                },
                {
                  excludePaths: ['#'],
                  label: 'Invite Friends',
                  icon: CustomerPlusMajor,
                  badge: <span className="Polaris-Badge Polaris-Badge--statusSuccess"> <Text fontWeight="semibold" variant="bodySm" as="span">Earn $10</Text></span>,
                  onClick: () => navigate('/invite'),
                },
                {
                  excludePaths: ['#'],
                  label: 'Contact us',
                  icon: PhoneMajor,
                  onClick: () => navigate('/contact'),
                },
                {
                  excludePaths: ['#'],
                  label: 'FAQ',
                  icon: QuestionMarkInverseMajor,
                  onClick: () => navigate('/faq'),
                },
              ]}
            />
          </Navigation>
          <div style={{ margin: '0 auto', width: 'calc(100% - 300px)', height: '100vh', padding: ' 0 100px' }}>
            <Outlet />
          </div>
        </div>
      </Frame>
    </div>
  </>
}
)