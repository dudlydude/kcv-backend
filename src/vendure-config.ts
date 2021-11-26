import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core'; 
//import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import path from 'path';

const procPORTstr = process.env.PORT || "3001"
const procPORT = parseInt(procPORTstr)

const procadminPORTstr = process.env.PORT || "3002"
const procadminPORT = parseInt(procadminPORTstr)

export const config: VendureConfig = {
    apiOptions: {
        port: procPORT,
        adminApiPath: 'admin-api',
        adminApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        },// turn this off for production
        adminApiDebug: true, // turn this off for production
        shopApiPath: 'shop-api',
        shopApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        },// turn this off for production
        shopApiDebug: true,// turn this off for production
    },
    authOptions: {
        superadminCredentials: {
            identifier: 'supercanivibe',
            password: '@dmin42069',
        },
        requireVerification: false,
        tokenMethod: 'cookie',
        cookieOptions: {
          secret: process.env.COOKIE_SECRET || 'cookie-secret',
        },
    },
    dbConnectionOptions: {
        type: 'better-sqlite3',
        synchronize: true, // turn this off for production
        logging: false,
        database: path.join(__dirname, '../vendure.sqlite'),
        migrations: [path.join(__dirname, '../migrations/*.ts')],
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    customFields: {},
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
        }),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        // EmailPlugin.init({
        //     devMode: true,
        //     outputPath: path.join(__dirname, '../static/email/test-emails'),
        //     route: 'mailbox',
        //     handlers: defaultEmailHandlers,
        //     templatePath: path.join(__dirname, '../static/email/templates'),
        //     globalTemplateVars: {
        //         // The following variables will change depending on your storefront implementation
        //         fromAddress: '"example" <noreply@example.com>',
        //         verifyEmailAddressUrl: 'http://localhost:8080/verify',
        //         passwordResetUrl: 'http://localhost:8080/password-reset',
        //         changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
        //     },
        // }),
        AdminUiPlugin.init({
            route: 'admin',
            port: procadminPORT,
        }),
    ],
};
