/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OciRouteTableAutoGenerated } from "./generated/OciRouteTable"

export interface OciRouteTable extends OciRouteTableAutoGenerated {
}

export namespace OciRouteTable {
    export function newResource(type?: string): OciRouteTable {
        return {
            ...OciRouteTableAutoGenerated.newResource('route_table'),
        }
    }
}

export class OciRouteTableClient {
    static new(): OciRouteTable {
        return OciRouteTable.newResource()
    }
}

export default OciRouteTableClient
