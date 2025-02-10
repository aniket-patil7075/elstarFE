import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['superAdmin'],
        subMenu: [],
    },
    /** Example purpose only, please remove */
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: ['superAdmin'],
    //     subMenu: [],
    // },
    {
        key: 'collapseMenu',
        path: '',
        title: 'Collapse Menu',
        translateKey: 'nav.collapseMenu.collapseMenu',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['superAdmin'],
        subMenu: [
            {
                key: 'collapseMenu.item1',
                path: '/super-admin/create-dealer',
                title: 'Collapse menu item 1',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['superAdmin'],
                subMenu: [],
            },
            {
                key: 'collapseMenu.item2',
                path: '/view-all-dealers',
                title: 'Collapse menu item 2',
                translateKey: 'nav.collapseMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['superAdmin'],
                subMenu: [],
            },
        ],
    },
    // {
    //     key: 'groupMenu',
    //     path: '',
    //     title: 'Group Menu',
    //     translateKey: 'nav.groupMenu.groupMenu',
    //     icon: '',
    //     type: NAV_ITEM_TYPE_TITLE,
    //     authority: ['superAdmin'],
    //     subMenu: [
    //         {
    //             key: 'groupMenu.single',
    //             path: '/group-single-menu-item-view',
    //             title: 'Group single menu item',
    //             translateKey: 'nav.groupMenu.single',
    //             icon: 'groupSingleMenu',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: ['superAdmin'],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'groupMenu.collapse',
    //             path: '',
    //             title: 'Group collapse menu',
    //             translateKey: 'nav.groupMenu.collapse.collapse',
    //             icon: 'groupCollapseMenu',
    //             type: NAV_ITEM_TYPE_COLLAPSE,
    //             authority: ['superAdmin'],
    //             subMenu: [
    //                 {
    //                     key: 'groupMenu.collapse.item1',
    //                     path: '/group-create-dealer',
    //                     title: 'Menu item 1',
    //                     translateKey: 'nav.groupMenu.collapse.item1',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: ['superAdmin'],
    //                     subMenu: [],
    //                 },
    //                 {
    //                     key: 'groupMenu.collapse.item2',
    //                     path: '/group-view-all-dealers',
    //                     title: 'Menu item 2',
    //                     translateKey: 'nav.groupMenu.collapse.item2',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: ['superAdmin'],
    //                     subMenu: [],
    //                 },
    //             ],
    //         },
    //     ],
    // },

    // Dealer Pages
    {
        key: 'dealerDashboard',
        path: '/dealer/dashboard',
        title: 'Dashboard',
        translateKey: 'nav.dealerDashboard',
        icon: 'dealerDashboard',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['dealer'],
        subMenu: [],
    },
    {
        key: 'dealerWorkflow',
        path: '/dealer/workflow',
        title: 'Work Flow',
        translateKey: 'nav.dealerWorkflow',
        icon: 'dealerWorkflow',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['dealer'],
        subMenu: [],
    }, {
        key: 'dealerCalendar',
        path: '/dealer/calendar',
        title: 'Calendar',
        translateKey: 'nav.dealerCalendar',
        icon: 'dealerCalendar',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['dealer'],
        subMenu: [],
    },
    {
        key: 'Time Clocks',
        path: '/dealer/time-clocks',
        title: 'Time Clocks',
        translateKey: 'nav.dealerTimeClocks',
        icon: 'dealerTimeClocks',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['dealer'],
        subMenu: [],
    }, 
    {
        key: 'Inventory',
        path: '',
        title: 'Inventory',
        translateKey: 'nav.dealerInventory.dealerInventory',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['dealer'],
        subMenu: [
            {
                key: 'Parts',
                path: '/dealer/inventory/parts',
                title: 'Parts',
                translateKey: 'nav.dealerInventory.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'Tires',
                path: '/dealer/inventory/tires',
                title: 'Tires',
                translateKey: 'nav.dealerInventory.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            }, {
                key: 'Labor',
                path: '/dealer/lists/labor',
                title: 'Labor',
                translateKey: 'nav.dealerInventory.labor',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            }, {
                key: 'Fees',
                path: '/dealer/lists/fees',
                title: 'Fees',
                translateKey: 'nav.dealerLists.fees',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'Vendors',
                path: '/dealer/lists/vendors',
                title: 'Vendors',
                translateKey: 'nav.dealerInventory.item5',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            }, {
                key: 'Categories',
                path: '/dealer/lists/categories',
                title: 'Categories',
                translateKey: 'nav.dealerInventory.item6',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
        ]
    },
    {
        key: 'dealerPurchasing',
        path: '',
        title: 'Purchasing',
        translateKey: 'nav.dealerPurchasing.dealerPurchasing',
        icon: 'dealerPurchasing',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['dealer'],
        subMenu: [
            {
                key: 'dealerPurchasing.item1',
                path: '/dealer/purchasing/purchase-orders',
                title: 'Purchase Orders',
                translateKey: 'nav.dealerPurchasing.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'dealerPurchasing.item2',
                path: '/dealer/purchasing/returns',
                title: 'Returns',
                translateKey: 'nav.dealerPurchasing.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'dealerPurchasing.item3',
                path: '/dealer/lists/vendors',
                title: 'Vendors',
                translateKey: 'nav.dealerPurchasing.item3',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
        ]
    },
    {
        key: 'dealerLists',
        path: '',
        title: 'Lists',
        translateKey: 'nav.dealerLists.dealerLists',
        type: NAV_ITEM_TYPE_COLLAPSE,
        icon: 'collapseMenu',
        authority: ['dealer'],
        subMenu: [
            {
                key: 'lists.item1',
                path: '/dealer/lists/customers',
                title: 'Customers',
                translateKey: 'nav.dealerLists.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'lists.item2',
                path: '/dealer/lists/fleets',
                title: 'Fleets',
                translateKey: 'nav.dealerLists.item4',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'lists.item3',
                path: '/dealer/lists/vehicles',
                title: 'Vehicles',
                translateKey: 'nav.dealerLists.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'lists.item4',
                path: '/dealer/lists/vendors',
                title: 'Vendors',
                translateKey: 'nav.dealerLists.item3',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            
            {
                key: 'lists.item5',
                path: '/dealer/lists/inspection-templates',
                title: 'Inspection Templates',
                translateKey: 'nav.dealerLists.item5',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'lists.item6',
                path: '/dealer/lists/canned-services',
                title: 'Canned Services',
                translateKey: 'nav.dealerLists.item6',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },{
                key: 'lists.item7',
                path: '/dealer/lists/categories',
                title: 'Line Item Categories',
                translateKey: 'nav.dealerLists.item7',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'lists.item8',
                path: '/dealer/lists/labor',
                title: 'Labor',
                translateKey: 'nav.dealerLists.item8',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'lists.item9',
                path: '/dealer/lists/fees',
                title: 'Fees',
                translateKey: 'nav.dealerLists.item9',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
        ]
    },
    {
        key: 'estimatesInvoices',
        path: '',
        title: 'Estimates & Invoices',
        translateKey: 'nav.estimatesInvoices.estimatesInvoices',
        icon: 'dealerEstimate',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['dealer'],
        subMenu: [
            {
                key: 'estimatesInvoices.item1',
                path: '/dealer/estimates/all-orders',
                title: 'All Orders',
                translateKey: 'nav.estimatesInvoices.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'estimatesInvoices.item2',
                path: '/dealer/estimates/all-invoices',
                title: 'All Invoices',
                translateKey: 'nav.estimatesInvoices.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'estimatesInvoices.item3',
                path: '/dealer/estimates/pain-invoices',
                title: 'Paid Invoices',
                translateKey: 'nav.estimatesInvoices.item3',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'estimatesInvoices.item4',
                path: '/dealer/estimates/unpaid-invoices',
                title: 'Unpaid Invoices',
                translateKey: 'nav.estimatesInvoices.item4',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
            {
                key: 'estimatesInvoices.item5',
                path: '/dealer/estimates/all-estimates',
                title: 'All Estimates',
                translateKey: 'nav.estimatesInvoices.item5',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['dealer'],
                subMenu: [],
            },
        ]
    },
]

export default navigationConfig
