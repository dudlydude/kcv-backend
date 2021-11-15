import { bootstrap, defaultConfig, JobQueueService, mergeConfig } from '@vendure/core';
import { populate } from '@vendure/core/cli';
//import { clearAllTables, populateCustomers } from '@vendure/testing';
import path from 'path';
import { config } from './src/vendure-config';
import { initialData } from './initialData';

//import { initialData } from '../core/mock-data/data-sources/initial-data';
//import { devConfig } from './dev-config';

// tslint:disable:no-console

/**
 * A CLI script which populates the dev database with deterministic random data.
 */
if (require.main === module) {
    // Running from command line
    
        populate(
            () =>
                bootstrap(config).then(async app => {
                    await app.get(JobQueueService).start();
                    return app;
                }),
                initialData,
            path.join(__dirname, './kcvProducts.csv'),
        )
        
        // .then(async app => {
        //     console.log('populating customers...');
        //     await populateCustomers(1, config, true);
        //     return app.close();
        // })
        .then(
            () => process.exit(0),
            err => {
                console.log(err);
                process.exit(1);
            },
        );
}