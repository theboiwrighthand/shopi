import {
    ActionList,
    AppProvider,
    Frame,
    Navigation,
    TopBar,
    Text
} from '@shopify/polaris';
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
import { useState, useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';


function AppLayout() {

    const [tasks, setTasksList] = useState([])
    useEffect(() => {
        const getData = async () => {
            let response = await axios.get('https://6294640ba7203b3ed067f742.mockapi.io/api/shopify/tasks')
            setTasksList(response.data);
        }
        getData()
    }, [])

    const navigate = useNavigate();
    const [searchActive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [userMenuActive, setUserMenuActive] = useState(false);
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);


    const handleSearchResultsDismiss = useCallback(() => {
        setSearchActive(false);
        setSearchValue('');
    }, []);
    const handleSearchFieldChange = useCallback((value) => {
        setSearchValue(value);
        setSearchActive(value.length > 0);
    }, []);

    const toggleUserMenuActive = useCallback(
        () => setUserMenuActive((userMenuActive) => !userMenuActive),
        [],
    );
    const toggleMobileNavigationActive = useCallback(
        () =>
            setMobileNavigationActive(
                (mobileNavigationActive) => !mobileNavigationActive,
            ),
        [],
    );

    const userMenuActions = [
        {
            items: [{ content: 'Community forums' }],
        },
    ];

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={userMenuActions}
            name="Hiep"
            detail="shopee"
            initials="H"
            open={userMenuActive}
            onToggle={toggleUserMenuActive}
        />
    );

    const searchResultsMarkup = (
        <ActionList
            items={[{ content: 'Shopify help center' }, { content: 'Community forums' }]}
        />
    );

    const searchFieldMarkup = (
        <TopBar.SearchField
            onChange={handleSearchFieldChange}
            value={searchValue}
            placeholder="Search"
        />
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            searchResultsVisible={searchActive}
            searchField={searchFieldMarkup}
            searchResults={searchResultsMarkup}
            onSearchResultsDismiss={handleSearchResultsDismiss}
            onNavigationToggle={toggleMobileNavigationActive}
        />
    );

    const navigationMarkup = (
        <Navigation location={'/'}>
            <Navigation.Section
                items={[
                    {
                        url: '',
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
    );

    const logo = {
        width: 124,
        topBarSource:
            'https://upload.wikimedia.org/wikipedia/commons/e/e7/Shopify_logo.svg',
        url: '/',
        accessibilityLabel: 'Jaded Pixel',
    };

    return (
        <div style={{ height: '500px' }}>
            <AppProvider
                i18n={{
                    Polaris: {
                        Avatar: {
                            label: 'Avatar',
                            labelWithInitials: 'Avatar with initials {initials}',
                        },
                        ContextualSaveBar: {
                            save: 'Save',
                            discard: 'Discard',
                        },
                        TextField: {
                            characterCount: '{count} characters',
                        },
                        TopBar: {
                            toggleMenuLabel: 'Toggle menu',

                            SearchField: {
                                clearButtonLabel: 'Clear',
                                search: 'Search',
                            },
                        },
                        Modal: {
                            iFrameTitle: 'body markup',
                        },
                        Frame: {
                            skipToContent: 'Skip to content',
                            navigationLabel: 'Navigation',
                            Navigation: {
                                closeMobileNavigationLabel: 'Close navigation',
                            },
                        },
                    },
                }}
            >
                <Frame
                    logo={logo}
                    topBar={topBarMarkup}
                    navigation={navigationMarkup}
                    showMobileNavigation={mobileNavigationActive}
                    onNavigationDismiss={toggleMobileNavigationActive}
                >                 
                    <Outlet />
                </Frame>
            </AppProvider>
        </div>
    );
}

export default AppLayout;