import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core'; 
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
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
        shopApiPath: 'shop-api',
    },
    authOptions: {
        superadminCredentials: {
            identifier: 'supercanivibe',
            password: '@dmin42069',
        },
        tokenMethod: 'cookie',
        cookieOptions: {
          secret: process.env.COOKIE_SECRET || 'cookie-secret',
        },
    },
    dbConnectionOptions: {
        type: 'postgres',
        synchronize: false, // turn this off for production
        logging: false,
        host: process.env.DATABASE_URL,
        ssl: true,
        extra: {
            rejectUnauthorized: false,
        },
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
        EmailPlugin.init({
            transport: {
                type: 'smtp',
                host: '',
                port: 666,
                auth: {
                  user: '',
                  pass: '',
                }
              },
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation
                fromAddress: '',
                verifyEmailAddressUrl: '',
                passwordResetUrl: '',
                changeEmailAddressUrl: ''
            },
        }),
        AdminUiPlugin.init({
            route: 'admin',
            port: procadminPORT,
        }),
    ],
};
