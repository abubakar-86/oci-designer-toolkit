/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciBucket"

export interface OciBucket extends AutoGenerated.OciBucket {}

export interface OciRetentionRules extends AutoGenerated.OciRetentionRules {}

export interface OciDuration extends AutoGenerated.OciDuration {}

export namespace OciBucket {
    export function newResource(type?: string): OciBucket {
        return {
            ...AutoGenerated.OciBucket.newResource('bucket'),
        }
    }
    
    export function newOciRetentionRules(): OciRetentionRules {
        return {
            ...AutoGenerated.OciBucket.newOciRetentionRules(),
        }
    }

    export function newOciDuration(): OciDuration {
        return {
            ...AutoGenerated.OciBucket.newOciDuration(),
        }
    }

}

export class OciBucketClient {
    static new(): OciBucket {
        return OciBucket.newResource()
    }
}

export default OciBucketClient
