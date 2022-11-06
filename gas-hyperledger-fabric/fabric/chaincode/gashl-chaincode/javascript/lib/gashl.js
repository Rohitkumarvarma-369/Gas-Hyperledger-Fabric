/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Gashl extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const gasdata = [];
    }

    async queryGasData(ctx, dataNum) {
        const dataAsBytes = await ctx.stub.getState(dataNum); // get the car from chaincode state
        if (!dataAsBytes || dataAsBytes.length === 0) {
            throw new Error(`${dataNum} does not exist`);
        }
        console.log(dataAsBytes.toString());
        return dataAsBytes.toString();
    }

    async createGasData(ctx, dataNum, gasType, gasValue, threshold, ownerName) {
        console.info('============= START : Create Car ===========');

        const gasdatapoint = {
            threshold,
            docType: 'gasdata',
            gasType,
            gasValue,
            ownerName,
        };

        await ctx.stub.putState(dataNum, Buffer.from(JSON.stringify(gasdatapoint)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllGasData(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    // async changeCarOwner(ctx, carNumber, newOwner) {
    //     console.info('============= START : changeCarOwner ===========');

    //     const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
    //     if (!carAsBytes || carAsBytes.length === 0) {
    //         throw new Error(`${carNumber} does not exist`);
    //     }
    //     const car = JSON.parse(carAsBytes.toString());
    //     car.owner = newOwner;

    //     await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : changeCarOwner ===========');
    // }

}

module.exports = Gashl;
