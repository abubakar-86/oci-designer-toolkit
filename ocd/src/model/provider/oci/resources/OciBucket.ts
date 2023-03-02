/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OciBucketAutoGenerated } from "./generated/OciBucket"

export interface OciBucket extends OciBucketAutoGenerated {
}

export namespace OciBucket {
    export function newResource(type?: string): OciBucket {
        return {
            ...OciBucketAutoGenerated.newResource('bucket'),
        }
    }
}

export class OciBucketClient {
    static new(): OciBucket {
        return OciBucket.newResource()
    }
}

export default OciBucketClient
