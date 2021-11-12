import { LanguageCode, Permission } from '@vendure/common/lib/generated-types';

import { InitialData } from '@vendure/core';

export const initialData: InitialData = {
    defaultLanguage: LanguageCode.en,
    defaultZone: 'Americas',
    roles: [
        {
            code: 'administrator',
            description: 'Administrator',
            permissions: [
                Permission.CreateCatalog,
                Permission.ReadCatalog,
                Permission.UpdateCatalog,
                Permission.DeleteCatalog,
                Permission.CreateSettings,
                Permission.ReadSettings,
                Permission.UpdateSettings,
                Permission.DeleteSettings,
                Permission.CreateCustomer,
                Permission.ReadCustomer,
                Permission.UpdateCustomer,
                Permission.DeleteCustomer,
                Permission.CreateCustomerGroup,
                Permission.ReadCustomerGroup,
                Permission.UpdateCustomerGroup,
                Permission.DeleteCustomerGroup,
                Permission.CreateOrder,
                Permission.ReadOrder,
                Permission.UpdateOrder,
                Permission.DeleteOrder,
                Permission.CreateSystem,
                Permission.ReadSystem,
                Permission.UpdateSystem,
                Permission.DeleteSystem,
            ],
        },
        {
            code: 'order-manager',
            description: 'Order manager',
            permissions: [
                Permission.CreateOrder,
                Permission.ReadOrder,
                Permission.UpdateOrder,
                Permission.DeleteOrder,
                Permission.ReadCustomer,
                Permission.ReadPaymentMethod,
                Permission.ReadShippingMethod,
                Permission.ReadPromotion,
                Permission.ReadCountry,
                Permission.ReadZone,
            ],
        },
        {
            code: 'inventory-manager',
            description: 'Inventory manager',
            permissions: [
                Permission.CreateCatalog,
                Permission.ReadCatalog,
                Permission.UpdateCatalog,
                Permission.DeleteCatalog,
                Permission.CreateTag,
                Permission.ReadTag,
                Permission.UpdateTag,
                Permission.DeleteTag,
                Permission.ReadCustomer,
            ],
        },
    ],
    taxRates: [
        { name: 'Zero Tax', percentage: 0 }
    ],
    shippingMethods: [
        { name: 'Same-Day Member Delivery', price: 0 }
    ],
    paymentMethods: [
        {
            name: 'Standard Payment',
            handler: {
                code: 'dummy-payment-handler',
                arguments: [{ name: 'automaticSettle', value: 'true' }],
            },
        },
    ],
    collections: [
        
    ],
    countries: [
        
        { name: 'United States of America', code: 'US', zone: 'Americas' },
    ],
};