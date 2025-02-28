import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]


export const protectedRoutes = [
    {
        key: 'superAdminBase',
        path: '/super-admin',
        authority: ['superAdmin'],
        meta: {
            title: 'Super Admin Home'
        },
    },
    {
        key: 'superAdminHome',
        path: '/super-admin/home', // Final route will be /super-admin/home
        component: lazy(() => import('@/views/SuperAdmin/SuperAdminHome')),
        meta: { title: 'Super Admin Home' },
        authority: ['superAdmin'],
    },
    {
        key: 'collapseMenu.item1',
        path: '/super-admin/create-dealer', // Final route will be /super-admin/create-dealer
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        meta: { title: 'Super Admin Create Dealer' },
        authority: ['superAdmin'],
    },
    {
        key: 'superAdminAllDealers',
        path: '/super-admin/all-dealers', // Final route will be /super-admin/create-dealer
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        meta: { title: 'Super Admin Get All Dealers' },
        authority: ['superAdmin'],
    },
    // Add more superAdmin-specific routes here


    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/super-admin/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: ['superAdmin'],
    },
    // {
    //     key: 'collapseMenu.item1',
    //     path: '/create-dealer',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
    //     authority: ['superAdmin'],
    // },
    {
        key: 'collapseMenu.item2',
        path: '/view-all-dealers',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: ['superAdmin'],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: ['superAdmin'],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-create-dealer',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: ['superAdmin'],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-view-all-dealers',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: ['dealer'],
    },
    {
        key: 'superAdminHome',
        path: '/super-admin/home',
        component: lazy(() => import('@/views/Home')),
        authority: ['superAdmin'],
    },

    // Dealer Routes
    {
        key: 'checkoutForm ',
        path: '/checkout',
        component: lazy(() => import('@/views/Dealer/CheckoutForm')),
        authority: ['dealer'],
    },
    {
        key: 'return',
        path: '/return',
        component: lazy(() => import('@/views/Dealer/Return')),
        authority: ['dealer'],
    },
    {
        key: 'dealerDashboard',
        path: '/dealer/dashboard',
        component: lazy(() => import('@/views/Dealer/DealerDashboard')),
        authority: ['dealer'],
    },
    {
        key: 'dealerWorkflow',
        path: '/dealer/workflow',
        component: lazy(() => import('@/views/Dealer/Workflow/Workflow')),
        authority: ['dealer'],
    },
    {
        key: 'newEstimate',
        path: '/dealer/workflow/order/:id',
        component: lazy(() => import('@/views/Dealer/Workflow/NewEstimate/NewEstimate')),
        authority: ['dealer'],
    }, {
        key: 'dealerCalendar',
        path: '/dealer/calendar',
        component: lazy(() => import('@/views/Dealer/DealerCalendar')),
        authority: ['dealer'],
    }, {
        key: 'dealerTimeClocks',
        path: '/dealer/time-clocks',
        component: lazy(() => import('@/views/Dealer/DealerTimeClocks')),
        authority: ['dealer'],
    },
    {
        key: 'dealerInventory.item1',
        path: '/dealer/inventory/parts',
        component: lazy(() => import('@/views/Dealer/DealerInventory/parts/Parts')),
        authority: ['dealer'],
    },
    {
        key: 'dealerInventory.item2',
        path: '/dealer/inventory/tires',
        component: lazy(() => import('@/views/Dealer/DealerInventory/Tires/Tires')),
        authority: ['dealer'],
    },
    {
        key: 'dealerInventory.item3',
        path: '/dealer/lists/labor',
        component: lazy(() => import('@/views/Dealer/DealerLists/Item1')), // Ensure this is the component for Lists > Labor
        authority: ['dealer'],
        redirect: '/dealer/lists/labor'  // Redirect path to match Lists > Labor
    },
    {
        key: 'dealerInventory.item4',
        path: '/dealer/lists/fees',
        component: lazy(() => import('@/views/Dealer/DealerLists/Fees/Fees')), // Ensure this is the component for Lists > Labor
        authority: ['dealer'],
        redirect: '/dealer/lists/fees'  // Redirect path to match Lists > Labor
    },
    {
        key: 'dealerInventory.item5',
        path: '/dealer/lists/vendors',
        component: lazy(() => import('@/views/Dealer/DealerLists/Dealers/Vendors')), // Ensure this is the component for Lists > Labor
        authority: ['dealer'],
        redirect: '/dealer/lists/vendors'  // Redirect path to match Lists > Labor
    },
    {
        key: 'dealerInventory.item6',
        path: '/dealer/lists/categories',
        component: lazy(() => import('@/views/Dealer/DealerInventory/Categories/Categories')),
        authority: ['dealer'],
        redirect: '/dealer/lists/categories'  // Redirect path to match Lists > Labor
    },
    {
        key: 'dealerPurchasing.item1',
        path: '/dealer/purchasing/purchase-orders',
        component: lazy(() => import('@/views/Dealer/Purchasing/PurchaseOrder/PurchaseOrder')),
        authority: ['dealer'],
    },
    {
        key: 'dealerPurchasing.item2',
        path: '/dealer/purchasing/returns',
        component: lazy(() => import('@/views/Dealer/Purchasing/Returns/Returns')),
        authority: ['dealer'],
    },
    {
        key: 'dealerPurchasing.item3',
        path: '/dealer/lists/vendors',
        component: lazy(() => import('@/views/Dealer/DealerLists/Dealers/Vendors')),
        authority: ['dealer'],
    },

    // ... Lists
    {
        key: 'dealerLists.item1',
        path: '/dealer/lists/customers',
        component: lazy(() => import('@/views/Dealer/DealerLists/Customers/Customers')),
        authority: ['dealer'],
    }, {
        key: 'dealerLists.item2',
        path: '/dealer/lists/fleets',
        component: lazy(() => import('@/views/Dealer/DealerLists/Fleets/Fleets')),
        authority: ['dealer'],
    }, {
        key: 'dealerLists.item3',
        path: '/dealer/lists/vehicles',
        component: lazy(() => import('@/views/Dealer/DealerLists/Vehicles/Vehicles')),
        authority: ['dealer'],
    }, {
        key: 'dealerLists.item4',
        path: '/dealer/lists/vendors',
        component: lazy(() => import('@/views/Dealer/DealerLists/Dealers/Vendors')),
        authority: ['dealer'],
    },  {
        key: 'dealerLists.item5',
        path: '/dealer/lists/inspection-templates',
        component: lazy(() => import('@/views/Dealer/DealerLists/Item1')),
        authority: ['dealer'],
    }, {
        key: 'dealerLists.item6',
        path: '/dealer/lists/canned-services',
        component: lazy(() => import('@/views/Dealer/DealerLists/Item1')),
        authority: ['dealer'],
    }, {
        key: 'dealerLists.item7',
        path: '/dealer/lists/categories',
        component: lazy(() => import('@/views/Dealer/DealerLists/Item1')),
        authority: ['dealer'],
    }, {
        key: 'dealerLists.item8',
        path: '/dealer/lists/labor',
        component: lazy(() => import('@/views/Dealer/DealerLists/Item1')),
        authority: ['dealer'],
    }, {
        key: 'dealerLists.item9',
        path: '/dealer/lists/fees',
        component: lazy(() => import('@/views/Dealer/DealerLists/Item1')),
        authority: ['dealer'],
    },

    //Estimates & Invoices 
    {
        key: 'estimatesInvoices.item1',
        path: '/dealer/estimates/all-orders',
        component: lazy(() => import('@/views/Dealer/Workflow/AllOrder')),
        authority: ['dealer'],
    },
    {
        key: 'estimatesInvoices.item2',
        path: '/dealer/estimates/all-invoices',
        component: lazy(() => import('@/views/Dealer/Workflow/AllInvoices')),
        authority: ['dealer'],
    },
    {
        key: 'estimatesInvoices.item3',
        path: '/dealer/estimates/pain-invoices',
        component: lazy(() => import('@/views/Dealer/Workflow/PaidInvoices')),
        authority: ['dealer'],
    },
    {
        key: 'estimatesInvoices.item4',
        path: '/dealer/estimates/unpaid-invoices',
        component: lazy(() => import('@/views/Dealer/Workflow/UnpaidInvoices')),
        authority: ['dealer'],
    },
    {
        key: 'estimatesInvoices.item5',
        path: '/dealer/estimates/all-estimates',
        component: lazy(() => import('@/views/Dealer/Workflow/AllEstimate')),
        authority: ['dealer'],
    },
    //Settings
    {
        key: 'generalSetting',
        path: '/dealer/settings/general-setting',
        component: lazy(() => import('@/views/Dealer/GeneralSetting')),
        authority: ['dealer'],
    },
    {
        key: 'pricingMatrix',
        path: '/dealer/settings/pricing-matrix',
        component: lazy(() => import('@/views/Dealer/Settings/PricingMatrix')),
        authority: ['dealer'],
    },
    {
        key: 'laborMatrix',
        path: '/dealer/settings/labor-matrix',
        component: lazy(() => import('@/views/Dealer/Settings/LaborMatrix')),
        authority: ['dealer'],
    },
    {
        key: 'paymentTerms',
        path: '/dealer/settings/payment-terms',
        component: lazy(() => import('@/views/Dealer/Settings/PaymentTerms')),
        authority: ['dealer'],
    },
    {
        key: 'billing',
        path: '/dealer/settings/billing',
        component: lazy(() => import('@/views/Dealer/Settings/Billing')),
        authority: ['dealer'],
    },
    {
        key: 'users',
        path: '/dealer/settings/users',
        component: lazy(() => import('@/views/Dealer/Settings/Users')),
        authority: ['dealer'],
    },
    {
        key: 'deletedItems',
        path: '/dealer/settings/deleted-items',
        component: lazy(() => import('@/views/Dealer/Settings/DeletedItems')),
        authority: ['dealer'],
    },
    {
        key: 'workRequestForms',
        path: '/dealer/settings/work-request-forms',
        component: lazy(() => import('@/views/Dealer/Settings/WorkRequestForms')),
        authority: ['dealer'],
    },
    {
        key: 'payments',
        path: '/dealer/settings/payments',
        component: lazy(() => import('@/views/Dealer/Settings/Payments')),
        authority: ['dealer'],
    },
    //Overview
    {
        key: 'overview.item1',
        path: '/dealer/overview/end-of-day',
        component: lazy(() => import('@/views/Dealer/Overview/EndOfDay')),
        authority: ['dealer'],
    },
    {
        key: 'overview.item2',
        path: '/dealer/overview/sales-summary',
        component: lazy(() => import('@/views/Dealer/Overview/SalesSummary')),
        authority: ['dealer'],
    },
    {
        key: 'overview.item3',
        path: '/dealer/overview/referal-summary',
        component: lazy(() => import('@/views/Dealer/Overview/ReferalSummary')),
        authority: ['dealer'],
    },
    //Payment Terms
    {
        key: 'paymentReports.item1',
        path: '/dealer/paymentReports/all-payments',
        component: lazy(() => import('@/views/Dealer/PaymentReports/AllPayments')),
        authority: ['dealer'],
    },
    {
        key: 'paymentReports.item2',
        path: '/dealer/paymentReports/payment-types',
        component: lazy(() => import('@/views/Dealer/PaymentReports/PaymentTypes')),
        authority: ['dealer'],
    },
    {
        key: 'paymentReports.item3',
        path: '/dealer/paymentReports/summary-by-customer',
        component: lazy(() => import('@/views/Dealer/PaymentReports/SummaryByCustomer')),
        authority: ['dealer'],
    },
    {
        key: 'paymentReports.item4',
        path: '/dealer/paymentReports/transactions',
        component: lazy(() => import('@/views/Dealer/PaymentReports/Transactions')),
        authority: ['dealer'],
    },
    {
        key: 'paymentReports.item5',
        path: '/dealer/paymentReports/payouts',
        component: lazy(() => import('@/views/Dealer/PaymentReports/Payouts')),
        authority: ['dealer'],
    },
    //Integrations
    {
        key: 'integrations.item1',
        path: '/dealer/integrations/api-webhooks',
        component: lazy(() => import('@/views/Dealer/Integration/APIWebhooks')),
        authority: ['dealer'],
    },
    {
        key: 'integrations.item2',
        path: '/dealer/integrations/carfax',
        component: lazy(() => import('@/views/Dealer/Integration/Carfax')),
        authority: ['dealer'],
    },
    {
        key: 'integrations.item3',
        path: '/dealer/integrations/quick-books',
        component: lazy(() => import('@/views/Dealer/Integration/QuickBooks')),
        authority: ['dealer'],
    },
    //Parts & Line items sold
    {
        key: 'itemSold.item1',
        path: '/dealer/itemSold/sales-tax',
        component: lazy(() => import('@/views/Dealer/ItemsSold/SalesTax')),
        authority: ['dealer'],
    },
    {
        key: 'itemSold.item2',
        path: '/dealer/itemSold/summary-by-type',
        component: lazy(() => import('@/views/Dealer/ItemsSold/SummaryByType')),
        authority: ['dealer'],
    },
    {
        key: 'itemSold.item3',
        path: '/dealer/itemSold/summary-by-category',
        component: lazy(() => import('@/views/Dealer/ItemsSold/SummaryByCategory')),
        authority: ['dealer'],
    },
    {
        key: 'itemSold.item4',
        path: '/dealer/itemSold/line-item-detail',
        component: lazy(() => import('@/views/Dealer/ItemsSold/LineItemDetail')),
        authority: ['dealer'],
    },
    // ... other routes

]